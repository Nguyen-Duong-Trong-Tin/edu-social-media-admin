import { createStore } from "vuex";
import roles from "./modules/roles";
import permissions from "./modules/permissions";
import settingSidebarLinks from "./modules/settingSidebarLinks";
import accounts from "./modules/accounts";
import users from "./modules/users";
import groupTopics from "./modules/groupTopics";
import groups from "./modules/groups";
import groupArticles from "./modules/groupArticles";
import userArticles from "./modules/userArticles";
import groupTasks from "./modules/groupTasks";
import groupTaskSubmissions from "./modules/groupTaskSubmissions";
import chatRooms from "./modules/chatRooms";

export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    roles,
    permissions,
    settingSidebarLinks,
    accounts,
    users,
    groupTopics,
    groups,
    groupArticles,
    userArticles,
    groupTasks,
    groupTaskSubmissions,
    chatRooms
  },
});
