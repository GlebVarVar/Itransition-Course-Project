import { configureStore } from '@reduxjs/toolkit';
import themeReducer from '@/store/slices/theme.slice';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
  },
  devTools: true,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
