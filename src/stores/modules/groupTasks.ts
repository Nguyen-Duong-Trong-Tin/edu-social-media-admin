import type { ActionContext } from "vuex";

import { createGroupTaskApi, deleteGroupTaskApi, findGroupTasksApi, updateGroupTaskApi } from "@/apis/groupTasks";
import type { IResponseSpecification, IRootState } from "@/interfaces";
import type { IGroupTask, IGroupTaskCreate, IGroupTasksFind, IGroupTasksState, IGroupTaskUpdate } from "@/interfaces/groupTasks";

const state = (): IGroupTasksState => {
  return {
    groupTasks: [],
    totalPages: 0,
  };
};

const getters = {};

const mutations = {
  setGroupTasksMutation(state: IGroupTasksState, data: IResponseSpecification<IGroupTask[]>) {
    state.groupTasks = data.items;
    state.totalPages = data.totalPages;
  }
};

const actions = {
  async findGroupTasksAction(context: ActionContext<IGroupTasksState, IRootState>, params: IGroupTasksFind) {
    const { data } = await findGroupTasksApi(params);
    context.commit("setGroupTasksMutation", data);
  },
  async createGroupTaskAction(context: ActionContext<IGroupTasksState, IRootState>, payload: IGroupTaskCreate) {
    const response = await createGroupTaskApi(payload);
    return response;
  },
  async updateGroupTaskAction(context: ActionContext<IGroupTasksState, IRootState>, data: IGroupTaskUpdate & { id: number }) {
    const { id, ...payload } = data;
    const response = await updateGroupTaskApi(id, payload);
    return response;
  },
  async deleteGroupTaskAction(context: ActionContext<IGroupTasksState, IRootState>, id: number) {
    const response = await deleteGroupTaskApi(id);
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
