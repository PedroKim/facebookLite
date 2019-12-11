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
#  profile_img_url :string
#  cover_img_url   :string
#

class User < ApplicationRecord
  validates :email, :session_token, :password_digest, 
            :fname, :lname, :birth_date, :gender, presence: true
  validates :email, :session_token, uniqueness: true
  validates :password, length: { minimum: 6, message: "Your password must be at least 6 characters long. Please try another." }, allow_nil: true

  attr_reader :password
  after_initialize :ensure_session_token
  
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
end
