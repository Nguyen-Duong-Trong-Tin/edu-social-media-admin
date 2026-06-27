import type { ActionContext } from "vuex";

import { createRoleApi, deleteRoleApi, findRolesApi, updateRoleApi, replaceRolePermissionsApi } from "@/apis/roles";
import type { IResponseSpecification, IRootState } from "@/interfaces";
import type { IRole, IRoleCreate, IRolesFind, IRolesState, IRoleUpdate, IRoleReplacePermissions } from "@/interfaces/roles";

const state = () => {
  return {
    roles: [],
    totalPages: 0,
  };
};

const getters = {};

const mutations = {
  setRolesMutation(state: IRolesState, data: IResponseSpecification<IRole[]>) {
    state.roles = data.items;
    state.totalPages = data.totalPages;
  }
};

const actions = {
  async findRolesAction(context: ActionContext<IRolesState, IRootState>, params: IRolesFind) {
    const { data } = await findRolesApi(params);
    context.commit("setRolesMutation", data);
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
  async replaceRolePermissionsAction(
    context: ActionContext<IRolesState, IRootState>,
    data: IRoleReplacePermissions & { id: number }
  ) {
    const { id, ...payload } = data;
    const response = await replaceRolePermissionsApi(data.id, payload);
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
