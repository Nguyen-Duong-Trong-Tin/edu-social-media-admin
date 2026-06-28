import axiosApi from ".";
import type { IGroupArticleCreate, IGroupArticlesFind, IGroupArticleUpdate } from "@/interfaces/groupArticles";

export const findGroupArticlesApi = async (params: IGroupArticlesFind) => {
  const response = await axiosApi.get("v1/group-articles", { params });
  return response;
};

export const createGroupArticleApi = async (payload: IGroupArticleCreate) => {
  const response = await axiosApi.post("v1/group-articles", payload);
  return response;
};

export const updateGroupArticleApi = async (id: number, payload: IGroupArticleUpdate) => {
  const response = await axiosApi.patch(`v1/group-articles/${id}`, payload);
  return response;
};

export const deleteGroupArticleApi = async (id: number) => {
  const response = await axiosApi.delete(`v1/group-articles/${id}`);
  return response;
};
