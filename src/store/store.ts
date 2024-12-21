import { configureStore } from '@reduxjs/toolkit';
import menuReducer from './menuSlice';

export const store = configureStore({
  reducer: {
    menu: menuReducer,
  },
});

// Export RootState type
export type RootState = ReturnType<typeof store.getState>;

// Export AppDispatch type for proper typing with dispatch
export type AppDispatch = typeof store.dispatch;