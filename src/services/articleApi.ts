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
      providesTags: ["Detail"],
    }),

    getPostList: build.query<PostList, GetPosts>({
      query: ({ limit = 5, page = 1 }) => ({
        url: "/articles/",
        params: {
          limit,
          offset: (page - 1) * limit,
        },
      }),
      providesTags: (res) =>
        res?.articles
          ? [
              ...res.articles.map(({ slug }) => ({
                type: "Posts" as const,
                id: slug,
              })),
              { type: "Posts", id: "LIST" },
            ]
          : [{ type: "Posts", id: "LIST" }],
    }),

    createPost: build.mutation<PostDetail, CreatePost>({
      query: ({ body, token }) => ({
        url: "/articles/",
        method: "post",
        body,
      }),
      invalidatesTags: [{ type: "Posts", id: "LIST" }],
    }),

    deletePost: build.mutation({
      query: ({ slug, token }) => ({
        url: `/articles/${slug}`,
        method: "delete",
      }),
      invalidatesTags: [{ type: "Posts", id: "LIST" }],
    }),

    updatePost: build.mutation<PostDetail, UpdatePost>({
      query: ({ slug, body }) => ({
        url: `/articles/${slug}`,
        method: "put",
        body,
      }),
      invalidatesTags: [{ type: "Posts", id: "LIST" }],
    }),

    fovorite: build.mutation<PostDetail, string>({
      query: (slug) => ({
        url: `/articles/${slug}/favorite`,
        method: "post",
      }),
      invalidatesTags: [{ type: "Posts", id: "LIST" }, "Detail"],
    }),

    unFavorite: build.mutation<PostDetail, string>({
      query: (slug) => ({
        url: `/articles/${slug}/favorite`,
        method: "delete",
      }),
      invalidatesTags: [{ type: "Posts", id: "LIST" }, "Detail"],
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
