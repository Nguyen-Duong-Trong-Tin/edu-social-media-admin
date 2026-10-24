import axiosApi from ".";
import type { IAccountCreate, IAccountsFind, IAccountUpdate } from "@/interfaces/accounts";

export const findAccountsApi = async (params: IAccountsFind) => {
  const response = await axiosApi.get("v1/admin/accounts", { params });
  return response;
};

export const createAccountApi = async (payload: IAccountCreate) => {
  const response = await axiosApi.post("v1/admin/accounts", payload);
  return response;
};

export const updateAccountApi = async (id: number, payload: IAccountUpdate) => {
  const response = await axiosApi.patch(`v1/admin/accounts/${id}`, payload);
  return response;
};

export const deleteAccountApi = async (id: number) => {
  const response = await axiosApi.delete(`v1/admin/accounts/${id}`);
  return response;
};
