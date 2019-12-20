# == Schema Information
#
# Table name: friends
#
#  id             :bigint           not null, primary key
#  requestee_id   :integer          not null
#  requester_id   :integer          not null
#  request_status :boolean          not null
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#

class Friend < ApplicationRecord
  validates :requester_id, :requestee_id, presence: true
  validates :request_status, inclusion: { in: [true, false] }
  
  belongs_to :requester,
    primary_key: :id,
    foreign_key: :requester_id,
    class_name: :User
  
  belongs_to :requestee,
    primary_key: :id,
    foreign_key: :requestee_id,
    class_name: :User

  def self.find_by_requester_requestee_ids(requester_id, requestee_id)
    friend = Friend.find_by(requester_id: requester_id, requestee_id: requestee_id)
    return friend if friend
    return Friend.find_by(requester_id: requestee_id, requestee_id: requester_id)
  end
end
