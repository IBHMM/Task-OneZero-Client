import { configureStore } from '@reduxjs/toolkit';
import MenuReducer from '../features/menu.slice.js';

export const store = configureStore({
  reducer: {
    menu: MenuReducer,
  },
});
