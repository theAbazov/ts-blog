import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface IState {
  username: string | undefined;
  image: string | undefined;
  token: string | undefined;
  email: string | undefined;
  isAuth: boolean;
}

const initialState: IState = {
  username: undefined,
  image: undefined,
  token: undefined,
  email: undefined,
  isAuth: false,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<Partial<IState>>) => {
      state.username = action.payload.username;
      state.token = action.payload.token;
      state.image = action.payload.image;
      state.email = action.payload.email;
      state.isAuth = action.payload.isAuth!;
    },
    logout: (state) => {
      localStorage.clear();
      state.isAuth = false;
      state.token = undefined;
    },
  },
});

export default authSlice.reducer;

export const { setUser, logout } = authSlice.actions;
