import {combineReducers} from '@reduxjs/toolkit';
import authReducer from './auth';
import mediaReducer from './media';
export default combineReducers({
  auth: authReducer,
  media: mediaReducer,
});
