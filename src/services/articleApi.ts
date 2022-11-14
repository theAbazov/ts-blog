import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Author {
  username: string;
  image: string;
  following: boolean;
  bio?: string;
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

interface PostList {
  articles: Article[];
  articlesCount: number;
}

interface PostDetail {
  article: Article;
}

interface UpdatePost {
  slug: string;
  token: string;
  body: Partial<PostDetail>;
}

interface CreatePost {
  body: Partial<Article>;
  token: string;
}

const articlesApi = createApi({
  reducerPath: "articles",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://blog.kata.academy/api/articles",
  }),
  endpoints: (build) => ({
    getPostDetail: build.query<PostDetail, string>({
      query: (slug: string) => ({
        url: `/${slug}`,
      }),
    }),

    getPostList: build.query<PostList, number>({
      query: (limit: number) => ({ url: "/", limit }),
    }),

    createPost: build.mutation<PostDetail, CreatePost>({
      query: ({ body, token }) => ({
        url: "/",
        method: "post",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body,
      }),
    }),

    deletePost: build.mutation({
      query: ({ slug, token }) => ({
        url: `/${slug}`,
        method: "delete",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),

    updatePost: build.mutation<PostDetail, UpdatePost>({
      query: ({ slug, token, body }) => ({
        url: `/${slug}`,
        method: "put",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body,
      }),
    }),

    fovorite: build.mutation<PostDetail, { slug: string; token: string }>({
      query: ({ slug, token }) => ({
        url: `/${slug}/favorite`,
        method: "post",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),

    unFavorite: build.mutation<PostDetail, { slug: string; token: string }>({
      query: ({ slug, token }) => ({
        url: `/${slug}/favorite`,
        method: "delete",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});

export default articlesApi;

export const {
  // C ** U ** D
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
  // Fav & unFav
  useFovoriteMutation,
  useUnFavoriteMutation,
  // Gettin posts
  useGetPostListQuery,
  useLazyGetPostDetailQuery,
} = articlesApi;
