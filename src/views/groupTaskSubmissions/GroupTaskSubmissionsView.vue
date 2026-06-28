<template>
  <div class="flex p-8 flex-col flex-1 gap-6">
    <GroupTaskSubmissionAdd />

    <GroupTaskSubmissionsTable :groupTaskSubmissions="groupTaskSubmissions" />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import type { IGroupTaskSubmission } from '@/interfaces/groupTaskSubmissions';
import GroupTaskSubmissionsTable from './GroupTaskSubmissionsTable.vue';
import GroupTaskSubmissionAdd from './GroupTaskSubmissionAdd.vue';

const store = useStore();

const groupTaskSubmissions = computed<IGroupTaskSubmission[]>(() => store.state.groupTaskSubmissions.groupTaskSubmissions);

onMounted(() => {
  store.dispatch("groupTaskSubmissions/findGroupTaskSubmissionsAction");
});
</script>

<style scoped></style>
