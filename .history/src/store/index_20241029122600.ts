import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  configureStore,
  MiddlewareAPI,
  Dispatch,
  Middleware,
  isRejectedWithValue,
  compose,
} from '@reduxjs/toolkit';
import {applyMiddleware, combineReducers} from 'redux';
import {persistReducer, persistStore} from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import {appReducer} from '../modules/app/reducer';
import {authReducer} from '../modules/auth/reducer';
import {continueStudyReducer} from '../modules/continue-study/reducer';
import thunk from 'redux-thunk';
import {setupListeners} from '@reduxjs/toolkit/query';
import {RootAction} from '../types/actions';
import {baseApi} from '../modules/base';
import {favoriteReducer} from '../modules/favorites/reducer';
/*
 *--------------------------------------------------*
 * Persist config documentation
 * https://github.com/rt2zz/redux-persist/blob/master/src/types.js#L13-L27
 *--------------------------------------------------*
 */

const appPersistConfig = {
  storage: AsyncStorage,
  key: 'app',
};

export const reducers = {
  app: persistReducer(appPersistConfig, appReducer),
  auth: persistReducer(appPersistConfig, authReducer),
  continueStudy: persistReducer(appPersistConfig, continueStudyReducer),
  favorites: persistReducer(appPersistConfig, favoriteReducer),
  [baseApi.reducerPath]: baseApi.reducer,
};

export const rootReducer = combineReducers(reducers);

//eslint-disable-next-line @typescript-eslint/no-unused-vars
const appMiddleware =
  (_store: MiddlewareAPI) => (next: Dispatch) => (action: RootAction) => {
    //   var state = store.getState()
    //   switch (action.type) {
    //     case actions.ADD_TASK:
    //       *do something*
    //       break;
    //   }
    next(action);
  };

export const rtkQueryErrorLogger: Middleware =
  (api: MiddlewareAPI) => next => action => {
    // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
    if (isRejectedWithValue(action)) {
      console.warn('We got a rejected action!');
      console.log(action.error);
      //toast.warn({ title: 'Async error!', message: action.error.data.message })
    }

    return next(action);
  };

const sagaMiddleware = createSagaMiddleware();

const middlewares = [
  rtkQueryErrorLogger,
  sagaMiddleware,
  thunk,
  baseApi.middleware,
  //subjectApi.middleware,
  //authApi.middleware,
  appMiddleware,
];
const middlewareEnhancer = applyMiddleware(...middlewares);
const enhancers = [middlewareEnhancer];
const composedEnhancers = compose(...enhancers);

export const store = configureStore({
  reducer: rootReducer,
  enhancers: [...enhancers],
  middleware: middlewares,
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// sagaMiddleware.run(sagas);

export const persistor = persistStore(store);
