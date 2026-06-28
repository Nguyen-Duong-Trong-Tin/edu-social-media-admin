import type { ISpecification } from ".";
import type { IGroup } from "./groups";

export interface IGroupTask {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  images: string | null;
  videos: string | null;
  deadline: string | null;
  isActive: boolean;
  group: IGroup;
  createdAt: string;
  updatedAt: string;
}

export interface IGroupTasksFind extends ISpecification {
  name?: string;
  groupId?: number;
  groupName?: string;
  isActive?: boolean;
}

export interface IGroupTaskCreate {
  name: string;
  description?: string;
  deadline?: string;
  groupId: number;
}

export interface IGroupTaskUpdate {
  name?: string;
  description?: string;
  deadline?: string;
  groupId?: number;
  isActive?: boolean;
}

export interface IGroupTasksState {
  groupTasks: IGroupTask[];
  totalPages: number;
}
