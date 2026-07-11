<template>
  <Card class="shadow-sm p-6 gap-4">
    <CardHeader class="p-0 flex-row justify-between items-center gap-2">
      <div class="relative w-72">
        <Search class="size-4 top-1/2 -translate-y-1/2 text-neutral-500 absolute left-3" />
        <Input class="border-transparent bg-neutral-100 pl-9 h-9" placeholder="Search message content..." v-model="searchKeyword" />
      </div>
      <Button variant="outline" size="sm" class="gap-2" @click="showFilters = !showFilters" :class="{ 'bg-neutral-100': showFilters }">
        <SlidersHorizontal class="size-4" /> Filter
      </Button>
    </CardHeader>

    <!-- Filters Section -->
    <div v-if="showFilters" class="flex flex-wrap items-center gap-4 p-4 rounded-lg bg-neutral-50 border border-neutral-100">
      <div class="flex flex-col gap-1.5 w-48">
        <Label for="filter-room" class="text-xs text-neutral-500 font-medium">Filter by Chat Room</Label>
        <select
          id="filter-room"
          v-model="filterRoom"
          class="h-8 rounded-md border border-neutral-200 bg-white px-2 py-0.5 text-xs outline-hidden focus-visible:ring-2 focus-visible:ring-ring/50 w-full"
        >
          <option value="">All Rooms</option>
          <option v-for="rm in chatRooms" :key="rm.id" :value="rm.id">
            {{ rm.name }}
          </option>
        </select>
      </div>

      <div class="flex flex-col gap-1.5 w-48">
        <Label for="filter-user" class="text-xs text-neutral-500 font-medium">Filter by Sender</Label>
        <select
          id="filter-user"
          v-model="filterUser"
          class="h-8 rounded-md border border-neutral-200 bg-white px-2 py-0.5 text-xs outline-hidden focus-visible:ring-2 focus-visible:ring-ring/50 w-full"
        >
          <option value="">All Users</option>
          <option v-for="usr in users" :key="usr.id" :value="usr.id">
            {{ usr.fullName }}
          </option>
        </select>
      </div>

      <Button variant="ghost" size="sm" class="mt-5 text-neutral-500 text-xs h-8 px-2" @click="resetFilters">
        Reset
      </Button>
    </div>

    <CardContent class="p-0 gap-0 overflow-x-auto mt-4">
      <Table>
        <TableHeader>
          <TableRow class="border-neutral-200 border-solid">
            <TableHead class="text-neutral-500 w-12">#</TableHead>
            <TableHead class="text-neutral-500">Sender</TableHead>
            <TableHead class="text-neutral-500">Message Content</TableHead>
            <TableHead class="text-neutral-500">Chat Room</TableHead>
            <TableHead class="text-neutral-500">Sent Date</TableHead>
            <TableHead class="text-right text-neutral-500">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="(msg, index) in chatMessages" :key="msg.id" :class="{ 'bg-neutral-100/50': index % 2 !== 0 }"
            class="border-neutral-200 border-solid">
            <TableCell class="text-neutral-500">{{ (currentPage * pageSize) + index + 1 }}</TableCell>
            <TableCell>
              <div class="flex items-center gap-2">
                <img
                  :alt="getUserName(msg.userId)"
                  class="size-6 object-cover rounded-full bg-neutral-100"
                  :src="getUserAvatar(msg.userId) || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(getUserName(msg.userId))}`"
                />
                <span class="text-neutral-900 text-xs font-medium">{{ getUserName(msg.userId) }}</span>
              </div>
            </TableCell>
            <TableCell class="max-w-[320px]">
              <span class="text-neutral-700 text-xs truncate block" :title="msg.content || ''">
                {{ msg.content || '—' }}
              </span>
            </TableCell>
            <TableCell>
              <Badge variant="outline" class="border-neutral-400 text-neutral-600">
                {{ getChatRoomName(msg.chatRoomId) }}
              </Badge>
            </TableCell>
            <TableCell>
              <span class="text-neutral-500 text-xs">{{ msg.createdAt ? new Date(msg.createdAt).toLocaleString() : '—' }}</span>
            </TableCell>
            <TableCell class="text-right">
              <div class="flex justify-end items-center gap-2">
                <Button variant="ghost" size="icon" class="size-8 text-[#1877F2]" @click="openUpdateModal(msg)">
                  <Pencil class="size-4" />
                </Button>

                <ConfirmDialog @confirm="handleDeleteMessage(msg.id)">
                  <Button variant="ghost" size="icon" class="size-8 text-[#e7000b]">
                    <Trash2 class="size-4" />
                  </Button>
                </ConfirmDialog>
              </div>
            </TableCell>
          </TableRow>
          <TableRow v-if="chatMessages.length === 0">
            <TableCell colspan="6" class="text-center py-8 text-neutral-400">
              No chat messages found matching search criteria.
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </CardContent>

    <CardFooter class="flex p-0 justify-between items-center gap-2 mt-4">
      <span class="text-neutral-500 text-sm leading-5">
        Showing page {{ currentPage + 1 }} of {{ totalPages || 1 }}
      </span>
      <div class="flex items-center gap-1">
        <Button
          variant="outline"
          size="sm"
          class="gap-1"
          :disabled="currentPage === 0"
          @click="changePage(currentPage - 1)"
        >
          <ChevronLeft class="size-4" /> Previous
        </Button>

        <Button
          v-for="pageNumber in visiblePages"
          :key="pageNumber"
          size="sm"
          class="size-8"
          :variant="currentPage === pageNumber - 1 ? 'default' : 'outline'"
          :class="currentPage === pageNumber - 1 ? 'bg-[#1877F2] text-white hover:bg-[#1877F2]/90' : ''"
          @click="changePage(pageNumber - 1)"
        >
          {{ pageNumber }}
        </Button>

        <Button
          variant="outline"
          size="sm"
          class="gap-1"
          :disabled="currentPage >= totalPages - 1"
          @click="changePage(currentPage + 1)"
        >
          Next <ChevronRight class="size-4" />
        </Button>
      </div>
    </CardFooter>
  </Card>

  <!-- Edit Message Modal -->
  <div v-if="isUpdateModalOpen"
    class="bg-[#1a2236]/60 fixed inset-0 z-50 flex justify-center items-center backdrop-blur-sm animate-in fade-in duration-200">
    <form @submit.prevent="handleUpdateMessage">
      <Card class="shadow-2xl p-6 gap-6 w-[520px] relative">
        <Button type="button" variant="ghost" size="icon"
          class="absolute top-4 right-4 size-8 text-neutral-500 hover:text-neutral-950"
          @click="isUpdateModalOpen = false">
          <X class="size-4" />
        </Button>

        <CardHeader class="p-0 flex flex-col gap-1 pr-8">
          <h2 class="font-semibold text-lg leading-7">Update Message</h2>
          <p class="text-neutral-500 text-sm leading-5">Modify the chat message content or assignment.</p>
        </CardHeader>

        <CardContent class="flex p-0 flex-col gap-4 mt-6">
          <div class="flex flex-col gap-2">
            <Label for="update-content">Message Content</Label>
            <Textarea id="update-content" placeholder="Type message text here..." class="min-h-24" v-model="updateForm.content" />
          </div>

          <div class="flex flex-col gap-2">
            <Label for="update-room">Chat Room</Label>
            <select
              id="update-room"
              v-model="updateForm.chatRoomId"
              class="h-9 rounded-md border border-neutral-200 bg-white px-3 py-1 text-sm shadow-xs outline-hidden focus-visible:ring-3 focus-visible:ring-ring/50 w-full"
              required
            >
              <option v-for="rm in chatRooms" :key="rm.id" :value="rm.id">
                {{ rm.name }} ({{ rm.type }})
              </option>
            </select>
          </div>

          <div class="flex flex-col gap-2">
            <Label for="update-user">Sender / User</Label>
            <select
              id="update-user"
              v-model="updateForm.userId"
              class="h-9 rounded-md border border-neutral-200 bg-white px-3 py-1 text-sm shadow-xs outline-hidden focus-visible:ring-3 focus-visible:ring-ring/50 w-full"
              required
            >
              <option v-for="usr in users" :key="usr.id" :value="usr.id">
                {{ usr.fullName }} ({{ usr.email }})
              </option>
            </select>
          </div>
        </CardContent>

        <CardFooter class="p-0 justify-end gap-2 mt-6">
          <Button type="button" variant="secondary" @click="isUpdateModalOpen = false">Cancel</Button>
          <Button type="submit" class="bg-[#1877F2] text-white hover:bg-[#1877F2]/90 gap-2">
            <Check class="size-4" /> Save Changes
          </Button>
        </CardFooter>
      </Card>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed, onMounted } from "vue";
import { useStore } from "vuex";
import { toast } from "vue-sonner";
import {
  ChevronLeft, ChevronRight, Pencil,
  Search, SlidersHorizontal, Trash2, X, Check
} from "lucide-vue-next";

import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import ConfirmDialog from "@/components/ConfirmDialog.vue";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import type { IChatMessage } from '@/interfaces/chatMessages';
import type { IChatRoom } from '@/interfaces/chatRooms';
import type { IUser } from '@/interfaces/users';

defineProps<{
  chatMessages: IChatMessage[]
}>();

const store = useStore();

const showFilters = ref(false);
const filterRoom = ref<number | ''>('');
const filterUser = ref<number | ''>('');
const searchKeyword = ref('');
const currentPage = ref(0);
const pageSize = ref(10);

const isUpdateModalOpen = ref(false);
const updateForm = ref<{
  id: number;
  content: string;
  chatRoomId: number | '';
  userId: number | '';
}>({
  id: 0,
  content: '',
  chatRoomId: '',
  userId: ''
});

const chatRooms = computed<IChatRoom[]>(() => store.state.chatRooms.chatRooms);
const users = computed<IUser[]>(() => store.state.users.users);
const totalPages = computed(() => store.state.chatMessages.totalPages || 1);

const getUserName = (userId: number | undefined) => {
  if (!userId) return 'N/A';
  const u = users.value.find(user => String(user.id) === String(userId));
  return u ? u.fullName : 'N/A';
};

const getUserAvatar = (userId: number | undefined) => {
  if (!userId) return '';
  const u = users.value.find(user => String(user.id) === String(userId));
  return u?.avatar || '';
};

const getChatRoomName = (chatRoomId: number | undefined) => {
  if (!chatRoomId) return 'N/A';
  const room = chatRooms.value.find(r => String(r.id) === String(chatRoomId));
  return room ? room.name : 'N/A';
};

const visiblePages = computed(() => {
  const pages = [];
  const total = totalPages.value;
  const current = currentPage.value + 1;

  let start = Math.max(1, current - 2);
  const end = Math.min(total, start + 4);

  if (end - start < 4) {
    start = Math.max(1, end - 4);
  }

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }
  return pages;
});

const fetchMessagesData = () => {
  const params: any = {
    page: currentPage.value,
    size: pageSize.value
  };

  if (searchKeyword.value.trim()) {
    params.content = searchKeyword.value.trim();
  }

  if (filterRoom.value !== '') {
    params.chatRoomId = Number(filterRoom.value);
  }

  if (filterUser.value !== '') {
    params.userId = Number(filterUser.value);
  }

  store.dispatch('chatMessages/findChatMessagesAction', params);
};

const changePage = (newPage: number) => {
  if (newPage >= 0 && newPage < totalPages.value) {
    currentPage.value = newPage;
    fetchMessagesData();
  }
};

const resetFilters = () => {
  filterRoom.value = '';
  filterUser.value = '';
  searchKeyword.value = '';
  currentPage.value = 0;
  fetchMessagesData();
};

watch([searchKeyword, filterRoom, filterUser], () => {
  currentPage.value = 0;
  fetchMessagesData();
});

onMounted(() => {
  store.dispatch('chatRooms/findChatRoomsAction', { size: 100 });
  store.dispatch('users/findUsersAction', { size: 100 });
});

const openUpdateModal = (msg: IChatMessage) => {
  updateForm.value = {
    id: msg.id,
    content: msg.content || '',
    chatRoomId: msg.chatRoomId || '',
    userId: msg.userId || ''
  };
  isUpdateModalOpen.value = true;
};

const handleUpdateMessage = async () => {
  if (updateForm.value.chatRoomId === '') {
    toast.error('Please select a chat room.');
    return;
  }
  if (updateForm.value.userId === '') {
    toast.error('Please select a sender.');
    return;
  }

  try {
    await store.dispatch('chatMessages/updateChatMessageAction', {
      id: updateForm.value.id,
      content: updateForm.value.content || undefined,
      chatRoomId: Number(updateForm.value.chatRoomId),
      userId: Number(updateForm.value.userId)
    });

    isUpdateModalOpen.value = false;
    fetchMessagesData();
    toast.success("Chat message updated successfully.");
  } catch (error: any) {
    const errorMsg = error?.response?.data?.message || 'Failed to update chat message.';
    toast.error(errorMsg);
  }
};

const handleDeleteMessage = async (id: number) => {
  try {
    await store.dispatch('chatMessages/deleteChatMessageAction', id);
    fetchMessagesData();
    toast.success("Chat message deleted successfully.");
  } catch (error: any) {
    const errorMsg = error?.response?.data?.message || 'Failed to delete chat message.';
    toast.error(errorMsg);
  }
};
</script>

<style scoped></style>
