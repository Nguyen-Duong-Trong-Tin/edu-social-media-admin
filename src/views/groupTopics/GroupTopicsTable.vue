<template>
  <Card class="shadow-sm p-6 gap-4">
    <CardHeader class="p-0 flex-row justify-between items-center gap-2">
      <div class="relative w-72">
        <Search class="size-4 top-1/2 -translate-y-1/2 text-neutral-500 absolute left-3" />
        <Input class="border-transparent bg-neutral-100 pl-9 h-9" placeholder="Search group topics by name..." v-model="searchKeyword" />
      </div>
    </CardHeader>

    <CardContent class="p-0 gap-0 overflow-x-auto mt-4">
      <Table>
        <TableHeader>
          <TableRow class="border-neutral-200 border-solid">
            <TableHead class="text-neutral-500 w-12">#</TableHead>
            <TableHead class="text-neutral-500">Name</TableHead>
            <TableHead class="text-neutral-500">Slug</TableHead>
            <TableHead class="text-neutral-500">Description</TableHead>
            <TableHead class="text-right text-neutral-500">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="(topic, index) in groupTopics" :key="topic.id" :class="{ 'bg-neutral-100/50': index % 2 !== 0 }"
            class="border-neutral-200 border-solid">
            <TableCell class="text-neutral-500">{{ (currentPage * pageSize) + index + 1 }}</TableCell>
            <TableCell class="font-medium text-neutral-900">{{ topic.name }}</TableCell>
            <TableCell class="text-neutral-600 font-mono text-xs">{{ topic.slug }}</TableCell>
            <TableCell class="text-neutral-500 max-w-[320px] truncate" :title="topic.description || ''">
              {{ topic.description || '—' }}
            </TableCell>
            <TableCell class="text-right">
              <div class="flex justify-end items-center gap-2">
                <Button variant="ghost" size="icon" class="size-8 text-[#1877F2]" @click="openUpdateModal(topic)">
                  <Pencil class="size-4" />
                </Button>

                <ConfirmDialog @confirm="handleDeleteGroupTopic(topic.id)">
                  <Button variant="ghost" size="icon" class="size-8 text-[#e7000b]">
                    <Trash2 class="size-4" />
                  </Button>
                </ConfirmDialog>
              </div>
            </TableCell>
          </TableRow>
          <TableRow v-if="groupTopics.length === 0">
            <TableCell colspan="5" class="text-center py-8 text-neutral-400">
              No group topics found matching search criteria.
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

  <!-- Edit Group Topic Modal -->
  <div v-if="isUpdateModalOpen"
    class="bg-[#1a2236]/60 fixed inset-0 z-50 flex justify-center items-center backdrop-blur-sm">
    <form @submit.prevent="handleUpdateGroupTopic">
      <Card class="shadow-2xl p-6 gap-6 w-[520px] relative">
        <Button type="button" variant="ghost" size="icon"
          class="absolute top-4 right-4 size-8 text-neutral-500 hover:text-neutral-950"
          @click="isUpdateModalOpen = false">
          <X class="size-4" />
        </Button>

        <CardHeader class="p-0 flex flex-col gap-1 pr-8">
          <h2 class="font-semibold text-lg leading-7">Update Group Topic</h2>
          <p class="text-neutral-500 text-sm leading-5">Update group topic details.</p>
        </CardHeader>

        <CardContent class="flex p-0 flex-col gap-4 mt-6">
          <div class="flex flex-col gap-2">
            <Label for="update-name">Topic Name</Label>
            <Input id="update-name" placeholder="e.g. Technology" v-model="updateForm.name" required />
          </div>
          <div class="flex flex-col gap-2">
            <Label for="update-description">Description</Label>
            <Textarea id="update-description" placeholder="Topic description..." class="min-h-20" v-model="updateForm.description" />
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
import { ref, watch, computed } from "vue";
import { useStore } from "vuex";
import { toast } from "vue-sonner";
import {
  ChevronLeft, ChevronRight, Pencil,
  Search, Trash2, X, Check
} from "lucide-vue-next";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import ConfirmDialog from "@/components/ConfirmDialog.vue";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import type { IGroupTopic } from '@/interfaces/groupTopics';

defineProps<{
  groupTopics: IGroupTopic[]
}>();

const store = useStore();

const searchKeyword = ref('');
const currentPage = ref(0);
const pageSize = ref(10);

const isUpdateModalOpen = ref(false);
const updateForm = ref({
  id: 0,
  name: '',
  description: ''
});

const totalPages = computed(() => store.state.groupTopics.totalPages || 1);

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

const fetchGroupTopicsData = () => {
  const params: any = {
    page: currentPage.value,
    size: pageSize.value
  };

  if (searchKeyword.value.trim()) {
    params.name = searchKeyword.value.trim();
  }

  store.dispatch('groupTopics/findGroupTopicsAction', params);
};

const changePage = (newPage: number) => {
  if (newPage >= 0 && newPage < totalPages.value) {
    currentPage.value = newPage;
    fetchGroupTopicsData();
  }
};

watch(searchKeyword, () => {
  currentPage.value = 0;
  fetchGroupTopicsData();
});

const openUpdateModal = (topic: IGroupTopic) => {
  updateForm.value = {
    id: topic.id,
    name: topic.name,
    description: topic.description || ''
  };
  isUpdateModalOpen.value = true;
};

const handleUpdateGroupTopic = async () => {
  try {
    await store.dispatch('groupTopics/updateGroupTopicAction', {
      id: updateForm.value.id,
      name: updateForm.value.name,
      description: updateForm.value.description
    });

    isUpdateModalOpen.value = false;
    fetchGroupTopicsData();
    toast.success("Group topic updated successfully.");
  } catch (error: any) {
    const errorMsg = error?.response?.data?.message || 'Failed to update group topic.';
    toast.error(errorMsg);
  }
};

const handleDeleteGroupTopic = async (id: number) => {
  try {
    await store.dispatch('groupTopics/deleteGroupTopicAction', id);
    fetchGroupTopicsData();
    toast.success("Group topic deleted successfully.");
  } catch (error: any) {
    const errorMsg = error?.response?.data?.message || 'Failed to delete group topic.';
    toast.error(errorMsg);
  }
};
</script>

<style scoped></style>
