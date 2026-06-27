import axiosApi from ".";
import type { IAccountCreate, IAccountsFind, IAccountUpdate } from "@/interfaces/accounts";

export const findAccountsApi = async (params: IAccountsFind) => {
  const response = await axiosApi.get("v1/accounts", { params });
  return response;
};

export const createAccountApi = async (payload: IAccountCreate) => {
  const response = await axiosApi.post("v1/accounts", payload);
  return response;
};

export const updateAccountApi = async (id: number, payload: IAccountUpdate) => {
  const response = await axiosApi.patch(`v1/accounts/${id}`, payload);
  return response;
};

export const deleteAccountApi = async (id: number) => {
  const response = await axiosApi.delete(`v1/accounts/${id}`);
  return response;
};
