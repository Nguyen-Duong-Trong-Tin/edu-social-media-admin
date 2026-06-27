import type { IPermissionCreate, IPermissionsFind, IPermissionUpdate } from "@/interfaces/permissions";
import axiosApi from ".";


export const findPermissionsApi = async (params: IPermissionsFind) => {
  const response = await axiosApi.get("v1/permissions", { params });
  return response;
};

export const createPermissionApi = async (payload: IPermissionCreate) => {
  const response = await axiosApi.post("v1/permissions", payload);
  return response;
}

export const updatePermissionApi = async (id: number, payload: IPermissionUpdate) => {
  const response = await axiosApi.patch(`v1/permissions/${id}`, payload);
  return response;
}

export const deletePermissionApi = async (id: number) => {
  const response = await axiosApi.delete(`v1/permissions/${id}`);
  return response;
}
