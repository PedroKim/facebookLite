# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  email           :string           not null
#  session_token   :string           not null
#  password_digest :string
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  fname           :string           not null
#  lname           :string           not null
#  birth_date      :date             not null
#  gender          :string           not null
#  phone_number    :string
#  current_city    :string
#  hometown        :string
#  bio             :text
#

class User < ApplicationRecord
  validates :email, :session_token, :password_digest, 
            :fname, :lname, :birth_date, :gender, presence: true
  validates :email, :session_token, uniqueness: true
  validates :password, length: { minimum: 6, message: "Your password must be at least 6 characters long. Please try another." }, allow_nil: true

  attr_reader :password
  after_initialize :ensure_session_token

  has_one_attached :profile_img
  has_one_attached :cover_img  

  has_many :sent_requests,
    primary_key: :id,
    foreign_key: :requester_id,
    class_name: :Friend

  has_many :received_requests,
    primary_key: :id,
    foreign_key: :requestee_id,
    class_name: :Friend
  
  def self.generate_session_token
    SecureRandom.urlsafe_base64
  end
  
  def self.find_by_credentials(email, password)
    user = User.find_by(email: email)
    return nil unless user && user.is_password?(password)
    user
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    bcp = BCrypt::Password.new(self.password_digest)
    bcp.is_password?(password)
  end

  def ensure_session_token
    self.session_token ||= User.generate_session_token
  end

  def reset_session_token!
    self.session_token = User.generate_session_token
    self.save
    self.session_token
  end

  def pending_received_requests
    self.received_requests.where(request_status: false).order(:created_at)
    # .order(created_at: :desc) # ordered opposite way
  end

  def pending_received_request_ids
    self.pending_received_requests.pluck(:requester_id)
  end

  def pending_sent_requests
    self.sent_requests.where(request_status: false).order(:created_at)
  end

  def pending_sent_request_ids
    self.pending_sent_requests.pluck(:requestee_id)
  end

  def friends
    friends = Friend.where(requester_id: self.id, request_status: true)
      .or(Friend.where(requestee_id: self.id, request_status: true))
      .distinct
    User.fetch_users(friends, self)
  end

  def friend_ids
    self.friends.pluck(:id)
  end

  def pending_friends
    friends = Friend.where(requester_id: self.id, request_status: false)
      .or(Friend.where(requestee_id: self.id, request_status: false))
      .distinct
    User.fetch_users(friends, self)
  end

  def pending_friend_ids
    self.pending_friends.pluck(:id)
  end
  
  def self.fetch_users(friends, user)
    user_ids = []
    friends.each do |friend|
      if friend.requester_id == user.id
        user_ids.push(friend.requestee_id)
      else
        user_ids.push(friend.requester_id)
      end
    end
    User.where(id: user_ids)
  end
end
