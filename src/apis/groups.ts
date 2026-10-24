import axiosApi from ".";
import type { IGroupCreate, IGroupsFind, IGroupUpdate } from "@/interfaces/groups";

export const findGroupsApi = async (params: IGroupsFind) => {
  const response = await axiosApi.get("v1/admin/groups", { params });
  return response;
};

export const createGroupApi = async (payload: IGroupCreate) => {
  const response = await axiosApi.post("v1/admin/groups", payload);
  return response;
};

export const updateGroupApi = async (id: number, payload: IGroupUpdate) => {
  const response = await axiosApi.patch(`v1/admin/groups/${id}`, payload);
  return response;
};

export const deleteGroupApi = async (id: number) => {
  const response = await axiosApi.delete(`v1/admin/groups/${id}`);
  return response;
};
