<template>
  <div class="flex p-8 flex-col flex-1 gap-6">
    <ChatMessageAdd />

    <ChatMessagesTable :chatMessages="chatMessages" />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import type { IChatMessage } from '@/interfaces/chatMessages';
import ChatMessagesTable from './ChatMessagesTable.vue';
import ChatMessageAdd from './ChatMessageAdd.vue';

const store = useStore();

const chatMessages = computed<IChatMessage[]>(() => store.state.chatMessages.chatMessages);

onMounted(() => {
  store.dispatch("chatMessages/findChatMessagesAction");
});
</script>

<style scoped></style>
