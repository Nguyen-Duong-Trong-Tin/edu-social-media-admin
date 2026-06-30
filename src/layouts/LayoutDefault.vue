<template>
  <div class="flex h-screen w-full bg-white text-neutral-950 overflow-hidden">

    <TheSideBar />

    <div class="flex flex-col flex-1 h-full min-w-0">

      <TheHeader />

      <main class="flex-1 bg-[#f4f6f9] overflow-y-auto overflow-x-hidden">
        <router-view />

        <Toaster position="bottom-right" richColors />
      </main>

    </div>

  </div>
</template>
<script setup lang="ts">
import TheHeader from '@/components/TheHeader.vue';
import TheSideBar from '@/components/TheSideBar.vue';

import { Toaster } from 'vue-sonner';
</script>
<style></style>
