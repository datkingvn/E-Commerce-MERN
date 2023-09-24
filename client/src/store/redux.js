import { configureStore } from '@reduxjs/toolkit';
import appSlice from './appSlice'

export const redux = configureStore({
  reducer: {
    app: appSlice
  },
});
