import { configureStore } from '@reduxjs/toolkit';
import walletSlice from './walletSlice';

export const store = configureStore({
  reducer: {
    wallet: walletSlice,
  },
});

// For TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;