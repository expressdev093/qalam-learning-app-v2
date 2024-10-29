import {configureStore} from '@reduxjs/toolkit';
import {createLogger} from 'redux-logger';
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {createStateSyncMiddleware, initMessageListener} from 'redux-state-sync';
import rootReducer from './reducers/combine.reducer'; // Import your root reducer

// Persist configuration
const persistConfig = {
  key: 'root', // The key for the persisted state
  storage, // Use localStorage
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer); // Use your actual rootReducer

// Create the Redux store
const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => {
    const middlewares = getDefaultMiddleware({
      serializableCheck: false, // Disable serializable checks for the state sync middleware
    }).concat(
      createStateSyncMiddleware({
        channel: 'hawala-sync',
      }) as any,
    );

    // Add logger middleware only in development
    if (process.env.NODE_ENV === 'development') {
      const logger = createLogger();
      middlewares.push(logger);
    }

    return middlewares;
  },
});

// Create a persistor
export const persistor = persistStore(store);

// Automatically generate RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Create custom hooks for typed dispatch and selector
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Initialize the message listener for state sync
initMessageListener(store);

export default store;