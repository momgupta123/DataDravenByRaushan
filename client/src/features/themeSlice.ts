import { createSlice } from '@reduxjs/toolkit';
import { ThemeState } from '../types/index';

const initialState: ThemeState = {
  isDarkMode: true,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.isDarkMode = !state.isDarkMode;
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
