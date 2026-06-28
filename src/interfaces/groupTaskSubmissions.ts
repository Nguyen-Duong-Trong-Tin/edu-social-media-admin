import type { ISpecification } from ".";
import type { IGroupTask } from "./groupTasks";
import type { IUser } from "./users";

export interface IGroupTaskSubmission {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  images: string | null;
  videos: string | null;
  materials: string | null;
  comment: string | null;
  isActive: boolean;
  groupTask: IGroupTask;
  user: IUser;
  createdAt: string;
  updatedAt: string;
}

export interface IGroupTaskSubmissionsFind extends ISpecification {
  name?: string;
  groupTaskId?: number;
  groupTaskName?: string;
  userId?: number;
  userName?: string;
  isActive?: boolean;
}

export interface IGroupTaskSubmissionCreate {
  name: string;
  description?: string;
  comment?: string;
  groupTaskId: number;
  userId: number;
}

export interface IGroupTaskSubmissionUpdate {
  name?: string;
  description?: string;
  comment?: string;
  groupTaskId?: number;
  userId?: number;
  isActive?: boolean;
}

export interface IGroupTaskSubmissionsState {
  groupTaskSubmissions: IGroupTaskSubmission[];
  totalPages: number;
}
