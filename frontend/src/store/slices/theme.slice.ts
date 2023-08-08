import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type Theme = 'light' | 'dark';

export interface ThemeState {
  theme: Theme;
}

const initialState: ThemeState = {
  theme: 'light',
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme === 'light' ? (state.theme = 'dark') : (state.theme = 'light');
    },
  },
});

export const {
  actions: { toggleTheme },
} = themeSlice;
export default themeSlice.reducer;
