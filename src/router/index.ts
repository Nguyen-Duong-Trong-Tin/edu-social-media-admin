import DashboardView from "@/views/dashboard/DashboardView.vue";
import RoleLayout from "@/views/roles/RoleLayout.vue";
import RolePermissionAssignment from "@/views/roles/RolePermissionAssignment.vue";
import RolePermissionsLayout from "@/views/roles/RolePermissionsLayout.vue";
import RolesView from "@/views/roles/RolesView.vue";
import AccountsView from "@/views/accounts/AccountsView.vue";
import UsersView from "@/views/users/UsersView.vue";
import GroupTopicsView from "@/views/groupTopics/GroupTopicsView.vue";
import GroupsView from "@/views/groups/GroupsView.vue";
import GroupArticlesView from "@/views/groupArticles/GroupArticlesView.vue";
import UserArticlesView from "@/views/userArticles/UserArticlesView.vue";
import GroupTasksView from "@/views/groupTasks/GroupTasksView.vue";
import GroupTaskSubmissionsView from "@/views/groupTaskSubmissions/GroupTaskSubmissionsView.vue";
import ChatRoomsView from "@/views/chatRooms/ChatRoomsView.vue";
import ChatMessagesView from "@/views/chatMessages/ChatMessagesView.vue";
import { createRouter, createWebHistory } from "vue-router";
import LoginView from "@/views/login/LoginView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "dashboard",
      component: DashboardView,
    },
    {
      path: "/auth/login",
      name: "Login",
      component: LoginView,
    },
    {
      path: "/roles",
      name: "roles",
      component: RolesView,
      children: [
        {
          path: "",
          name: "RolesList",
          component: RoleLayout,
        },
        {
          path: "permissions",
          name: "PermissionsManage",
          component: RolePermissionsLayout,
        },
        {
          path: "assign-permissions",
          name: "PermissionsAssignment",
          component: RolePermissionAssignment,
        },
      ],
    },
    {
      path: "/accounts",
      name: "accounts",
      component: AccountsView,
    },
    {
      path: "/users",
      name: "users",
      component: UsersView,
    },
    {
      path: "/group-topics",
      name: "group-topics",
      component: GroupTopicsView,
    },
    {
      path: "/groups",
      name: "groups",
      component: GroupsView,
    },
    {
      path: "/group-articles",
      name: "group-articles",
      component: GroupArticlesView,
    },
    {
      path: "/user-articles",
      name: "user-articles",
      component: UserArticlesView,
    },
    {
      path: "/group-tasks",
      name: "group-tasks",
      component: GroupTasksView,
    },
    {
      path: "/group-task-submissions",
      name: "group-task-submissions",
      component: GroupTaskSubmissionsView,
    },
    {
      path: "/chat-rooms",
      name: "chat-rooms",
      component: ChatRoomsView,
    },
    {
      path: "/chat-messages",
      name: "chat-messages",
      component: ChatMessagesView,
    },
  ],
});

export default router;
