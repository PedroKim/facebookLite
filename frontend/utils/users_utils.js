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

export const makeFriendRequest = friendRequest => (
  $.ajax({
    method: "POST",
    url: "/api/friends",
    data: {friend: friendRequest}
  })
);

export const deleteFriendRequest = friendRequest => (
  $.ajax({
    method: "DELETE",
    url: "/api/friends",
    data: {friend: friendRequest}
  })
);

export const approveFriendRequest = friendRequest => (
  $.ajax({
    method: "PATCH",
    url: "/api/friends",
    data: {friend: friendRequest}
  })
);