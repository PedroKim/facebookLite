import { postUser, postSession, deleteSession } from '../utils/session';

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const LOGOUT_CURRENT_USER = "LOGOUT_CURRENT_USER";
export const RECEIVE_LOGIN_ERRORS = "RECEIVE_LOGIN_ERRORS";
export const RECEIVE_SIGNUP_ERRORS = "RECEIVE_SIGNUP_ERRORS";
export const CLEAR_ERRORS = "CLEAR_ERRORS";

export const receiveCurrentUser = user => ({
  type: RECEIVE_CURRENT_USER,
  user
});

export const logoutCurrentUser = () => ({
  type: LOGOUT_CURRENT_USER
});

const receiveLoginErrors = errors => ({
  type: RECEIVE_LOGIN_ERRORS,
  errors
});

const receiveSignupErrors = errors => ({
  type: RECEIVE_SIGNUP_ERRORS,
  errors
});

const receiveClearErrors = { type: CLEAR_ERRORS };

export const createNewUser = formUser => dispatch => postUser(formUser)
  .then(
    user => dispatch(receiveCurrentUser(user)),
    errors => dispatch(receiveSignupErrors(errors.responseJSON))
  );

export const login = formUser => dispatch => postSession(formUser)
  .then(
    user => dispatch(receiveCurrentUser(user)),
    errors => dispatch(receiveLoginErrors(errors.responseJSON))
  );

export const logout = () => dispatch => deleteSession()
  .then(() => dispatch(logoutCurrentUser()));

export const clearErrors = () => dispatch => dispatch(receiveClearErrors);