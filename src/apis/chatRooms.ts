import axiosApi from ".";
import type { IChatRoomCreate, IChatRoomsFind, IChatRoomUpdate } from "@/interfaces/chatRooms";

export const findChatRoomsApi = async (params: IChatRoomsFind) => {
  const response = await axiosApi.get("v1/chat-rooms", { params });
  return response;
};

export const createChatRoomApi = async (payload: IChatRoomCreate) => {
  const response = await axiosApi.post("v1/chat-rooms", payload);
  return response;
};

export const updateChatRoomApi = async (id: number, payload: IChatRoomUpdate) => {
  const response = await axiosApi.patch(`v1/chat-rooms/${id}`, payload);
  return response;
};

export const deleteChatRoomApi = async (id: number) => {
  const response = await axiosApi.delete(`v1/chat-rooms/${id}`);
  return response;
};
