import { combineReducers } from 'redux';
import { authentication } from './authentication';
import { registration } from './registration';
import { alert } from './alert';
import { players } from './players';

const rootReducer = combineReducers({
  authentication,
  registration,
  alert,
  players
});

export default rootReducer;
