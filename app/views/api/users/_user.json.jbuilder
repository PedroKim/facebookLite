json.extract! user, :id, :email, :bio, :gender, :hometown
json.name user.fname + " " + user.lname
json.birthDate user.birth_date
json.phoneNumber user.phone_number
json.currentCity user.current_city
json.profileImgUrl user.profile_img_url
json.coverImgUrl user.cover_img_url