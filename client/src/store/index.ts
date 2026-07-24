import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';
import dataReducer from '../features/dataSlice';
import filtersReducer from '../features/filtersSlice';
import themeReducer from '../features/themeSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    data: dataReducer,
    filters: filtersReducer,
    theme: themeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
