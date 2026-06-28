import type { ActionContext } from "vuex";

import { createGroupArticleApi, deleteGroupArticleApi, findGroupArticlesApi, updateGroupArticleApi } from "@/apis/groupArticles";
import type { IResponseSpecification, IRootState } from "@/interfaces";
import type { IGroupArticle, IGroupArticleCreate, IGroupArticlesFind, IGroupArticlesState, IGroupArticleUpdate } from "@/interfaces/groupArticles";

const state = (): IGroupArticlesState => {
  return {
    groupArticles: [],
    totalPages: 0,
  };
};

const getters = {};

const mutations = {
  setGroupArticlesMutation(state: IGroupArticlesState, data: IResponseSpecification<IGroupArticle[]>) {
    state.groupArticles = data.items;
    state.totalPages = data.totalPages;
  }
};

const actions = {
  async findGroupArticlesAction(context: ActionContext<IGroupArticlesState, IRootState>, params: IGroupArticlesFind) {
    const { data } = await findGroupArticlesApi(params);
    context.commit("setGroupArticlesMutation", data);
  },
  async createGroupArticleAction(context: ActionContext<IGroupArticlesState, IRootState>, payload: IGroupArticleCreate) {
    const response = await createGroupArticleApi(payload);
    return response;
  },
  async updateGroupArticleAction(context: ActionContext<IGroupArticlesState, IRootState>, data: IGroupArticleUpdate & { id: number }) {
    const { id, ...payload } = data;
    const response = await updateGroupArticleApi(id, payload);
    return response;
  },
  async deleteGroupArticleAction(context: ActionContext<IGroupArticlesState, IRootState>, id: number) {
    const response = await deleteGroupArticleApi(id);
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
