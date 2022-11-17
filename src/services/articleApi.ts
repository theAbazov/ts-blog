import { baseApi } from "./api";

interface Author {
  username: string;
  image: string;
  following: boolean;
  bio?: string;
}

export interface Article {
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
  body: Partial<PostDetail>;
}

interface CreatePost {
  body: Partial<Article>;
  token: string;
}

interface GetPosts {
  limit?: number;
  page?: number;
  slug?: string;
}

const articlesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getPostDetail: build.query<PostDetail, string | undefined>({
      query: (slug) => ({
        url: `/articles/${slug}`,
      }),
    }),

    getPostList: build.query<PostList, GetPosts>({
      query: ({ limit = 5, page = 1 }) => ({
        url: "/articles/",
        params: {
          limit,
          offset: (page - 1) * limit,
        },
      }),
    }),

    createPost: build.mutation<PostDetail, CreatePost>({
      query: ({ body, token }) => ({
        url: "/articles/",
        method: "post",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body,
      }),
    }),

    deletePost: build.mutation({
      query: ({ slug, token }) => ({
        url: `/articles/${slug}`,
        method: "delete",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),

    updatePost: build.mutation<PostDetail, UpdatePost>({
      query: ({ slug, body }) => ({
        url: `/articles/${slug}`,
        method: "put",
        body,
      }),
    }),

    fovorite: build.mutation<PostDetail, string>({
      query: (slug) => ({
        url: `/articles/${slug}/favorite`,
        method: "post",
      }),
    }),

    unFavorite: build.mutation<PostDetail, string>({
      query: (slug) => ({
        url: `/articles/${slug}/favorite`,
        method: "delete",
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
  useLazyGetPostListQuery,
  useGetPostDetailQuery,
} = articlesApi;
