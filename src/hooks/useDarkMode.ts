import { useDispatch, useSelector } from 'react-redux';
import { toggleDarkMode, selectDarkMode } from '@/redux/newsSlice';

export const useDarkMode = () => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector(selectDarkMode);
  
  const toggleTheme = () => {
    dispatch(toggleDarkMode());
  };
  
  return {
    isDarkMode,
    toggleTheme,
  };
}; 