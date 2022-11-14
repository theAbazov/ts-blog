import { configureStore } from "@reduxjs/toolkit";
import { postList } from "../services/PostListService";

export const store = configureStore({
  reducer: {
    [postList.reducerPath]: postList.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(postList.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
