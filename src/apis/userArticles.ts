import axiosApi from ".";
import type { IUserArticleCreate, IUserArticlesFind, IUserArticleUpdate } from "@/interfaces/userArticles";

export const findUserArticlesApi = async (params: IUserArticlesFind) => {
  const response = await axiosApi.get("v1/user-articles", { params });
  return response;
};

export const createUserArticleApi = async (payload: IUserArticleCreate) => {
  const response = await axiosApi.post("v1/user-articles", payload);
  return response;
};

export const updateUserArticleApi = async (id: number, payload: IUserArticleUpdate) => {
  const response = await axiosApi.patch(`v1/user-articles/${id}`, payload);
  return response;
};

export const deleteUserArticleApi = async (id: number) => {
  const response = await axiosApi.delete(`v1/user-articles/${id}`);
  return response;
};
