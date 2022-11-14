import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface IState {
  name: string | null;
  image: string | null;
  token: string | null;
}

const initialState: IState = {
  name: null,
  image: null,
  token: null,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{ name: string; image: string; token: string }>
    ) => {
      localStorage.setItem("token", JSON.stringify(action.payload.token));
      state.name = action.payload.name;
      state.token = action.payload.token;
      state.image = action.payload.image;
    },
  },
});

export default authSlice.reducer;

export const selectAuth = (state: RootState) => state.auth;

export const { setUser } = authSlice.actions;
