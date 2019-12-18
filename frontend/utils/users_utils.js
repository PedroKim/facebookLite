export const fetchUser = userId => (
  $.ajax({
    method: 'GET',
    url: `/api/users/${userId}`
  })
);

export const updateUser = userData => (
  $.ajax({
    method: "PATCH",
    url: `/api/users/${userData.id}`,
    data: userData,
    contentType: false,
    processData: false
  })
);