import type { ActionContext } from "vuex";

import { createRoleApi, deleteRoleApi, findRolesApi, updateRoleApi } from "@/apis/roles";
import type { IRootState } from "@/interfaces";
import type { IRole, IRoleCreate, IRolesFind, IRolesState, IRoleUpdate } from "@/interfaces/roles";

const state = () => {
  return {
    roles: [],
  };
};

const getters = {};

const mutations = {
  setRolesMutation(state: IRolesState, payload: IRole[]) {
    state.roles = payload;
  }
};

const actions = {
  async findRolesAction(context: ActionContext<IRolesState, IRootState>, params: IRolesFind) {
    const { data } = await findRolesApi(params);
    context.commit("setRolesMutation", data.items);
  },
  async createRoleAction(context: ActionContext<IRolesState, IRootState>, payload: IRoleCreate) {
    const response = await createRoleApi(payload);
    return response;
  },
  async updateRoleAction(context: ActionContext<IRolesState, IRootState>, data: IRoleUpdate & { id: number }) {
    const { id, ...payload } = data;
    const response = await updateRoleApi(data.id, payload);
    return response;
  },
  async deleteRoleAction(context: ActionContext<IRolesState, IRootState>, id: number) {
    const response = await deleteRoleApi(id);
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
