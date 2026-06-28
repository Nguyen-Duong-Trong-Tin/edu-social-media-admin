<template>
  <Card class="shadow-sm p-6 gap-4">
    <CardHeader class="p-0 flex-row justify-between items-center gap-2">
      <div class="relative w-72">
        <Search class="size-4 top-1/2 -translate-y-1/2 text-neutral-500 absolute left-3" />
        <Input class="border-transparent bg-neutral-100 pl-9 h-9" placeholder="Search submissions by name..." v-model="searchKeyword" />
      </div>
      <Button variant="outline" size="sm" class="gap-2" @click="showFilters = !showFilters" :class="{ 'bg-neutral-100': showFilters }">
        <SlidersHorizontal class="size-4" /> Filter
      </Button>
    </CardHeader>

    <!-- Filters Section -->
    <div v-if="showFilters" class="flex flex-wrap items-center gap-4 p-4 rounded-lg bg-neutral-50 border border-neutral-100">
      <div class="flex flex-col gap-1.5 w-48">
        <Label for="filter-task" class="text-xs text-neutral-500 font-medium">Filter by Task</Label>
        <select
          id="filter-task"
          v-model="filterTask"
          class="h-8 rounded-md border border-neutral-200 bg-white px-2 py-0.5 text-xs outline-hidden focus-visible:ring-2 focus-visible:ring-ring/50 w-full"
        >
          <option value="">All Tasks</option>
          <option v-for="tsk in groupTasks" :key="tsk.id" :value="tsk.id">
            {{ tsk.name }}
          </option>
        </select>
      </div>

      <div class="flex flex-col gap-1.5 w-48">
        <Label for="filter-user" class="text-xs text-neutral-500 font-medium">Filter by User</Label>
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

      <div class="flex flex-col gap-1.5 w-48">
        <Label for="filter-status" class="text-xs text-neutral-500 font-medium">Filter by Status</Label>
        <select
          id="filter-status"
          v-model="filterActive"
          class="h-8 rounded-md border border-neutral-200 bg-white px-2 py-0.5 text-xs outline-hidden focus-visible:ring-2 focus-visible:ring-ring/50 w-full"
        >
          <option value="all">All Statuses</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
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
            <TableHead class="text-neutral-500">Submission</TableHead>
            <TableHead class="text-neutral-500">Task</TableHead>
            <TableHead class="text-neutral-500">Author</TableHead>
            <TableHead class="text-neutral-500">Description</TableHead>
            <TableHead class="text-neutral-500">Comment</TableHead>
            <TableHead class="text-neutral-500">Status</TableHead>
            <TableHead class="text-right text-neutral-500">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="(sub, index) in groupTaskSubmissions" :key="sub.id" :class="{ 'bg-neutral-100/50': index % 2 !== 0 }"
            class="border-neutral-200 border-solid">
            <TableCell class="text-neutral-500">{{ (currentPage * pageSize) + index + 1 }}</TableCell>
            <TableCell>
              <div class="flex flex-col">
                <span class="font-medium text-neutral-900 leading-tight">{{ sub.name }}</span>
                <span class="text-neutral-500 text-[11px] font-mono leading-none mt-0.5">{{ sub.slug }}</span>
              </div>
            </TableCell>
            <TableCell>
              <span class="text-neutral-900 text-xs font-medium">{{ sub.groupTask?.name || 'N/A' }}</span>
            </TableCell>
            <TableCell>
              <div class="flex items-center gap-2">
                <img
                  :alt="sub.user?.fullName || 'User'"
                  class="size-6 object-cover rounded-full bg-neutral-100"
                  :src="sub.user?.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(sub.user?.fullName || 'User')}`"
                />
                <span class="text-neutral-900 text-xs font-medium">{{ sub.user?.fullName || 'N/A' }}</span>
              </div>
            </TableCell>
            <TableCell class="max-w-[200px]">
              <span class="text-neutral-700 text-xs truncate block" :title="sub.description || ''">
                {{ sub.description || '—' }}
              </span>
            </TableCell>
            <TableCell class="max-w-[200px]">
              <span class="text-neutral-700 text-xs truncate block" :title="sub.comment || ''">
                {{ sub.comment || '—' }}
              </span>
            </TableCell>
            <TableCell>
              <Badge
                :class="sub.isActive ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200' : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'"
                variant="secondary"
              >
                {{ sub.isActive ? 'Active' : 'Inactive' }}
              </Badge>
            </TableCell>
            <TableCell class="text-right">
              <div class="flex justify-end items-center gap-2">
                <Button variant="ghost" size="icon" class="size-8 text-[#1877F2]" @click="openUpdateModal(sub)">
                  <Pencil class="size-4" />
                </Button>

                <ConfirmDialog @confirm="handleDeleteSubmission(sub.id)">
                  <Button variant="ghost" size="icon" class="size-8 text-[#e7000b]">
                    <Trash2 class="size-4" />
                  </Button>
                </ConfirmDialog>
              </div>
            </TableCell>
          </TableRow>
          <TableRow v-if="groupTaskSubmissions.length === 0">
            <TableCell colspan="8" class="text-center py-8 text-neutral-400">
              No submissions found matching search criteria.
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

  <!-- Edit Submission Modal -->
  <div v-if="isUpdateModalOpen"
    class="bg-[#1a2236]/60 fixed inset-0 z-50 flex justify-center items-center backdrop-blur-sm animate-in fade-in duration-200">
    <form @submit.prevent="handleUpdateSubmission">
      <Card class="shadow-2xl p-6 gap-6 w-[520px] relative">
        <Button type="button" variant="ghost" size="icon"
          class="absolute top-4 right-4 size-8 text-neutral-500 hover:text-neutral-950"
          @click="isUpdateModalOpen = false">
          <X class="size-4" />
        </Button>

        <CardHeader class="p-0 flex flex-col gap-1 pr-8">
          <h2 class="font-semibold text-lg leading-7">Update Submission</h2>
          <p class="text-neutral-500 text-sm leading-5">Update submission details and configurations.</p>
        </CardHeader>

        <CardContent class="flex p-0 flex-col gap-4 mt-6">
          <div class="flex flex-col gap-2">
            <Label for="update-name">Submission Title / Name</Label>
            <Input id="update-name" placeholder="e.g. John Doe - Math Task 1" v-model="updateForm.name" required />
          </div>

          <div class="flex flex-col gap-2">
            <Label for="update-description">Description</Label>
            <Textarea id="update-description" placeholder="Submission comments or notes..." class="min-h-16" v-model="updateForm.description" />
          </div>

          <div class="flex flex-col gap-2">
            <Label for="update-comment">Comment</Label>
            <Input id="update-comment" placeholder="Evaluation comment..." v-model="updateForm.comment" />
          </div>

          <div class="flex flex-col gap-2">
            <Label for="update-group-task">Group Task</Label>
            <select
              id="update-group-task"
              v-model="updateForm.groupTaskId"
              class="h-9 rounded-md border border-neutral-200 bg-white px-3 py-1 text-sm shadow-xs outline-hidden focus-visible:ring-3 focus-visible:ring-ring/50 w-full"
              required
            >
              <option v-for="tsk in groupTasks" :key="tsk.id" :value="tsk.id">
                {{ tsk.name }} ({{ tsk.group?.name }})
              </option>
            </select>
          </div>

          <div class="flex flex-col gap-2">
            <Label for="update-user">Author / User</Label>
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

          <div class="flex items-center gap-2 mt-2">
            <input type="checkbox" id="update-active" v-model="updateForm.isActive" class="size-4 text-[#1877F2] rounded focus:ring-[#1877F2]" />
            <Label for="update-active" class="cursor-pointer">Active Submission Status</Label>
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

import type { IGroupTaskSubmission } from '@/interfaces/groupTaskSubmissions';
import type { IGroupTask } from '@/interfaces/groupTasks';
import type { IUser } from '@/interfaces/users';

defineProps<{
  groupTaskSubmissions: IGroupTaskSubmission[]
}>();

const store = useStore();

const showFilters = ref(false);
const filterTask = ref<number | ''>('');
const filterUser = ref<number | ''>('');
const filterActive = ref<string>('all');
const searchKeyword = ref('');
const currentPage = ref(0);
const pageSize = ref(10);

const isUpdateModalOpen = ref(false);
const updateForm = ref({
  id: 0,
  name: '',
  description: '',
  comment: '',
  groupTaskId: 0,
  userId: 0,
  isActive: true
});

const groupTasks = computed<IGroupTask[]>(() => store.state.groupTasks.groupTasks);
const users = computed<IUser[]>(() => store.state.users.users);
const totalPages = computed(() => store.state.groupTaskSubmissions.totalPages || 1);

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

const fetchSubmissionsData = () => {
  const params: any = {
    page: currentPage.value,
    size: pageSize.value
  };

  if (searchKeyword.value.trim()) {
    params.name = searchKeyword.value.trim();
  }

  if (filterTask.value !== '') {
    params.groupTaskId = Number(filterTask.value);
  }

  if (filterUser.value !== '') {
    params.userId = Number(filterUser.value);
  }

  if (filterActive.value !== 'all') {
    params.isActive = filterActive.value === 'active';
  }

  store.dispatch('groupTaskSubmissions/findGroupTaskSubmissionsAction', params);
};

const changePage = (newPage: number) => {
  if (newPage >= 0 && newPage < totalPages.value) {
    currentPage.value = newPage;
    fetchSubmissionsData();
  }
};

const resetFilters = () => {
  filterTask.value = '';
  filterUser.value = '';
  filterActive.value = 'all';
  searchKeyword.value = '';
  currentPage.value = 0;
  fetchSubmissionsData();
};

watch([searchKeyword, filterTask, filterUser, filterActive], () => {
  currentPage.value = 0;
  fetchSubmissionsData();
});

onMounted(() => {
  store.dispatch('groupTasks/findGroupTasksAction', { size: 100 });
  store.dispatch('users/findUsersAction', { size: 100 });
});

const openUpdateModal = (sub: IGroupTaskSubmission) => {
  updateForm.value = {
    id: sub.id,
    name: sub.name,
    description: sub.description || '',
    comment: sub.comment || '',
    groupTaskId: sub.groupTask?.id || 0,
    userId: sub.user?.id || 0,
    isActive: sub.isActive
  };
  isUpdateModalOpen.value = true;
};

const handleUpdateSubmission = async () => {
  try {
    await store.dispatch('groupTaskSubmissions/updateGroupTaskSubmissionAction', {
      id: updateForm.value.id,
      name: updateForm.value.name,
      description: updateForm.value.description || undefined,
      comment: updateForm.value.comment || undefined,
      groupTaskId: updateForm.value.groupTaskId,
      userId: updateForm.value.userId,
      isActive: updateForm.value.isActive
    });

    isUpdateModalOpen.value = false;
    fetchSubmissionsData();
    toast.success("Group task submission updated successfully.");
  } catch (error: any) {
    const errorMsg = error?.response?.data?.message || 'Failed to update group task submission.';
    toast.error(errorMsg);
  }
};

const handleDeleteSubmission = async (id: number) => {
  try {
    await store.dispatch('groupTaskSubmissions/deleteGroupTaskSubmissionAction', id);
    fetchSubmissionsData();
    toast.success("Group task submission deleted successfully.");
  } catch (error: any) {
    const errorMsg = error?.response?.data?.message || 'Failed to delete group task submission.';
    toast.error(errorMsg);
  }
};
</script>

<style scoped></style>
