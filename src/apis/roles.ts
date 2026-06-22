import axiosApi from ".";

import type { IRoleCreate, IRolesFind } from "@/interfaces/roles";

export const findRolesApi = async (params: IRolesFind) => {
  const response = await axiosApi.get("v1/roles", { params });
  return response;
};

export const createRoleApi = async (payload: IRoleCreate) => {
  const response = await axiosApi.post("v1/roles", payload);
  return response;
}

export const updateRoleApi = async (id: number, payload: IRoleCreate) => {
  const response = await axiosApi.patch(`v1/roles/${id}`, payload);
  return response;
}

export const deleteRoleApi = async (id: number) => {
  const response = await axiosApi.delete(`v1/roles/${id}`);
  return response;
}
