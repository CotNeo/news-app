import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { newsApi } from '../services/api';
import { backendApi } from '../services/backendApi';
import newsReducer from './newsSlice';
import { Article } from './newsSlice';

// Define the store structure
export interface RootState {
  news: {
    favorites: Article[];
    darkMode: boolean;
  };
  [newsApi.reducerPath]: ReturnType<typeof newsApi.reducer>;
  [backendApi.reducerPath]: ReturnType<typeof backendApi.reducer>;
}

export const store = configureStore({
  reducer: {
    news: newsReducer,
    [newsApi.reducerPath]: newsApi.reducer,
    [backendApi.reducerPath]: backendApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(newsApi.middleware)
      .concat(backendApi.middleware),
});

setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type AppRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 