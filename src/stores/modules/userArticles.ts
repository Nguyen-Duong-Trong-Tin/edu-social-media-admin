import type { ActionContext } from "vuex";

import { createUserArticleApi, deleteUserArticleApi, findUserArticlesApi, updateUserArticleApi } from "@/apis/userArticles";
import type { IResponseSpecification, IRootState } from "@/interfaces";
import type { IUserArticle, IUserArticleCreate, IUserArticlesFind, IUserArticlesState, IUserArticleUpdate } from "@/interfaces/userArticles";

const state = (): IUserArticlesState => {
  return {
    userArticles: [],
    totalPages: 0,
  };
};

const getters = {};

const mutations = {
  setUserArticlesMutation(state: IUserArticlesState, data: IResponseSpecification<IUserArticle[]>) {
    state.userArticles = data.items;
    state.totalPages = data.totalPages;
  }
};

const actions = {
  async findUserArticlesAction(context: ActionContext<IUserArticlesState, IRootState>, params: IUserArticlesFind) {
    const { data } = await findUserArticlesApi(params);
    context.commit("setUserArticlesMutation", data);
  },
  async createUserArticleAction(context: ActionContext<IUserArticlesState, IRootState>, payload: IUserArticleCreate) {
    const response = await createUserArticleApi(payload);
    return response;
  },
  async updateUserArticleAction(context: ActionContext<IUserArticlesState, IRootState>, data: IUserArticleUpdate & { id: number }) {
    const { id, ...payload } = data;
    const response = await updateUserArticleApi(id, payload);
    return response;
  },
  async deleteUserArticleAction(context: ActionContext<IUserArticlesState, IRootState>, id: number) {
    const response = await deleteUserArticleApi(id);
    return response;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
