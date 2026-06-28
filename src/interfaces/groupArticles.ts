import type { ISpecification } from ".";
import type { IGroup } from "./groups";

export interface IGroupArticle {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  images: string | null;
  videos: string | null;
  isActive: boolean;
  group: IGroup;
  createdAt: string;
  updatedAt: string;
}

export interface IGroupArticlesFind extends ISpecification {
  name?: string;
  groupId?: number;
  groupName?: string;
  isActive?: boolean;
}

export interface IGroupArticleCreate {
  name: string;
  description?: string;
  groupId: number;
}

export interface IGroupArticleUpdate {
  name?: string;
  description?: string;
  groupId?: number;
  isActive?: boolean;
}

export interface IGroupArticlesState {
  groupArticles: IGroupArticle[];
  totalPages: number;
}
