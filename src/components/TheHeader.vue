<template>
  <div
    class="bg-white border-neutral-200 border-t-0 border-r-0 border-b border-l-0 border-solid flex px-8 py-4 justify-between items-center shrink-0">
    <div class="relative w-80">
      <Search class="top-1/2 size-4 -translate-y-1/2 text-neutral-500 absolute left-3" />
      <Input class="border-transparent bg-neutral-100 pl-9 h-10" placeholder="Search users, courses, posts..." />
    </div>
    <div class="flex items-center gap-4">
      <button class="relative size-10 rounded-full flex justify-center items-center hover:bg-neutral-100">
        <Bell class="size-5 text-neutral-500" />
        <span class="size-2 rounded-full bg-[#1877F2] absolute right-2 top-2" />
      </button>
      <div class="flex items-center gap-2 cursor-pointer">
        <img alt="Admin" class="size-9 object-cover rounded-full"
          src="https://images.unsplash.com/photo-1714750977930-e7a7f4611257?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" />
        <div class="leading-tight flex flex-col" v-if="loggedInAccount">
          <span class="font-semibold text-sm leading-5">{{ loggedInAccount.fullName }}</span>
          <span class="text-neutral-500 text-xs leading-4">{{ userRoleName }}</span>
        </div>
        <ChevronDown class="size-4 text-neutral-500" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import {
  Bell, ChevronDown, Search
} from "lucide-vue-next";

import { Input } from "@/components/ui/input";
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();

const loggedInAccount = computed(() => store.state.accounts.loggedInAccount);
const roles = computed(() => store.state.roles.roles);
const userRoleName = computed(() => {
  const account = loggedInAccount.value;
  if (!account) return '';
  const role = roles.value.find((r: any) => r.id === account.roleId);
  return role ? role.name : 'N/A';
});
</script>
<style></style>
