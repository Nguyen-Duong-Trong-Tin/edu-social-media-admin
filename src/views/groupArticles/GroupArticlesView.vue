<template>
  <div class="flex p-8 flex-col flex-1 gap-6">
    <GroupArticleAdd />

    <GroupArticlesTable :groupArticles="groupArticles" />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import type { IGroupArticle } from '@/interfaces/groupArticles';
import GroupArticlesTable from './GroupArticlesTable.vue';
import GroupArticleAdd from './GroupArticleAdd.vue';

const store = useStore();

const groupArticles = computed<IGroupArticle[]>(() => store.state.groupArticles.groupArticles);

onMounted(() => {
  store.dispatch("groupArticles/findGroupArticlesAction");
});
</script>

<style scoped></style>
