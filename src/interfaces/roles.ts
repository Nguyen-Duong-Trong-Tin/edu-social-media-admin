import type { IPermission } from "./permissions";

export interface IRole {
  id: number;
  name: string;
  description: string;
  permissions: IPermission[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IRolesFind {
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
}
