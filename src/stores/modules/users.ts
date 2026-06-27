import type { ActionContext } from "vuex";

import { createUserApi, deleteUserApi, findUsersApi, updateUserApi } from "@/apis/users";
import type { IResponseSpecification, IRootState } from "@/interfaces";
import type { IUser, IUserCreate, IUsersFind, IUsersState, IUserUpdate } from "@/interfaces/users";

const state = (): IUsersState => {
  return {
    users: [],
    totalPages: 0,
  };
};

const getters = {};

const mutations = {
  setUsersMutation(state: IUsersState, data: IResponseSpecification<IUser[]>) {
    state.users = data.items;
    state.totalPages = data.totalPages;
  }
};

const actions = {
  async findUsersAction(context: ActionContext<IUsersState, IRootState>, params: IUsersFind) {
    const { data } = await findUsersApi(params);
    context.commit("setUsersMutation", data);
  },
  async createUserAction(context: ActionContext<IUsersState, IRootState>, payload: IUserCreate) {
    const response = await createUserApi(payload);
    return response;
  },
  async updateUserAction(context: ActionContext<IUsersState, IRootState>, data: IUserUpdate & { id: number }) {
    const { id, ...payload } = data;
    const response = await updateUserApi(id, payload);
    return response;
  },
  async deleteUserAction(context: ActionContext<IUsersState, IRootState>, id: number) {
    const response = await deleteUserApi(id);
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
