import {combineReducers} from '@reduxjs/toolkit';
import appReducer from './app.reducer';
import authReducer from './auth.reducer';

export default combineReducers({
  app: appReducer,
  auth: authReducer,
});
