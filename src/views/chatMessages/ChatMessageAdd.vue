<template>
  <div class="flex justify-between items-end">
    <div class="flex flex-col gap-1">
      <h1 class="font-semibold text-2xl leading-8 tracking-tight">Chat Messages</h1>
      <div class="text-neutral-500 text-sm leading-5 flex items-center gap-1">
        <span>Admin</span>
        <ChevronRight class="size-3.5" />
        <span class="text-neutral-950">Chat Messages</span>
      </div>
    </div>

    <div class="flex items-center gap-3">
      <Button class="bg-[#1877F2] text-white hover:bg-[#1877F2]/90 gap-2" @click="isModalOpen = true">
        <Plus class="size-4" /> Add New Message
      </Button>
    </div>
  </div>

  <div v-if="isModalOpen" class="bg-[#1a2236]/60 fixed inset-0 z-50 flex justify-center items-center backdrop-blur-sm animate-in fade-in duration-200">
    <form @submit.prevent="handleCreateMessage">
      <Card class="shadow-2xl p-6 gap-6 w-[520px] relative">
        <Button type="button" variant="ghost" size="icon"
          class="absolute top-4 right-4 size-8 text-neutral-500 hover:text-neutral-950" @click="isModalOpen = false">
          <X class="size-4" />
        </Button>

        <CardHeader class="p-0 flex flex-col gap-1 pr-8">
          <h2 class="font-semibold text-lg leading-7">Add New Message</h2>
          <p class="text-neutral-500 text-sm leading-5">Send or record a new chat message in a room.</p>
        </CardHeader>

        <CardContent class="flex p-0 flex-col gap-4 mt-6">
          <div class="flex flex-col gap-2">
            <Label for="content">Message Content</Label>
            <Textarea id="content" placeholder="Type message text here..." class="min-h-24" v-model="content" />
          </div>

          <div class="flex flex-col gap-2">
            <Label for="chatRoomId">Chat Room</Label>
            <select
              id="chatRoomId"
              v-model="chatRoomId"
              class="h-9 rounded-md border border-neutral-200 bg-white px-3 py-1 text-sm shadow-xs outline-hidden focus-visible:ring-3 focus-visible:ring-ring/50 w-full"
              required
            >
              <option value="" disabled selected>Select a chat room...</option>
              <option v-for="rm in chatRooms" :key="rm.id" :value="rm.id">
                {{ rm.name }} ({{ rm.type }})
              </option>
            </select>
          </div>

          <div class="flex flex-col gap-2">
            <Label for="userId">Sender / User</Label>
            <select
              id="userId"
              v-model="userId"
              class="h-9 rounded-md border border-neutral-200 bg-white px-3 py-1 text-sm shadow-xs outline-hidden focus-visible:ring-3 focus-visible:ring-ring/50 w-full"
              required
            >
              <option value="" disabled selected>Select a sender...</option>
              <option v-for="usr in users" :key="usr.id" :value="usr.id">
                {{ usr.fullName }} ({{ usr.email }})
              </option>
            </select>
          </div>
        </CardContent>

        <CardFooter class="p-0 justify-end gap-2 mt-6">
          <Button type="button" variant="secondary" @click="isModalOpen = false">Cancel</Button>
          <Button type="submit" class="bg-[#1877F2] text-white hover:bg-[#1877F2]/90 gap-2">
            <Check class="size-4" /> Save
          </Button>
        </CardFooter>
      </Card>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { toast } from 'vue-sonner';
import {
  Check, ChevronRight, Plus, X
} from "lucide-vue-next";

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import type { IChatRoom } from '@/interfaces/chatRooms';
import type { IUser } from '@/interfaces/users';

const store = useStore();

const isModalOpen = ref(false);
const content = ref('');
const chatRoomId = ref<number | ''>('');
const userId = ref<number | ''>('');

const chatRooms = computed<IChatRoom[]>(() => store.state.chatRooms.chatRooms);
const users = computed<IUser[]>(() => store.state.users.users);

onMounted(() => {
  store.dispatch('chatRooms/findChatRoomsAction', { size: 100 });
  store.dispatch('users/findUsersAction', { size: 100 });
});

const handleCreateMessage = async () => {
  if (chatRoomId.value === '') {
    toast.error('Please select a chat room.');
    return;
  }
  if (userId.value === '') {
    toast.error('Please select a sender.');
    return;
  }

  try {
    await store.dispatch('chatMessages/createChatMessageAction', {
      content: content.value || undefined,
      chatRoomId: Number(chatRoomId.value),
      userId: Number(userId.value)
    });

    isModalOpen.value = false;
    content.value = '';
    chatRoomId.value = '';
    userId.value = '';

    store.dispatch('chatMessages/findChatMessagesAction');

    toast.success('Chat message sent successfully!');
  } catch (error: any) {
    const errorMsg = error?.response?.data?.message || 'Failed to send chat message.';
    toast.error(errorMsg);
  }
}
</script>

<style scoped></style>
