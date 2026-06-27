<template>
  <div class="flex p-8 flex-col flex-1 gap-6">
    <GroupAdd />

    <GroupsTable :groups="groups" />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import type { IGroup } from '@/interfaces/groups';
import GroupsTable from './GroupsTable.vue';
import GroupAdd from './GroupAdd.vue';

const store = useStore();

const groups = computed<IGroup[]>(() => store.state.groups.groups);

onMounted(() => {
  store.dispatch("groups/findGroupsAction");
});
</script>

<style scoped></style>
