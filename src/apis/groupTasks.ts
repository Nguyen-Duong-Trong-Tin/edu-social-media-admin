import axiosApi from ".";
import type { IGroupTaskCreate, IGroupTasksFind, IGroupTaskUpdate } from "@/interfaces/groupTasks";

export const findGroupTasksApi = async (params: IGroupTasksFind) => {
  const response = await axiosApi.get("v1/group-tasks", { params });
  return response;
};

export const createGroupTaskApi = async (payload: IGroupTaskCreate) => {
  const response = await axiosApi.post("v1/group-tasks", payload);
  return response;
};

export const updateGroupTaskApi = async (id: number, payload: IGroupTaskUpdate) => {
  const response = await axiosApi.patch(`v1/group-tasks/${id}`, payload);
  return response;
};

export const deleteGroupTaskApi = async (id: number) => {
  const response = await axiosApi.delete(`v1/group-tasks/${id}`);
  return response;
};
