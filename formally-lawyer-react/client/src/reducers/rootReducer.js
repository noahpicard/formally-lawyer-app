import { combineReducers } from 'redux';
import userReducer from './userReducer';
import redirectReducer from './redirectReducer';
export default combineReducers({
  userReducer, redirectReducer
});