<template>
  <div class="flex p-8 flex-col flex-1 gap-6">
    <RolePermissionAdd />

    <RolePermissionsTable :permissions="permissions" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';

import type { IPermission } from '@/interfaces/permissions';
import RolePermissionAdd from './RolePermissionAdd.vue';
import RolePermissionsTable from './RolePermissionsTable.vue';

const store = useStore();

const permissions = computed<IPermission[]>(() => store.state.permissions.permissions);

store.dispatch("permissions/findPermissionsAction");
</script>
