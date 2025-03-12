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

// localStorage'dan başlangıç değerlerini almaya çalış
const getInitialState = (): NewsState => {
  // Tarayıcı ortamında olup olmadığını kontrol et
  if (typeof window !== 'undefined') {
    try {
      const storedDarkMode = localStorage.getItem('darkMode');
      const storedFavorites = localStorage.getItem('favorites');
      
      return {
        darkMode: storedDarkMode ? JSON.parse(storedDarkMode) : false,
        favorites: storedFavorites ? JSON.parse(storedFavorites) : [],
      };
    } catch (error) {
      console.error('Error loading state from localStorage:', error);
    }
  }
  
  // Varsayılan değerler
  return {
    favorites: [],
    darkMode: false,
  };
};

const initialState: NewsState = getInitialState();

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
      
      // localStorage'a kaydet
      if (typeof window !== 'undefined') {
        localStorage.setItem('favorites', JSON.stringify(state.favorites));
      }
    },
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
      
      // localStorage'a kaydet
      if (typeof window !== 'undefined') {
        localStorage.setItem('darkMode', JSON.stringify(state.darkMode));
      }
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