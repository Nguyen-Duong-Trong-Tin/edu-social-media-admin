import type { ISpecification } from ".";
import type { IPermission } from "./permissions";

export interface IRole {
  id: number;
  name: string;
  description: string;
  permissions: IPermission[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IRolesFind extends ISpecification {
  name: string;
  description: string;
}

export interface IRoleCreate {
  name: string;
  description: string;
}

export interface IRoleUpdate {
  name: string;
  description: string;
}

export interface IRolesState {
  roles: IRole[];
  totalPages: number;
}

export interface IRoleReplacePermissions {
  permissionIds: number[];
}
