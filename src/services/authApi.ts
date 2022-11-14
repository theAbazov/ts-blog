import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

interface User {
  email: string;
  token?: string;
  password?: string;
  username: string;
  bio: string;
  image: string;
}
interface UserResponse {
  user: User;
}

interface UpdateUser {
  body: UserResponse;
  token: string;
}

interface UserLoginReq {
  email: string;
  password: string;
}

const authApi = createApi({
  reducerPath: "auth",
  baseQuery: fetchBaseQuery({ baseUrl: "https://blog.kata.academy/api/" }),
  endpoints: (build) => ({
    login: build.mutation<UserResponse, UserLoginReq>({
      query: (body: UserLoginReq) => ({
        url: "/users/login",
        method: "post",
        body,
      }),
    }),
    register: build.mutation<UserResponse, RegisterRequest>({
      query: (body: RegisterRequest) => ({
        url: "/users",
        method: "post",
        body,
      }),
    }),
    getUser: build.query<UserResponse, string>({
      query: (token) => ({
        url: "/user",
        Headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    updateUser: build.mutation<UserResponse, UpdateUser>({
      query: ({ body, token }) => ({
        url: "/user",
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body,
      }),
    }),
  }),
});

export default authApi;

export const {
  useGetUserQuery,
  useLoginMutation,
  useRegisterMutation,
  useUpdateUserMutation,
} = authApi;
