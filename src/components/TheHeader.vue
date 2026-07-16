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
      
      <!-- Profile Widget with Dropdown -->
      <div class="relative" ref="dropdownRef">
        <div
          @click="toggleDropdown"
          class="flex items-center gap-2 cursor-pointer select-none py-1 px-2 rounded-lg hover:bg-neutral-100 transition-colors"
        >
          <img alt="Admin" class="size-9 object-cover rounded-full"
            src="https://images.unsplash.com/photo-1714750977930-e7a7f4611257?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" />
          <div class="leading-tight flex flex-col" v-if="loggedInAccount">
            <span class="font-semibold text-sm leading-5 text-neutral-800">{{ loggedInAccount.fullName }}</span>
            <span class="text-neutral-500 text-xs leading-4">{{ userRoleName }}</span>
          </div>
          <ChevronDown
            class="size-4 text-neutral-500 transition-transform duration-200"
            :class="{ 'rotate-180': isDropdownOpen }"
          />
        </div>

        <!-- Dropdown Menu -->
        <transition
          enter-active-class="transition duration-100 ease-out"
          enter-from-class="transform scale-95 opacity-0"
          enter-to-class="transform scale-100 opacity-100"
          leave-active-class="transition duration-75 ease-in"
          leave-from-class="transform scale-100 opacity-100"
          leave-to-class="transform scale-95 opacity-0"
        >
          <div
            v-if="isDropdownOpen"
            class="absolute right-0 mt-2 w-56 rounded-xl bg-white border border-neutral-200/80 shadow-lg py-1.5 z-50 origin-top-right focus:outline-none"
          >
            <!-- User Info Header -->
            <div class="px-4 py-2 border-b border-neutral-100 flex flex-col mb-1.5" v-if="loggedInAccount">
              <span class="font-semibold text-sm text-neutral-800 leading-tight">{{ loggedInAccount.fullName }}</span>
              <span class="text-neutral-500 text-xs leading-tight mt-0.5">{{ loggedInAccount.userName }}</span>
            </div>

            <!-- Menu Actions -->
            <button
              @click="goToProfile"
              class="w-full px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 flex items-center gap-2.5 transition-colors font-medium text-left"
            >
              <User class="size-4 text-neutral-400" />
              My Profile
            </button>

            <button
              @click="goToSettings"
              class="w-full px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 flex items-center gap-2.5 transition-colors font-medium text-left"
            >
              <Settings class="size-4 text-neutral-400" />
              Settings
            </button>

            <div class="border-t border-neutral-100 my-1.5" />

            <button
              @click="handleLogout"
              class="w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2.5 transition-colors font-medium text-left"
            >
              <LogOut class="size-4 text-red-500" />
              Log Out
            </button>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import {
  Bell, ChevronDown, Search, User, Settings, LogOut
} from "lucide-vue-next";

import { Input } from "@/components/ui/input";
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { getCookie, deleteCookie } from '@/utils/cookie';
import { useRouter } from 'vue-router';
import { onClickOutside } from '@vueuse/core';

const store = useStore();
const router = useRouter();

const isDropdownOpen = ref(false);
const dropdownRef = ref<HTMLElement | null>(null);

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

onClickOutside(dropdownRef, () => {
  isDropdownOpen.value = false;
});

const goToProfile = () => {
  isDropdownOpen.value = false;
  router.push('/accounts');
};

const goToSettings = () => {
  isDropdownOpen.value = false;
  router.push('/');
};

const handleLogout = () => {
  isDropdownOpen.value = false;
  deleteCookie("accessToken");
  deleteCookie("refreshToken");
  deleteCookie("userName");
  deleteCookie("role");
  window.location.href = '/auth/login';
};

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
</script>
<style></style>

