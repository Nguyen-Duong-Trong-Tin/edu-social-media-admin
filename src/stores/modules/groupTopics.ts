import type { ActionContext } from "vuex";

import { createGroupTopicApi, deleteGroupTopicApi, findGroupTopicsApi, updateGroupTopicApi } from "@/apis/groupTopics";
import type { IResponseSpecification, IRootState } from "@/interfaces";
import type { IGroupTopic, IGroupTopicCreate, IGroupTopicsFind, IGroupTopicsState, IGroupTopicUpdate } from "@/interfaces/groupTopics";

const state = (): IGroupTopicsState => {
  return {
    groupTopics: [],
    totalPages: 0,
  };
};

const getters = {};

const mutations = {
  setGroupTopicsMutation(state: IGroupTopicsState, data: IResponseSpecification<IGroupTopic[]>) {
    state.groupTopics = data.items;
    state.totalPages = data.totalPages;
  }
};

const actions = {
  async findGroupTopicsAction(context: ActionContext<IGroupTopicsState, IRootState>, params: IGroupTopicsFind) {
    const { data } = await findGroupTopicsApi(params);
    context.commit("setGroupTopicsMutation", data);
  },
  async createGroupTopicAction(context: ActionContext<IGroupTopicsState, IRootState>, payload: IGroupTopicCreate) {
    const response = await createGroupTopicApi(payload);
    return response;
  },
  async updateGroupTopicAction(context: ActionContext<IGroupTopicsState, IRootState>, data: IGroupTopicUpdate & { id: number }) {
    const { id, ...payload } = data;
    const response = await updateGroupTopicApi(id, payload);
    return response;
  },
  async deleteGroupTopicAction(context: ActionContext<IGroupTopicsState, IRootState>, id: number) {
    const response = await deleteGroupTopicApi(id);
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
