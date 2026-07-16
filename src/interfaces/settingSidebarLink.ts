import type { ISpecification } from ".";

export interface ISettingSidebarLink {
  id: number;
  name: string;
  path: string;
  icon: string;
  isExact: boolean;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ISettingSidebarLinksFind extends ISpecification {
  name: string;
  path: string;
  icon: string;
  isExact: boolean;
  sortOrder: number;
}

export interface ISettingSidebarLinkCreate {
  name: string;
  path: string;
  icon: string;
  isExact: boolean;
  sortOrder: number;
}

export interface ISettingSidebarLinkUpdate {
  name: string;
  path: string;
  icon: string;
  isExact: boolean;
  sortOrder: number;
}

export interface ISettingSidebarLinksState {
  settingSidebarLinks: ISettingSidebarLink[];
  allSidebarLinks: ISettingSidebarLink[];
  totalPages: number;
}
