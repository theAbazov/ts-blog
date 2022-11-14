import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

interface Author {
  username: string;
  image: string;
  following: boolean;
}

interface Article {
  slug: string;
  title: string;
  description: string;
  body: string;
  createdAt: string;
  updatedAt: string;
  tagList: string[];
  favorited: boolean;
  favoritesCount: number;
  author: Author;
}

interface Posts {
  articles: Article[];
  articlesCount: number;
}

export const postList = createApi({
  reducerPath: "OnePost",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://blog.kata.academy/api/",
  }),
  tagTypes: ["Post"],
  endpoints: (build) => ({
    getPostList: build.query<Posts, number>({
      query: (limit: number) => ({ url: "/articles", limit }),
    }),
  }),
});
