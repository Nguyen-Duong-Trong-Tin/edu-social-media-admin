import type { ActionContext } from "vuex";

import { createChatRoomApi, deleteChatRoomApi, findChatRoomsApi, updateChatRoomApi } from "@/apis/chatRooms";
import type { IResponseSpecification, IRootState } from "@/interfaces";
import type { IChatRoom, IChatRoomCreate, IChatRoomsFind, IChatRoomsState, IChatRoomUpdate } from "@/interfaces/chatRooms";

const state = (): IChatRoomsState => {
  return {
    chatRooms: [],
    totalPages: 0,
  };
};

const getters = {};

const mutations = {
  setChatRoomsMutation(state: IChatRoomsState, data: IResponseSpecification<IChatRoom[]>) {
    state.chatRooms = data.items;
    state.totalPages = data.totalPages;
  }
};

const actions = {
  async findChatRoomsAction(context: ActionContext<IChatRoomsState, IRootState>, params: IChatRoomsFind) {
    const { data } = await findChatRoomsApi(params);
    context.commit("setChatRoomsMutation", data);
  },
  async createChatRoomAction(context: ActionContext<IChatRoomsState, IRootState>, payload: IChatRoomCreate) {
    const response = await createChatRoomApi(payload);
    return response;
  },
  async updateChatRoomAction(context: ActionContext<IChatRoomsState, IRootState>, data: IChatRoomUpdate & { id: number }) {
    const { id, ...payload } = data;
    const response = await updateChatRoomApi(id, payload);
    return response;
  },
  async deleteChatRoomAction(context: ActionContext<IChatRoomsState, IRootState>, id: number) {
    const response = await deleteChatRoomApi(id);
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
