import type { ISpecification } from ".";

export interface IUser {
  id: number;
  fullName: string;
  slug: string;
  email: string;
  avatar: string | null;
  coverPhoto: string | null;
  bio: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IUsersFind extends ISpecification {
  fullName?: string;
  email?: string;
  isActive?: boolean;
}

export interface IUserCreate {
  fullName: string;
  email: string;
  password?: string;
  bio?: string;
}

export interface IUserUpdate {
  fullName?: string;
  bio?: string;
}

export interface IUsersState {
  users: IUser[];
  totalPages: number;
}
