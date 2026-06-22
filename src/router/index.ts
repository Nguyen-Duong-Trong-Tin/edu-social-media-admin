import DashboardView from "@/views/dashboard/DashboardView.vue";
import RolesView from "@/views/roles/RolesView.vue";
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
    }
  ],
});

export default router;
