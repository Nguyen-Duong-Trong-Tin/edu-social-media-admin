<template>
  <div class="flex h-screen w-full bg-white text-neutral-950 overflow-hidden">

    <TheSideBar />

    <div class="flex flex-col flex-1 h-full min-w-0">

      <TheHeader />

      <main class="flex-1 bg-[#f4f6f9] overflow-y-auto overflow-x-hidden">
        <router-view />
      </main>

    </div>

  </div>
</template>
<script setup lang="ts">
import TheHeader from '@/components/TheHeader.vue';
import TheSideBar from '@/components/TheSideBar.vue';
import { useStore } from 'vuex';
import { computed } from 'vue';

const store = useStore();

const loggedInAccount = computed(() => store.state.accounts.loggedInAccount);
if (!loggedInAccount.value) {
  store.dispatch("accounts/findLoggedInAccountAction");
}
store.dispatch("roles/findRolesAction", { size: 100 });
</script>
<style></style>
