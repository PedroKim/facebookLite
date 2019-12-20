json.set! @friend.requester_id do
  json.partial! "api/users/user", user: @friend.requester
end
json.set! @friend.requestee_id do
  json.partial! "api/users/user", user: @friend.requestee
end