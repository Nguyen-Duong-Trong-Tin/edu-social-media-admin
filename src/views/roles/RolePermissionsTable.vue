<template>
  <Card class="shadow-sm p-6 gap-4">
    <CardHeader class="p-0 flex-row justify-between items-center gap-2">
      <div class="relative w-72">
        <Search class="size-4 top-1/2 -translate-y-1/2 text-neutral-500 absolute left-3" />
        <Input class="border-transparent bg-neutral-100 pl-9 h-9" placeholder="Search permissions..." v-model="searchKeyword" />
      </div>
      <Button variant="outline" size="sm" class="gap-2">
        <SlidersHorizontal class="size-4" /> Filter
      </Button>
    </CardHeader>

    <CardContent class="p-0 gap-0 overflow-x-auto mt-4">
      <Table>
        <TableHeader>
          <TableRow class="border-neutral-200 border-solid">
            <TableHead class="text-neutral-500 w-12">#</TableHead>
            <TableHead class="text-neutral-500">Permission Name</TableHead>
            <TableHead class="text-neutral-500">Category</TableHead>
            <TableHead class="text-neutral-500">Code</TableHead>
            <TableHead class="text-right text-neutral-500">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="(permission, index) in permissions" :key="permission.id" :class="{ 'bg-neutral-100/50': index % 2 !== 0 }"
            class="border-neutral-200 border-solid">
            <TableCell class="text-neutral-500">{{ (currentPage * pageSize) + index + 1 }}</TableCell>
            <TableCell class="font-medium">{{ permission.name }}</TableCell>

            <TableCell>
              <span v-if="permission.category" class="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                {{ permission.category }}
              </span>
              <span v-else class="text-neutral-400 text-sm italic">N/A</span>
            </TableCell>

            <TableCell>
              <code class="text-sm font-mono text-neutral-600 bg-neutral-100 px-2 py-1 rounded">
                {{ permission.code }}
              </code>
            </TableCell>

            <TableCell class="text-right">
              <div class="flex justify-end items-center gap-2">

                <Button variant="ghost" size="icon" class="size-8 text-[#1877F2]" @click="openUpdateModal(permission)">
                  <Pencil class="size-4" />
                </Button>

                <ConfirmDialog @confirm="handleDeletePermission(permission.id)">
                  <Button variant="ghost" size="icon" class="size-8 text-[#e7000b]">
                    <Trash2 class="size-4" />
                  </Button>
                </ConfirmDialog>
              </div>
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

  <div v-if="isUpdateModalOpen"
    class="bg-[#1a2236]/60 fixed inset-0 z-50 flex justify-center items-center backdrop-blur-sm">
    <form @submit.prevent="handleUpdatePermission">
      <Card class="shadow-2xl p-6 gap-6 w-[520px] relative">

        <Button type="button" variant="ghost" size="icon"
          class="absolute top-4 right-4 size-8 text-neutral-500 hover:text-neutral-950"
          @click="isUpdateModalOpen = false">
          <X class="size-4" />
        </Button>

        <CardHeader class="p-0 flex flex-col gap-1 pr-8">
          <h2 class="font-semibold text-lg leading-7">Update Permission</h2>
          <p class="text-neutral-500 text-sm leading-5">Update the details of this permission.</p>
        </CardHeader>

        <CardContent class="flex p-0 flex-col gap-4 mt-6">
          <div class="flex flex-col gap-2">
            <Label for="update-pname">Permission Name</Label>
            <Input id="update-pname" placeholder="e.g. Content Manager" v-model="updateForm.name" />
          </div>
          <div class="flex flex-col gap-2">
            <Label for="update-pcategory">Category</Label>
            <Input id="update-pcategory" placeholder="e.g. User Management" v-model="updateForm.category" />
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
  Search, SlidersHorizontal, Trash2, X, Check
} from "lucide-vue-next";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import ConfirmDialog from "@/components/ConfirmDialog.vue";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import type { IPermission } from '@/interfaces/permissions';

defineProps<{
  permissions: IPermission[]
}>();

const store = useStore();

const isUpdateModalOpen = ref(false);
const updateForm = ref({
  id: 0,
  name: '',
  category: ''
});

const searchKeyword = ref('');
const currentPage = ref(0);
const pageSize = ref(10);

const totalPages = computed(() => store.state.permissions.totalPages || 1);

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

const fetchPermissionsData = () => {
  store.dispatch('permissions/findPermissionsAction', {
    name: searchKeyword.value,
    page: currentPage.value,
    size: pageSize.value
  });
};

const changePage = (newPage: number) => {
  if (newPage >= 0 && newPage < totalPages.value) {
    currentPage.value = newPage;
    fetchPermissionsData();
  }
};

watch(searchKeyword, () => {
  currentPage.value = 0;
  fetchPermissionsData();
});

const openUpdateModal = (permission: IPermission) => {
  updateForm.value = {
    id: permission.id,
    name: permission.name,
    category: permission.category || ''
  };
  isUpdateModalOpen.value = true;
};

const handleUpdatePermission = async () => {
  try {
    await store.dispatch('permissions/updatePermissionAction', {
      id: updateForm.value.id,
      name: updateForm.value.name,
      category: updateForm.value.category
    });

    isUpdateModalOpen.value = false;
    fetchPermissionsData();
    toast.success("Permission updated successfully.");
  } catch {
    toast.error("Failed to update permission. Please try again.");
  }
};

const handleDeletePermission = async (id: number) => {
  try {
    await store.dispatch('permissions/deletePermissionAction', id);
    fetchPermissionsData();
    toast.success("Permission deleted successfully.");
  } catch {
    toast.error("Failed to delete permission. Please try again later.");
  }
}
</script>

<style></style>
