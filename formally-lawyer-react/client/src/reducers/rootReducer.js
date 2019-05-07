import { combineReducers } from 'redux';
import userReducer from './userReducer';
import redirectReducer from './redirectReducer';

const appReducer = combineReducers({
  userReducer, redirectReducer
});

const rootReducer = (state, action) => {
  if (action.type === 'RESET') {
    state = undefined
  }

  return appReducer(state, action)
}

export default rootReducer;