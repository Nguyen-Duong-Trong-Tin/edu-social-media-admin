import type { ISpecification } from ".";
import type { IRole } from "./roles";

export interface IPermission {
  id: number;
  name: string;
  code: string;
  category?: string;
  roles: IRole[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IPermissionsFind extends ISpecification {
  name: string;
  code: string;
  category?: string;
}

export interface IPermissionCreate {
  name: string;
  category?: string;
}

export interface IPermissionUpdate {
  name: string;
  category?: string;
}

export interface IPermissionsState {
  permissions: IPermission[];
  totalPages: number;
}
