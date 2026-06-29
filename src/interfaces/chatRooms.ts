import type { ISpecification } from ".";
import type { IGroup } from "./groups";

export type ChatRoomType = 'FRIEND' | 'GROUP';

export interface IChatRoom {
  id: number;
  name: string;
  slug: string;
  type: ChatRoomType;
  avatar: string | null;
  isActive: boolean;
  group: IGroup | null;
  createdAt: string;
  updatedAt: string;
}

export interface IChatRoomsFind extends ISpecification {
  name?: string;
  type?: ChatRoomType;
  groupId?: number;
  groupName?: string;
  isActive?: boolean;
}

export interface IChatRoomCreate {
  name: string;
  type: ChatRoomType;
  groupId?: number;
}

export interface IChatRoomUpdate {
  name?: string;
  type?: ChatRoomType;
  groupId?: number;
  isActive?: boolean;
}

export interface IChatRoomsState {
  chatRooms: IChatRoom[];
  totalPages: number;
}
