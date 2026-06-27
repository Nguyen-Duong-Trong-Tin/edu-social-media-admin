import { createStore } from "vuex";
import roles from "./modules/roles";
import permissions from "./modules/permissions";
import settingSidebarLinks from "./modules/settingSidebarLinks";
import accounts from "./modules/accounts";
import users from "./modules/users";

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
    users
  },
});
