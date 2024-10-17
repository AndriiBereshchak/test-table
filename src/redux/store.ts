import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './postsSlice';
import loaderReducer from './loaderSlice';
import themeReducer from './themeSlice';

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    loader: loaderReducer,
    theme: themeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;