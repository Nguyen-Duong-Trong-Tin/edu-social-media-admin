import type { ISpecification } from ".";
import type { IChatRoom } from "./chatRooms";
import type { IUser } from "./users";

export interface IChatMessage {
  id: number;
  content: string | null;
  images: string | null;
  videos: string | null;
  materials: string | null;
  user: IUser;
  chatRoom: IChatRoom;
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
