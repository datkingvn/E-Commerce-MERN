import { configureStore } from '@reduxjs/toolkit';
import appSlice from './categories/categorySlice'
import productSlice from "./products/productSlice";

export const redux = configureStore({
  reducer: {
    app: appSlice,
    products: productSlice
  },
});
