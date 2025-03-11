import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { newsApi } from '../services/api';
import newsReducer from './newsSlice';
import { Article } from './newsSlice';

// Define the store structure
export interface RootState {
  news: {
    favorites: Article[];
    darkMode: boolean;
  };
  [newsApi.reducerPath]: ReturnType<typeof newsApi.reducer>;
}

export const store = configureStore({
  reducer: {
    news: newsReducer,
    [newsApi.reducerPath]: newsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(newsApi.middleware),
});

setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type AppRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 