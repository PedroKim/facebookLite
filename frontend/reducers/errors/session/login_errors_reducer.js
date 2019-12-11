import { RECEIVE_CURRENT_USER, RECEIVE_LOGIN_ERRORS, CLEAR_ERRORS } from '../../../actions/session';

export default (state = [], action) => {
  Object.freeze(state);

  switch (action.type) {
    case CLEAR_ERRORS:
    case RECEIVE_CURRENT_USER:
      return [];
    case RECEIVE_LOGIN_ERRORS:
      return action.errors;
    default:
      return state;
  }
};