// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './slice/apiSlice';
import cartReducer from './slice/cartSlice';
import authReducer from './slice/authSlice';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    cart: cartReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});