import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../redux";
import { baseApi } from "./api";

interface RegisterRequest {
  user: {
    username: string;
    email: string;
    password: string;
  };
}

interface User {
  email: string;
  token: string;
  password: string;
  username: string;
  bio: string;
  image: string;
}
interface UserResponse {
  user: User;
}

const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<UserResponse, { user: Partial<User> }>({
      query: (body) => ({
        url: "/users/login",
        method: "post",
        body,
      }),
    }),
    register: build.mutation<UserResponse, { user: Partial<User> }>({
      query: (body: RegisterRequest) => ({
        url: "/users",
        method: "post",
        body,
      }),
    }),
    getUser: build.query<UserResponse, undefined>({
      query: () => ({
        url: "/user",
      }),
    }),
    updateUser: build.mutation<UserResponse, { user: Partial<User> }>({
      query: (body) => ({
        url: "/user",
        method: "PUT",
        body,
      }),
    }),
  }),
});

export default authApi;

export const {
  useLazyGetUserQuery,
  useLoginMutation,
  useRegisterMutation,
  useUpdateUserMutation,
} = authApi;
