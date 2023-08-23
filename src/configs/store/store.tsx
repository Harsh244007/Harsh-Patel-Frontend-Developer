// src/configs/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import spaceXReducer from './spaceXSlice';

export const store = configureStore({
  reducer: {
    spaceX: spaceXReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
