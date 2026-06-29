<template>
  <div class="flex justify-between items-end">
    <div class="flex flex-col gap-1">
      <h1 class="font-semibold text-2xl leading-8 tracking-tight">Chat Rooms</h1>
      <div class="text-neutral-500 text-sm leading-5 flex items-center gap-1">
        <span>Admin</span>
        <ChevronRight class="size-3.5" />
        <span class="text-neutral-950">Chat Rooms</span>
      </div>
    </div>

    <div class="flex items-center gap-3">
      <Button class="bg-[#1877F2] text-white hover:bg-[#1877F2]/90 gap-2" @click="isModalOpen = true">
        <Plus class="size-4" /> Add New Chat Room
      </Button>
    </div>
  </div>

  <div v-if="isModalOpen" class="bg-[#1a2236]/60 fixed inset-0 z-50 flex justify-center items-center backdrop-blur-sm animate-in fade-in duration-200">
    <form @submit.prevent="handleCreateChatRoom">
      <Card class="shadow-2xl p-6 gap-6 w-[520px] relative">
        <Button type="button" variant="ghost" size="icon"
          class="absolute top-4 right-4 size-8 text-neutral-500 hover:text-neutral-950" @click="isModalOpen = false">
          <X class="size-4" />
        </Button>

        <CardHeader class="p-0 flex flex-col gap-1 pr-8">
          <h2 class="font-semibold text-lg leading-7">Add New Chat Room</h2>
          <p class="text-neutral-500 text-sm leading-5">Create a new chat room environment.</p>
        </CardHeader>

        <CardContent class="flex p-0 flex-col gap-4 mt-6">
          <div class="flex flex-col gap-2">
            <Label for="name">Chat Room Name</Label>
            <Input id="name" placeholder="e.g. general-chat" v-model="name" required />
          </div>

          <div class="flex flex-col gap-2">
            <Label for="type">Chat Room Type</Label>
            <select
              id="type"
              v-model="type"
              class="h-9 rounded-md border border-neutral-200 bg-white px-3 py-1 text-sm shadow-xs outline-hidden focus-visible:ring-3 focus-visible:ring-ring/50 w-full"
              required
            >
              <option value="FRIEND">Friend / Direct Chat</option>
              <option value="GROUP">Group Chat</option>
            </select>
          </div>

          <div v-if="type === 'GROUP'" class="flex flex-col gap-2 animate-in slide-in-from-top-1 duration-200">
            <Label for="groupId">Associated Group</Label>
            <select
              id="groupId"
              v-model="groupId"
              class="h-9 rounded-md border border-neutral-200 bg-white px-3 py-1 text-sm shadow-xs outline-hidden focus-visible:ring-3 focus-visible:ring-ring/50 w-full"
              required
            >
              <option value="" disabled selected>Select a group...</option>
              <option v-for="grp in groups" :key="grp.id" :value="grp.id">
                {{ grp.name }}
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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import type { IGroup } from '@/interfaces/groups';
import type { ChatRoomType } from '@/interfaces/chatRooms';

const store = useStore();

const isModalOpen = ref(false);
const name = ref('');
const type = ref<ChatRoomType>('FRIEND');
const groupId = ref<number | ''>('');

const groups = computed<IGroup[]>(() => store.state.groups.groups);

onMounted(() => {
  store.dispatch('groups/findGroupsAction', { size: 100 });
});

const handleCreateChatRoom = async () => {
  if (type.value === 'GROUP' && groupId.value === '') {
    toast.error('Please select an associated group.');
    return;
  }

  try {
    await store.dispatch('chatRooms/createChatRoomAction', {
      name: name.value,
      type: type.value,
      groupId: type.value === 'GROUP' ? Number(groupId.value) : undefined
    });

    isModalOpen.value = false;
    name.value = '';
    type.value = 'FRIEND';
    groupId.value = '';

    store.dispatch('chatRooms/findChatRoomsAction');

    toast.success('Chat room created successfully!');
  } catch (error: any) {
    const errorMsg = error?.response?.data?.message || 'Failed to create chat room.';
    toast.error(errorMsg);
  }
}
</script>

<style scoped></style>
