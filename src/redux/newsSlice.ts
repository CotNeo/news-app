import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

export interface Article {
  id: string;
  title: string;
  description: string;
  content: string;
  url: string;
  image: string;
  publishedAt: string;
  source: {
    name: string;
    url: string;
  };
}

interface NewsState {
  favorites: Article[];
  darkMode: boolean;
}

const initialState: NewsState = {
  favorites: [],
  darkMode: false,
};

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<Article>) => {
      const article = action.payload;
      const existingIndex = state.favorites.findIndex((item) => item.id === article.id);
      
      if (existingIndex >= 0) {
        // Remove from favorites
        state.favorites.splice(existingIndex, 1);
      } else {
        // Add to favorites
        state.favorites.push(article);
      }
    },
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
  },
});

export const { toggleFavorite, toggleDarkMode } = newsSlice.actions;

// Selectors
export const selectFavorites = (state: RootState) => state.news.favorites;
export const selectDarkMode = (state: RootState) => state.news.darkMode;
export const selectIsFavorite = (state: RootState, articleId: string) => 
  state.news.favorites.some((article: Article) => article.id === articleId);

export default newsSlice.reducer; 