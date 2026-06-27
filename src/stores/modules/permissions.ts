import type { ActionContext } from "vuex";

import type { IResponseSpecification, IRootState } from "@/interfaces";
import type { IPermission, IPermissionCreate, IPermissionsFind, IPermissionsState, IPermissionUpdate } from "@/interfaces/permissions";
import { createPermissionApi, deletePermissionApi, findPermissionsApi, updatePermissionApi } from "@/apis/permissions";

const state = () => {
  return {
    permissions: [],
    totalPages: 0,
  };
};

const getters = {};

const mutations = {
  setPermissionsMutation(state: IPermissionsState, data: IResponseSpecification<IPermission[]>) {
    state.permissions = data.items;
    state.totalPages = data.totalPages;
  }
};

const actions = {
  async findPermissionsAction(context: ActionContext<IPermissionsState, IRootState>, params: IPermissionsFind) {
    const { data } = await findPermissionsApi(params);
    context.commit("setPermissionsMutation", data);
  },
  async createPermissionAction(context: ActionContext<IPermissionsState, IRootState>, payload: IPermissionCreate) {
    const response = await createPermissionApi(payload);
    return response;
  },
  async updatePermissionAction(context: ActionContext<IPermissionsState, IRootState>, data: IPermissionUpdate & { id: number }) {
    const { id, ...payload } = data;
    const response = await updatePermissionApi(data.id, payload);
    return response;
  },
  async deletePermissionAction(context: ActionContext<IPermissionsState, IRootState>, id: number) {
    const response = await deletePermissionApi(id);
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
