import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Article } from '../redux/newsSlice';

// Backend API URL - Render'da deploy edilen backend URL'si
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://news-app-backend.onrender.com';

export const backendApi = createApi({
  reducerPath: 'backendApi',
  baseQuery: fetchBaseQuery({ baseUrl: BACKEND_URL }),
  tagTypes: ['Favorites'],
  endpoints: (builder) => ({
    // Favori haberleri getir
    getFavorites: builder.query<Article[], void>({
      query: () => '/api/favorites',
      providesTags: ['Favorites'],
    }),
    
    // Haberi favorilere ekle
    addToFavorites: builder.mutation<Article, Article>({
      query: (article) => ({
        url: '/api/favorites',
        method: 'POST',
        body: article,
      }),
      invalidatesTags: ['Favorites'],
    }),
    
    // Haberi favorilerden çıkar
    removeFromFavorites: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/api/favorites/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Favorites'],
    }),
  }),
});

export const { 
  useGetFavoritesQuery, 
  useAddToFavoritesMutation, 
  useRemoveFromFavoritesMutation 
} = backendApi; 