import type { ActionContext } from "vuex";

import { createChatMessageApi, deleteChatMessageApi, findChatMessagesApi, updateChatMessageApi } from "@/apis/chatMessages";
import type { IResponseSpecification, IRootState } from "@/interfaces";
import type { IChatMessage, IChatMessageCreate, IChatMessagesFind, IChatMessagesState, IChatMessageUpdate } from "@/interfaces/chatMessages";

const state = (): IChatMessagesState => {
  return {
    chatMessages: [],
    totalPages: 0,
  };
};

const getters = {};

const mutations = {
  setChatMessagesMutation(state: IChatMessagesState, data: IResponseSpecification<IChatMessage[]>) {
    state.chatMessages = data.items;
    state.totalPages = data.totalPages;
  }
};

const actions = {
  async findChatMessagesAction(context: ActionContext<IChatMessagesState, IRootState>, params: IChatMessagesFind) {
    const { data } = await findChatMessagesApi(params);
    context.commit("setChatMessagesMutation", data);
  },
  async createChatMessageAction(context: ActionContext<IChatMessagesState, IRootState>, payload: IChatMessageCreate) {
    const response = await createChatMessageApi(payload);
    return response;
  },
  async updateChatMessageAction(context: ActionContext<IChatMessagesState, IRootState>, data: IChatMessageUpdate & { id: number }) {
    const { id, ...payload } = data;
    const response = await updateChatMessageApi(id, payload);
    return response;
  },
  async deleteChatMessageAction(context: ActionContext<IChatMessagesState, IRootState>, id: number) {
    const response = await deleteChatMessageApi(id);
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
