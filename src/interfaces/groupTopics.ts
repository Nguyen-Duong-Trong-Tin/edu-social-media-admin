import type { ISpecification } from ".";

export interface IGroupTopic {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface IGroupTopicsFind extends ISpecification {
  name?: string;
}

export interface IGroupTopicCreate {
  name: string;
  description?: string;
}

export interface IGroupTopicUpdate {
  name?: string;
  description?: string;
}

export interface IGroupTopicsState {
  groupTopics: IGroupTopic[];
  totalPages: number;
}
