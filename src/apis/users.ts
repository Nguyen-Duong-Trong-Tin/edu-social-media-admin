import axiosApi from ".";
import type { IUserCreate, IUsersFind, IUserUpdate } from "@/interfaces/users";

export const findUsersApi = async (params: IUsersFind) => {
  const response = await axiosApi.get("v1/admin/users", { params });
  return response;
};

export const createUserApi = async (payload: IUserCreate) => {
  const response = await axiosApi.post("v1/admin/users", payload);
  return response;
};

export const updateUserApi = async (id: number, payload: IUserUpdate) => {
  const response = await axiosApi.patch(`v1/admin/users/${id}`, payload);
  return response;
};

export const deleteUserApi = async (id: number) => {
  const response = await axiosApi.delete(`v1/admin/users/${id}`);
  return response;
};
