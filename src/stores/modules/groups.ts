import type { ActionContext } from "vuex";

import { createGroupApi, deleteGroupApi, findGroupsApi, updateGroupApi } from "@/apis/groups";
import type { IResponseSpecification, IRootState } from "@/interfaces";
import type { IGroup, IGroupCreate, IGroupsFind, IGroupsState, IGroupUpdate } from "@/interfaces/groups";

const state = (): IGroupsState => {
  return {
    groups: [],
    totalPages: 0,
  };
};

const getters = {};

const mutations = {
  setGroupsMutation(state: IGroupsState, data: IResponseSpecification<IGroup[]>) {
    state.groups = data.items;
    state.totalPages = data.totalPages;
  }
};

const actions = {
  async findGroupsAction(context: ActionContext<IGroupsState, IRootState>, params: IGroupsFind) {
    const { data } = await findGroupsApi(params);
    context.commit("setGroupsMutation", data);
  },
  async createGroupAction(context: ActionContext<IGroupsState, IRootState>, payload: IGroupCreate) {
    const response = await createGroupApi(payload);
    return response;
  },
  async updateGroupAction(context: ActionContext<IGroupsState, IRootState>, data: IGroupUpdate & { id: number }) {
    const { id, ...payload } = data;
    const response = await updateGroupApi(id, payload);
    return response;
  },
  async deleteGroupAction(context: ActionContext<IGroupsState, IRootState>, id: number) {
    const response = await deleteGroupApi(id);
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
