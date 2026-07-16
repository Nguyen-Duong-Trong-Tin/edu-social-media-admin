<template>
  <aside class="shrink-0 bg-[#1a2236] text-white flex p-4 flex-col gap-6 w-64 h-full">
    <div class="flex px-2 pt-2 items-center gap-2 shrink-0">
      <div class="size-9 rounded-xl bg-[#1877F2] flex justify-center items-center">
        <GraduationCap class="size-5 text-white" />
      </div>
      <div class="leading-tight flex flex-col">
        <span class="font-bold text-base leading-6">EduSocial</span>
        <span class="text-white/50 text-[11px]">Admin Panel</span>
      </div>
    </div>

    <nav class="sidebar-nav flex-1 overflow-y-auto flex flex-col justify-start items-stretch gap-1">
      <router-link v-for="link in settingSidebarLinks" :key="link.name" :to="link.path" :class="[
        'rounded-lg text-sm leading-5 border-t-0 border-r-0 border-b-0 border-l-4 border-solid flex px-3 py-2.5 items-center gap-3 cursor-pointer transition-colors',
        isRouteActive(link.path, link.isExact)
          ? 'font-semibold bg-[#1877F2]/20 text-white border-[#1877F2]'
          : 'border-transparent text-white/70 hover:bg-white/5'
      ]">

        <component :is="iconMap[link.icon]"
          :class="['size-4', isRouteActive(link.path, link.isExact) ? 'text-[#1877F2]' : '']" />
        <span>{{ link.name }}</span>

      </router-link>
    </nav>

    <div class="rounded-lg bg-white/5 flex mt-auto p-3 items-center gap-3 shrink-0">
      <img alt="Admin" class="size-9 object-cover rounded-full"
        src="https://images.unsplash.com/photo-1714750977930-e7a7f4611257?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" />
      <div class="leading-tight flex flex-col" v-if="loggedInAccount">
        <span class="font-semibold text-xs leading-4">{{ loggedInAccount.fullName }}</span>
        <span class="text-white/50 text-[11px]">{{ userRoleName }}</span>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import {
  BookOpen, ClipboardCheck, ClipboardList, FileText, Globe, GraduationCap,
  Layers,
  LayoutDashboard,
  MessageCircle,
  Network,
  Settings, Shield, UserCog, UserPen, Users, Send
} from "lucide-vue-next";
import { computed } from 'vue';
import { useStore } from 'vuex';
import { getCookie } from '@/utils/cookie';

const store = useStore();
const route = useRoute();

const iconMap: Record<string, any> = {
  LayoutDashboard,
  Shield,
  Users,
  UserCog,
  BookOpen,
  FileText,
  Settings,
  Network,
  Globe,
  Layers,
  UserPen,
  ClipboardList,
  ClipboardCheck,
  MessageCircle,
  Send
};

const settingSidebarLinks = computed(() => store.state.settingSidebarLinks.settingSidebarLinks);

const loggedInAccount = computed(() => store.state.accounts.loggedInAccount);
const roles = computed(() => store.state.roles.roles);
const userRoleName = computed(() => {
  const account = loggedInAccount.value;
  if (!account) return '';
  const role = roles.value.find((r: any) => String(r.id) === String(account.roleId));
  if (role) return role.name;
  const cookieRole = getCookie("role");
  return cookieRole || 'N/A';
});

const isRouteActive = (path: string, exact: boolean) => {
  if (exact) {
    return route.path === path;
  }
  return route.path.startsWith(path);
};

store.dispatch('settingSidebarLinks/findSettingSidebarLinksAction', { sort: "sortOrder,asc", size: 100 });
</script>

<style scoped>
.sidebar-nav {
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.2) transparent;
}

.sidebar-nav::-webkit-scrollbar {
  width: 4px;
}

.sidebar-nav::-webkit-scrollbar-track {
  background: transparent;
}

.sidebar-nav::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
}

.sidebar-nav::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.4);
}
</style>
