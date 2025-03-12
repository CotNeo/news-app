import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite, selectFavorites, selectIsFavorite } from '@/redux/newsSlice';
import { Article } from '@/redux/newsSlice';
import { RootState } from '@/redux/store';

export const useFavorites = () => {
  const dispatch = useDispatch();
  const favorites = useSelector(selectFavorites);
  
  const addToFavorites = (article: Article) => {
    dispatch(toggleFavorite(article));
  };
  
  const removeFromFavorites = (article: Article) => {
    dispatch(toggleFavorite(article));
  };
  
  const isFavorite = (articleId: string) => {
    return useSelector((state: RootState) => selectIsFavorite(state, articleId));
  };
  
  return {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
  };
}; 