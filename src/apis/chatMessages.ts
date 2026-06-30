import axiosApi from ".";
import type { IChatMessageCreate, IChatMessagesFind, IChatMessageUpdate } from "@/interfaces/chatMessages";

export const findChatMessagesApi = async (params: IChatMessagesFind) => {
  const response = await axiosApi.get("v1/chat-messages", { params });
  return response;
};

export const createChatMessageApi = async (payload: IChatMessageCreate) => {
  const response = await axiosApi.post("v1/chat-messages", payload);
  return response;
};

export const updateChatMessageApi = async (id: number, payload: IChatMessageUpdate) => {
  const response = await axiosApi.patch(`v1/chat-messages/${id}`, payload);
  return response;
};

export const deleteChatMessageApi = async (id: number) => {
  const response = await axiosApi.delete(`v1/chat-messages/${id}`);
  return response;
};
