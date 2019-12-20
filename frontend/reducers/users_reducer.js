import { RECEIVE_CURRENT_USER } from '../actions/session';
import { RECEIVE_USER, RECEIVE_USERS } from '../actions/users_action';

export default (state = {}, action) => {
  let newState;
  Object.freeze(state);

  switch(action.type) {
    case RECEIVE_USER:
    case RECEIVE_CURRENT_USER:
      newState = Object.assign({}, state);
      newState[action.user.id] = action.user;
      return newState;
    case RECEIVE_USERS:
      return Object.assign({}, state, action.users);
    default:
      return state;
  }
}