<template>
  <div class="flex p-8 flex-col flex-1 gap-6">
    <UserAdd />

    <UsersTable :users="users" />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import type { IUser } from '@/interfaces/users';
import UsersTable from './UsersTable.vue';
import UserAdd from './UserAdd.vue';

const store = useStore();

const users = computed<IUser[]>(() => store.state.users.users);

onMounted(() => {
  store.dispatch("users/findUsersAction");
});
</script>

<style scoped></style>
