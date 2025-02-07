
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Uses localStorage
import rootReducerWithLogout from './reducers/rootReducer';

const persistConfig = {
  key: 'root',
  storage, // Saves state to localStorage
};

const persistedReducer = persistReducer(persistConfig, rootReducerWithLogout);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);