import { configureStore } from "@reduxjs/toolkit";
import articlesApi from "./../services/articleApi";
import authApi from "./../services/authApi";
import authSlice from "./authSlice";

export const store = configureStore({
  reducer: {
    user: authSlice,
    [articlesApi.reducerPath]: articlesApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDM) => getDM().concat(articlesApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
