import { RECEIVE_SIGNUP_ERRORS, RECEIVE_CURRENT_USER } from '../../../actions/session';

export default (state = [], action) => {
  Object.freeze(state);

  switch(action.type) {
    case RECEIVE_CURRENT_USER:
      return [];
    case RECEIVE_SIGNUP_ERRORS:
      return action.errors;
    default:
      return state;
  }
};