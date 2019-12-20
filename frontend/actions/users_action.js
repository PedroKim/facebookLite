import * as userUtils from '../utils/users_utils';

export const RECEIVE_USERS = "RECEIVE_USERS";
export const RECEIVE_USER = "RECEIVE_USER";

const receiveUsers = users => ({
  type: RECEIVE_USERS,
  users
});

const receiveUser = user => ({
  type: RECEIVE_USER,
  user
});

export const fetchUser = userId => dispatch => (
  userUtils.fetchUser(userId).then(user => dispatch(receiveUser(user)))
);

export const updateUser = userData => dispatch => (
  userUtils.updateUser(userData).then(user => dispatch(receiveUser(user)))
);

export const makeFriendRequest = friendRequest => dispatch => (
  userUtils.makeFriendRequest(friendRequest).then(users => dispatch(receiveUsers(users)))
);

export const deleteFriendRequest = friendRequest => dispatch => (
  userUtils.deleteFriendRequest(friendRequest).then(users => dispatch(receiveUsers(users)))
);

export const approveFriendRequest = friendRequest => dispatch => (
  userUtils.approveFriendRequest(friendRequest).then(users => dispatch(receiveUsers(users)))
);