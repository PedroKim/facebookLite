import { combineReducers } from 'redux';
import entitiesReducer from './entities';
import sessionReducer from './session';
import errorsReducer from './errors/errors';
import usersReducer from './users';

export default combineReducers({
  entities: entitiesReducer,
  users: usersReducer,
  session: sessionReducer,
  errors: errorsReducer
});