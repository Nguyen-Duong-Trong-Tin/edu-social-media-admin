import axiosApi from ".";
import type { IGroupTopicCreate, IGroupTopicsFind, IGroupTopicUpdate } from "@/interfaces/groupTopics";

export const findGroupTopicsApi = async (params: IGroupTopicsFind) => {
  const response = await axiosApi.get("v1/admin/group-topics", { params });
  return response;
};

export const createGroupTopicApi = async (payload: IGroupTopicCreate) => {
  const response = await axiosApi.post("v1/admin/group-topics", payload);
  return response;
};

export const updateGroupTopicApi = async (id: number, payload: IGroupTopicUpdate) => {
  const response = await axiosApi.patch(`v1/admin/group-topics/${id}`, payload);
  return response;
};

export const deleteGroupTopicApi = async (id: number) => {
  const response = await axiosApi.delete(`v1/admin/group-topics/${id}`);
  return response;
};
