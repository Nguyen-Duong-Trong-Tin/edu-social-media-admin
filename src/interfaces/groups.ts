import type { ISpecification } from ".";

export interface IGroup {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  invitation: string | null;
  avatar: string | null;
  coverPhoto: string | null;
  isActive: boolean;
  groupTopicId: number;
  createdAt: string;
  updatedAt: string;
}

export interface IGroupsFind extends ISpecification {
  name?: string;
  groupTopicId?: number;
  groupTopicName?: string;
  isActive?: boolean;
}

export interface IGroupCreate {
  name: string;
  description?: string;
  invitation?: string;
  groupTopicId: number;
}

export interface IGroupUpdate {
  name?: string;
  description?: string;
  invitation?: string;
  groupTopicId?: number;
  isActive?: boolean;
}

export interface IGroupsState {
  groups: IGroup[];
  totalPages: number;
}
