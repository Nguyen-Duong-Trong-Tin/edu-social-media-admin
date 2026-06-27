import DashboardView from "@/views/dashboard/DashboardView.vue";
import RoleLayout from "@/views/roles/RoleLayout.vue";
import RolePermissionAssignment from "@/views/roles/RolePermissionAssignment.vue";
import RolePermissionsLayout from "@/views/roles/RolePermissionsLayout.vue";
import RolesView from "@/views/roles/RolesView.vue";
import AccountsView from "@/views/accounts/AccountsView.vue";
import UsersView from "@/views/users/UsersView.vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "dashboard",
      component: DashboardView,
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
  ],
});

export default router;
