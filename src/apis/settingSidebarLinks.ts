import type {
  ISettingSidebarLinkCreate,
  ISettingSidebarLinksFind,
  ISettingSidebarLinkUpdate,
} from "@/interfaces/settingSidebarLink";
import axiosApi from ".";

export const findSettingSidebarLinksApi = async (params: ISettingSidebarLinksFind) => {
  const response = await axiosApi.get("v1/admin/setting-sidebar-links", { params });
  return response;
};

export const createSettingSidebarLinkApi = async (payload: ISettingSidebarLinkCreate) => {
  const response = await axiosApi.post("v1/admin/setting-sidebar-links", payload);
  return response;
};

export const updateSettingSidebarLinkApi = async (
  id: number,
  payload: ISettingSidebarLinkUpdate
) => {
  const response = await axiosApi.patch(`v1/admin/setting-sidebar-links/${id}`, payload);
  return response;
};

export const deleteSettingSidebarLinkApi = async (id: number) => {
  const response = await axiosApi.delete(`v1/admin/setting-sidebar-links/${id}`);
  return response;
};
