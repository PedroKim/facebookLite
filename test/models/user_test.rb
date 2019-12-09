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

require 'test_helper'

class UserTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
