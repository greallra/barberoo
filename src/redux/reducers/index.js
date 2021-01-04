import { combineReducers } from 'redux';
import { user } from './user';
import { barbers } from './barbers';
import { chat } from './chat';

export const rootReducer = combineReducers({
  user,
  barbers,
  chat
});
