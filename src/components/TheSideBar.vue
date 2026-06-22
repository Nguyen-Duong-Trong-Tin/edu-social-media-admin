<template>
  <aside class="shrink-0 bg-[#1a2236] text-white flex p-4 flex-col gap-6 w-64 h-full">
    <div class="flex px-2 pt-2 items-center gap-2">
      <div class="size-9 rounded-xl bg-[#1877F2] flex justify-center items-center">
        <GraduationCap class="size-5 text-white" />
      </div>
      <div class="leading-tight flex flex-col">
        <span class="font-bold text-base leading-6">EduSocial</span>
        <span class="text-white/50 text-[11px]">Admin Panel</span>
      </div>
    </div>

    <nav class="flex flex-col justify-start items-stretch gap-1">
      <router-link to="/"
        class="font-semibold rounded-lg bg-[#1877F2]/20 text-sm leading-5 border-[#1877F2] border-t-0 border-r-0 border-b-0 border-l-4 border-solid flex px-3 py-2.5 items-center gap-3">
        <LayoutDashboard class="size-4 text-[#1877F2]" />
        <span>Dashboard</span>
      </router-link>
      <router-link to="/roles"
        class="border-transparent rounded-lg text-white/70 text-sm leading-5 border-black/1 border-t-0 border-r-0 border-b-0 border-l-4 border-solid flex px-3 py-2.5 items-center gap-3 cursor-pointer hover:bg-white/5">
        <Shield class="size-4" />
        <span>Roles</span>
      </router-link>
      <a
        class="border-transparent rounded-lg text-white/70 text-sm leading-5 border-black/1 border-t-0 border-r-0 border-b-0 border-l-4 border-solid flex px-3 py-2.5 items-center gap-3 cursor-pointer hover:bg-white/5">
        <Lock class="size-4" />
        <span>Permissions</span>
      </a>
      <a
        class="border-transparent rounded-lg text-white/70 text-sm leading-5 border-black/1 border-t-0 border-r-0 border-b-0 border-l-4 border-solid flex px-3 py-2.5 items-center gap-3 cursor-pointer hover:bg-white/5">
        <Users class="size-4" />
        <span>Users</span>
      </a>
      <a
        class="border-transparent rounded-lg text-white/70 text-sm leading-5 border-black/1 border-t-0 border-r-0 border-b-0 border-l-4 border-solid flex px-3 py-2.5 items-center gap-3 cursor-pointer hover:bg-white/5">
        <BookOpen class="size-4" />
        <span>Courses</span>
      </a>
      <a
        class="border-transparent rounded-lg text-white/70 text-sm leading-5 border-black/1 border-t-0 border-r-0 border-b-0 border-l-4 border-solid flex px-3 py-2.5 items-center gap-3 cursor-pointer hover:bg-white/5">
        <FileText class="size-4" />
        <span>Posts</span>
      </a>
      <a
        class="border-transparent rounded-lg text-white/70 text-sm leading-5 border-black/1 border-t-0 border-r-0 border-b-0 border-l-4 border-solid flex px-3 py-2.5 items-center gap-3 cursor-pointer hover:bg-white/5">
        <Settings class="size-4" />
        <span>Settings</span>
      </a>
    </nav>

    <div class="rounded-lg bg-white/5 flex mt-auto p-3 items-center gap-3">
      <img alt="Admin" class="size-9 object-cover rounded-full"
        src="https://images.unsplash.com/photo-1714750977930-e7a7f4611257?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" />
      <div class="leading-tight flex flex-col">
        <span class="font-semibold text-xs leading-4">David Lee</span>
        <span class="text-white/50 text-[11px]">Super Admin</span>
      </div>
    </div>
  </aside>
</template>
<script setup lang="ts">
import {
  BookOpen, FileText, GraduationCap,
  LayoutDashboard, Lock,
  Settings, Shield, Users
} from "lucide-vue-next";

</script>
<style></style>
