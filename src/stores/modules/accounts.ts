import type { ActionContext } from "vuex";

import { createAccountApi, deleteAccountApi, findAccountsApi, updateAccountApi } from "@/apis/accounts";
import type { IResponseSpecification, IRootState } from "@/interfaces";
import type { IAccount, IAccountCreate, IAccountsFind, IAccountsState, IAccountUpdate } from "@/interfaces/accounts";

const state = (): IAccountsState => {
  return {
    accounts: [],
    totalPages: 0,
  };
};

const getters = {};

const mutations = {
  setAccountsMutation(state: IAccountsState, data: IResponseSpecification<IAccount[]>) {
    state.accounts = data.items;
    state.totalPages = data.totalPages;
  }
};

const actions = {
  async findAccountsAction(context: ActionContext<IAccountsState, IRootState>, params: IAccountsFind) {
    const { data } = await findAccountsApi(params);
    context.commit("setAccountsMutation", data);
  },
  async createAccountAction(context: ActionContext<IAccountsState, IRootState>, payload: IAccountCreate) {
    const response = await createAccountApi(payload);
    return response;
  },
  async updateAccountAction(context: ActionContext<IAccountsState, IRootState>, data: IAccountUpdate & { id: number }) {
    const { id, ...payload } = data;
    const response = await updateAccountApi(id, payload);
    return response;
  },
  async deleteAccountAction(context: ActionContext<IAccountsState, IRootState>, id: number) {
    const response = await deleteAccountApi(id);
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
