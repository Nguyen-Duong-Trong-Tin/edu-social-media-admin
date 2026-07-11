import type { ISpecification } from ".";

export interface IChatMessage {
  id: number;
  content: string | null;
  images: string | null;
  videos: string | null;
  materials: string | null;
  userId: string;
  chatRoomId: string;
  createdAt: string;
  updatedAt: string;
}

export interface IChatMessagesFind extends ISpecification {
  content?: string;
  userId?: number;
  userName?: string;
  chatRoomId?: number;
  chatRoomName?: string;
}

export interface IChatMessageCreate {
  content?: string;
  userId: number;
  chatRoomId: number;
}

export interface IChatMessageUpdate {
  content?: string;
  userId?: number;
  chatRoomId?: number;
}

export interface IChatMessagesState {
  chatMessages: IChatMessage[];
  totalPages: number;
}
