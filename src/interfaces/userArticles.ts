import type { ISpecification } from ".";
import type { IUser } from "./users";

export interface IUserArticle {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  images: string | null;
  videos: string | null;
  isActive: boolean;
  user: IUser;
  createdAt: string;
  updatedAt: string;
}

export interface IUserArticlesFind extends ISpecification {
  name?: string;
  userId?: number;
  userName?: string;
  isActive?: boolean;
}

export interface IUserArticleCreate {
  name: string;
  description?: string;
  userId: number;
}

export interface IUserArticleUpdate {
  name?: string;
  description?: string;
  userId?: number;
  isActive?: boolean;
}

export interface IUserArticlesState {
  userArticles: IUserArticle[];
  totalPages: number;
}
