import axiosApi from ".";
import type { IGroupTaskSubmissionCreate, IGroupTaskSubmissionsFind, IGroupTaskSubmissionUpdate } from "@/interfaces/groupTaskSubmissions";

export const findGroupTaskSubmissionsApi = async (params: IGroupTaskSubmissionsFind) => {
  const response = await axiosApi.get("v1/group-task-submissions", { params });
  return response;
};

export const createGroupTaskSubmissionApi = async (payload: IGroupTaskSubmissionCreate) => {
  const response = await axiosApi.post("v1/group-task-submissions", payload);
  return response;
};

export const updateGroupTaskSubmissionApi = async (id: number, payload: IGroupTaskSubmissionUpdate) => {
  const response = await axiosApi.patch(`v1/group-task-submissions/${id}`, payload);
  return response;
};

export const deleteGroupTaskSubmissionApi = async (id: number) => {
  const response = await axiosApi.delete(`v1/group-task-submissions/${id}`);
  return response;
};
