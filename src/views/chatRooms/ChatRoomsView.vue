<template>
  <div class="flex p-8 flex-col flex-1 gap-6">
    <ChatRoomAdd />

    <ChatRoomsTable :chatRooms="chatRooms" />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import type { IChatRoom } from '@/interfaces/chatRooms';
import ChatRoomsTable from './ChatRoomsTable.vue';
import ChatRoomAdd from './ChatRoomAdd.vue';

const store = useStore();

const chatRooms = computed<IChatRoom[]>(() => store.state.chatRooms.chatRooms);

onMounted(() => {
  store.dispatch("chatRooms/findChatRoomsAction");
});
</script>

<style scoped></style>
