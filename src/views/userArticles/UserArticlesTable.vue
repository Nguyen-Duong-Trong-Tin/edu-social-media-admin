<template>
  <Card class="shadow-sm p-6 gap-4">
    <CardHeader class="p-0 flex-row justify-between items-center gap-2">
      <div class="relative w-72">
        <Search class="size-4 top-1/2 -translate-y-1/2 text-neutral-500 absolute left-3" />
        <Input class="border-transparent bg-neutral-100 pl-9 h-9" placeholder="Search articles by name..." v-model="searchKeyword" />
      </div>
      <Button variant="outline" size="sm" class="gap-2" @click="showFilters = !showFilters" :class="{ 'bg-neutral-100': showFilters }">
        <SlidersHorizontal class="size-4" /> Filter
      </Button>
    </CardHeader>

    <!-- Filters Section -->
    <div v-if="showFilters" class="flex flex-wrap items-center gap-4 p-4 rounded-lg bg-neutral-50 border border-neutral-100">
      <div class="flex flex-col gap-1.5 w-48">
        <Label for="filter-user" class="text-xs text-neutral-500 font-medium">Filter by Author</Label>
        <select
          id="filter-user"
          v-model="filterUser"
          class="h-8 rounded-md border border-neutral-200 bg-white px-2 py-0.5 text-xs outline-hidden focus-visible:ring-2 focus-visible:ring-ring/50 w-full"
        >
          <option value="">All Authors</option>
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
            <TableHead class="text-neutral-500">Article</TableHead>
            <TableHead class="text-neutral-500">Author</TableHead>
            <TableHead class="text-neutral-500">Content / Description</TableHead>
            <TableHead class="text-neutral-500">Status</TableHead>
            <TableHead class="text-right text-neutral-500">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="(article, index) in userArticles" :key="article.id" :class="{ 'bg-neutral-100/50': index % 2 !== 0 }"
            class="border-neutral-200 border-solid">
            <TableCell class="text-neutral-500">{{ (currentPage * pageSize) + index + 1 }}</TableCell>
            <TableCell>
              <div class="flex flex-col">
                <span class="font-medium text-neutral-900 leading-tight">{{ article.name }}</span>
                <span class="text-neutral-500 text-[11px] font-mono leading-none mt-0.5">{{ article.slug }}</span>
              </div>
            </TableCell>
            <TableCell>
              <div class="flex items-center gap-2">
                <img
                  :alt="article.user?.fullName || 'User'"
                  class="size-6 object-cover rounded-full bg-neutral-100"
                  :src="article.user?.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(article.user?.fullName || 'User')}`"
                />
                <span class="text-neutral-900 text-xs font-medium">{{ article.user?.fullName || 'N/A' }}</span>
              </div>
            </TableCell>
            <TableCell class="max-w-[320px]">
              <span class="text-neutral-700 text-xs truncate block" :title="article.description || ''">
                {{ article.description || '—' }}
              </span>
            </TableCell>
            <TableCell>
              <Badge
                :class="article.isActive ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200' : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'"
                variant="secondary"
              >
                {{ article.isActive ? 'Active' : 'Inactive' }}
              </Badge>
            </TableCell>
            <TableCell class="text-right">
              <div class="flex justify-end items-center gap-2">
                <Button variant="ghost" size="icon" class="size-8 text-[#1877F2]" @click="openUpdateModal(article)">
                  <Pencil class="size-4" />
                </Button>

                <ConfirmDialog @confirm="handleDeleteArticle(article.id)">
                  <Button variant="ghost" size="icon" class="size-8 text-[#e7000b]">
                    <Trash2 class="size-4" />
                  </Button>
                </ConfirmDialog>
              </div>
            </TableCell>
          </TableRow>
          <TableRow v-if="userArticles.length === 0">
            <TableCell colspan="6" class="text-center py-8 text-neutral-400">
              No user articles found matching search criteria.
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

  <!-- Edit Article Modal -->
  <div v-if="isUpdateModalOpen"
    class="bg-[#1a2236]/60 fixed inset-0 z-50 flex justify-center items-center backdrop-blur-sm animate-in fade-in duration-200">
    <form @submit.prevent="handleUpdateArticle">
      <Card class="shadow-2xl p-6 gap-6 w-[520px] relative">
        <Button type="button" variant="ghost" size="icon"
          class="absolute top-4 right-4 size-8 text-neutral-500 hover:text-neutral-950"
          @click="isUpdateModalOpen = false">
          <X class="size-4" />
        </Button>

        <CardHeader class="p-0 flex flex-col gap-1 pr-8">
          <h2 class="font-semibold text-lg leading-7">Update User Article</h2>
          <p class="text-neutral-500 text-sm leading-5">Update article details and configurations.</p>
        </CardHeader>

        <CardContent class="flex p-0 flex-col gap-4 mt-6">
          <div class="flex flex-col gap-2">
            <Label for="update-name">Article Title</Label>
            <Input id="update-name" placeholder="e.g. My Personal Coding Journey" v-model="updateForm.name" required />
          </div>

          <div class="flex flex-col gap-2">
            <Label for="update-description">Content / Description</Label>
            <Textarea id="update-description" placeholder="Article content or description..." class="min-h-24" v-model="updateForm.description" />
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
            <Label for="update-active" class="cursor-pointer">Active Article Status</Label>
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

import type { IUserArticle } from '@/interfaces/userArticles';
import type { IUser } from '@/interfaces/users';

defineProps<{
  userArticles: IUserArticle[]
}>();

const store = useStore();

const showFilters = ref(false);
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
  userId: 0,
  isActive: true
});

const users = computed<IUser[]>(() => store.state.users.users);
const totalPages = computed(() => store.state.userArticles.totalPages || 1);

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

const fetchArticlesData = () => {
  const params: any = {
    page: currentPage.value,
    size: pageSize.value
  };

  if (searchKeyword.value.trim()) {
    params.name = searchKeyword.value.trim();
  }

  if (filterUser.value !== '') {
    params.userId = Number(filterUser.value);
  }

  if (filterActive.value !== 'all') {
    params.isActive = filterActive.value === 'active';
  }

  store.dispatch('userArticles/findUserArticlesAction', params);
};

const changePage = (newPage: number) => {
  if (newPage >= 0 && newPage < totalPages.value) {
    currentPage.value = newPage;
    fetchArticlesData();
  }
};

const resetFilters = () => {
  filterUser.value = '';
  filterActive.value = 'all';
  searchKeyword.value = '';
  currentPage.value = 0;
  fetchArticlesData();
};

watch([searchKeyword, filterUser, filterActive], () => {
  currentPage.value = 0;
  fetchArticlesData();
});

onMounted(() => {
  store.dispatch('users/findUsersAction', { size: 100 });
});

const openUpdateModal = (article: IUserArticle) => {
  updateForm.value = {
    id: article.id,
    name: article.name,
    description: article.description || '',
    userId: article.user?.id || 0,
    isActive: article.isActive
  };
  isUpdateModalOpen.value = true;
};

const handleUpdateArticle = async () => {
  try {
    await store.dispatch('userArticles/updateUserArticleAction', {
      id: updateForm.value.id,
      name: updateForm.value.name,
      description: updateForm.value.description || undefined,
      userId: updateForm.value.userId,
      isActive: updateForm.value.isActive
    });

    isUpdateModalOpen.value = false;
    fetchArticlesData();
    toast.success("User article updated successfully.");
  } catch (error: any) {
    const errorMsg = error?.response?.data?.message || 'Failed to update user article.';
    toast.error(errorMsg);
  }
};

const handleDeleteArticle = async (id: number) => {
  try {
    await store.dispatch('userArticles/deleteUserArticleAction', id);
    fetchArticlesData();
    toast.success("User article deleted successfully.");
  } catch (error: any) {
    const errorMsg = error?.response?.data?.message || 'Failed to delete user article.';
    toast.error(errorMsg);
  }
};
</script>

<style scoped></style>
