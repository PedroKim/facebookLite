import * as userUtils from '../utils/users_utils';

export const RECEIVE_USERS = "RECEIVE_USERS";
export const RECEIVE_USER = "RECEIVE_USER";

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