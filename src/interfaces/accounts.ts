import type { ISpecification } from ".";

export interface IAccount {
  id: number;
  fullName: string;
  userName: string;
  avatar: string | null;
  isActive: boolean;
  roleId: number;
  createdAt: string;
  updatedAt: string;
}

export interface IAccountsFind extends ISpecification {
  fullName?: string;
  userName?: string;
  isActive?: boolean;
  roleId?: number;
  roleName?: string;
}

export interface IAccountCreate {
  fullName: string;
  userName: string;
  password?: string;
  roleId: number;
}

export interface IAccountUpdate {
  fullName?: string;
  roleId?: number;
}

export interface IAccountsState {
  accounts: IAccount[];
  totalPages: number;
  loggedInAccount: IAccount | null;
}
