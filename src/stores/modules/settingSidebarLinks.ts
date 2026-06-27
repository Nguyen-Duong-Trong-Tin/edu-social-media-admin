import {
  createSettingSidebarLinkApi,
  deleteSettingSidebarLinkApi,
  findSettingSidebarLinksApi,
  updateSettingSidebarLinkApi,
} from "@/apis/settingSidebarLinks";
import type { IResponseSpecification, IRootState } from "@/interfaces";
import type {
  ISettingSidebarLink,
  ISettingSidebarLinkCreate,
  ISettingSidebarLinksFind,
  ISettingSidebarLinksState,
  ISettingSidebarLinkUpdate,
} from "@/interfaces/settingSidebarLink";
import type { ActionContext } from "vuex";

const state = () => {
  return {
    settingSidebarLinks: [],
    totalPages: 0,
  };
};

const getters = {};

const mutations = {
  setSettingSidebarLinksMutation(
    state: ISettingSidebarLinksState,
    data: IResponseSpecification<ISettingSidebarLink[]>
  ) {
    state.settingSidebarLinks = data.items;
    state.totalPages = data.totalPages;
  },
};

const actions = {
  async findSettingSidebarLinksAction(
    context: ActionContext<ISettingSidebarLinksState, IRootState>,
    params: ISettingSidebarLinksFind
  ) {
    const { data } = await findSettingSidebarLinksApi(params);
    context.commit("setSettingSidebarLinksMutation", data);
  },
  async createSettingSidebarLinkAction(
    context: ActionContext<ISettingSidebarLinksState, IRootState>,
    payload: ISettingSidebarLinkCreate
  ) {
    const response = await createSettingSidebarLinkApi(payload);
    return response;
  },
  async updateSettingSidebarLinkAction(
    context: ActionContext<ISettingSidebarLinksState, IRootState>,
    data: ISettingSidebarLinkUpdate & { id: number }
  ) {
    const { id, ...payload } = data;
    const response = await updateSettingSidebarLinkApi(data.id, payload);
    return response;
  },
  async deleteSettingSidebarLinkAction(
    context: ActionContext<ISettingSidebarLinksState, IRootState>,
    id: number
  ) {
    const response = await deleteSettingSidebarLinkApi(id);
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
