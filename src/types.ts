interface Person {
  username: string;
  bio?: string;
  image?: string;
}

export interface User extends Person {
  email?: string;
  password?: string;
  token?: string;
}

export interface Profile extends Person {
  following?: boolean;
}

export interface ArticleCore {
  title: string;
  description: string;
  body: string;
  tagList?: string[];
}

export interface Article extends ArticleCore {
  slug: string;
  author: Profile;
  createdAt: string;
  updatedAt: string;
  favorited: boolean;
  favoritesCount: number;
}

export interface Comment {
  id: number;
  body: string;
  author: Profile;
  createdAt: string;
  updatedAt: string;
}

export type Tag = {
  order: number;
  text: string;
};

export type ArticleData = {
  article: Article;
};

export type ArticlesData = {
  articles: Article[];
  articlesCount: number;
};

export type PostArticle = {
  article: ArticleCore;
};

export type UserData = {
  user: User;
};

export type ProfileData = {
  profile: Profile;
};

export type PostComment = {
  comment: Comment;
};

export type CommentsData = {
  comments: Comment[];
};

interface BasicProps {
  loading: boolean;
  error: string;
}

export interface UserMenuProps extends BasicProps {
  user: User;
  isLogged: boolean;
}

export interface ArticleFormProps extends BasicProps {
  article: Article;
  slug: string;
  formTitle: string;
  tagList: Tag[];
  original: Article;
  user: User;
}
