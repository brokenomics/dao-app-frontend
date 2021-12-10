import { configureStore } from '@reduxjs/toolkit';

import { newsSlice } from './news';
import { votingSlice } from './voting';

export const store = configureStore({
  reducer: {
    [newsSlice.name]: newsSlice.reducer,
    [votingSlice.name]: votingSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
