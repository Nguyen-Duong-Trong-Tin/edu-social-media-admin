<template>
  <div class="flex p-8 flex-col flex-1 gap-6">
    <RoleAdd />

    <RolesTable :roles="roles" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { useStore } from 'vuex';
import type { IRole } from '@/interfaces/roles';
import RolesTable from './RolesTable.vue';
import RoleAdd from './RoleAdd.vue';

const store = useStore();

const roles = computed<IRole[]>(() => store.state.roles.roles);

store.dispatch("roles/findRolesAction");
</script>
