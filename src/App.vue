<template>
  <LayoutAuth v-if="isAuthLayout" />
  <LayoutDefault v-else />
  <Toaster position="bottom-right" richColors />
</template>

<script setup lang="ts">
import 'vue-sonner/style.css';

import { useRoute } from 'vue-router';
import { computed } from 'vue';
import { Toaster } from 'vue-sonner';
import LayoutAuth from './layouts/LayoutAuth.vue';
import LayoutDefault from './layouts/LayoutDefault.vue';

const route = useRoute();

const isAuthLayout = computed(() => route.fullPath.startsWith('/auth'));

</script>

<style scoped></style>
