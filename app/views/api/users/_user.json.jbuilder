json.extract! user, :id, :email, :bio, :gender, :hometown, :fname, :lname
json.name user.fname + " " + user.lname
json.birthDate user.birth_date
json.phoneNumber user.phone_number
json.currentCity user.current_city
if user.profile_img.attached?
  json.profileImg url_for(user.profile_img)
else
  json.profileImg nil
end
if user.cover_img.attached?
  json.coverImg url_for(user.cover_img)
else
  json.coverImg nil
end
json.receivedRequestIds user.pending_received_request_ids
json.sentRequestIds user.pending_sent_request_ids
json.friendIds user.friend_ids