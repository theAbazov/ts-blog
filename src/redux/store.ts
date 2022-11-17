import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./authSlice";
import { baseApi } from "./../services/api";

export const store = configureStore({
  reducer: {
    user: authSlice,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDM) => getDM().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
