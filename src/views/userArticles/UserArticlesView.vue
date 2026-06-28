<template>
  <div class="flex p-8 flex-col flex-1 gap-6">
    <UserArticleAdd />

    <UserArticlesTable :userArticles="userArticles" />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import type { IUserArticle } from '@/interfaces/userArticles';
import UserArticlesTable from './UserArticlesTable.vue';
import UserArticleAdd from './UserArticleAdd.vue';

const store = useStore();

const userArticles = computed<IUserArticle[]>(() => store.state.userArticles.userArticles);

onMounted(() => {
  store.dispatch("userArticles/findUserArticlesAction");
});
</script>

<style scoped></style>
