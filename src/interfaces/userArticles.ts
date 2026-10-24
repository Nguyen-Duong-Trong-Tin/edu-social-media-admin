import type { ISpecification } from ".";

export type UserArticleStatus = 'PRIVATE' | 'PUBLIC' | 'FRIENDS';

export interface IUserArticle {
  id: number;
  content: string;
  images: string | null;
  videos: string | null;
  status: UserArticleStatus;
  isActive: boolean;
  userId: number;
  createdAt: string;
  updatedAt: string;
}

export interface IUserArticlesFind extends ISpecification {
  content?: string;
  status?: UserArticleStatus;
  userId?: number;
  userName?: string;
  isActive?: boolean;
}

export interface IUserArticleCreate {
  content: string;
  status: UserArticleStatus;
  userId: number;
}

export interface IUserArticleUpdate {
  content?: string;
  status?: UserArticleStatus;
  userId?: number;
  isActive?: boolean;
}

export interface IUserArticlesState {
  userArticles: IUserArticle[];
  totalPages: number;
}
