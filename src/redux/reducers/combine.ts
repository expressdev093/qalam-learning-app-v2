import {combineReducers} from '@reduxjs/toolkit';
import appReducer from './app.reducer';
import authReducer from './auth.reducer';
import continueStudyReducer from './continue-study.reducer';
import favoriteReducer from './favorite.reducer';

export default combineReducers({
  app: appReducer,
  auth: authReducer,
  continueStudy: continueStudyReducer,
  favorite: favoriteReducer,
});
