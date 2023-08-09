import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  username: string;
  email: string;
}

const initialState: UserState = {
  username: '',
  email: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logIn: (state, action: PayloadAction<UserState>) => {
      state = action.payload;
    },
    logOut: (state) => {
      state = { email: '', username: '' };
    },
  },
});

export const { actions } = userSlice;
export default userSlice.reducer;
