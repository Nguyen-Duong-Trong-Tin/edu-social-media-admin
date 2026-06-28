<template>
  <div class="flex p-8 flex-col flex-1 gap-6">
    <GroupTaskAdd />

    <GroupTasksTable :groupTasks="groupTasks" />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import type { IGroupTask } from '@/interfaces/groupTasks';
import GroupTasksTable from './GroupTasksTable.vue';
import GroupTaskAdd from './GroupTaskAdd.vue';

const store = useStore();

const groupTasks = computed<IGroupTask[]>(() => store.state.groupTasks.groupTasks);

onMounted(() => {
  store.dispatch("groupTasks/findGroupTasksAction");
});
</script>

<style scoped></style>
