<template>
  <div class="flex p-8 flex-col flex-1 gap-6">
    <GroupTopicAdd />

    <GroupTopicsTable :groupTopics="groupTopics" />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import type { IGroupTopic } from '@/interfaces/groupTopics';
import GroupTopicsTable from './GroupTopicsTable.vue';
import GroupTopicAdd from './GroupTopicAdd.vue';

const store = useStore();

const groupTopics = computed<IGroupTopic[]>(() => store.state.groupTopics.groupTopics);

onMounted(() => {
  store.dispatch("groupTopics/findGroupTopicsAction");
});
</script>

<style scoped></style>
