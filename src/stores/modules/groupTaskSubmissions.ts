import type { ActionContext } from "vuex";

import { createGroupTaskSubmissionApi, deleteGroupTaskSubmissionApi, findGroupTaskSubmissionsApi, updateGroupTaskSubmissionApi } from "@/apis/groupTaskSubmissions";
import type { IResponseSpecification, IRootState } from "@/interfaces";
import type { IGroupTaskSubmission, IGroupTaskSubmissionCreate, IGroupTaskSubmissionsFind, IGroupTaskSubmissionsState, IGroupTaskSubmissionUpdate } from "@/interfaces/groupTaskSubmissions";

const state = (): IGroupTaskSubmissionsState => {
  return {
    groupTaskSubmissions: [],
    totalPages: 0,
  };
};

const getters = {};

const mutations = {
  setGroupTaskSubmissionsMutation(state: IGroupTaskSubmissionsState, data: IResponseSpecification<IGroupTaskSubmission[]>) {
    state.groupTaskSubmissions = data.items;
    state.totalPages = data.totalPages;
  }
};

const actions = {
  async findGroupTaskSubmissionsAction(context: ActionContext<IGroupTaskSubmissionsState, IRootState>, params: IGroupTaskSubmissionsFind) {
    const { data } = await findGroupTaskSubmissionsApi(params);
    context.commit("setGroupTaskSubmissionsMutation", data);
  },
  async createGroupTaskSubmissionAction(context: ActionContext<IGroupTaskSubmissionsState, IRootState>, payload: IGroupTaskSubmissionCreate) {
    const response = await createGroupTaskSubmissionApi(payload);
    return response;
  },
  async updateGroupTaskSubmissionAction(context: ActionContext<IGroupTaskSubmissionsState, IRootState>, data: IGroupTaskSubmissionUpdate & { id: number }) {
    const { id, ...payload } = data;
    const response = await updateGroupTaskSubmissionApi(id, payload);
    return response;
  },
  async deleteGroupTaskSubmissionAction(context: ActionContext<IGroupTaskSubmissionsState, IRootState>, id: number) {
    const response = await deleteGroupTaskSubmissionApi(id);
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
