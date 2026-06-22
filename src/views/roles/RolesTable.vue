<template>
  <Card class="shadow-sm p-6 gap-4">
    <CardHeader class="p-0 flex-row justify-between items-center gap-2">
      <div class="relative w-72">
        <Search class="size-4 top-1/2 -translate-y-1/2 text-neutral-500 absolute left-3" />
        <Input class="border-transparent bg-neutral-100 pl-9 h-9" placeholder="Search roles..." v-model="searchKeyword" />
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
            <TableHead class="text-neutral-500">Role Name</TableHead>
            <TableHead class="text-neutral-500">Description</TableHead>
            <TableHead class="text-neutral-500">Number Of Permissions</TableHead>
            <TableHead class="text-right text-neutral-500">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="(role, index) in roles" :key="role.id" :class="{ 'bg-neutral-100/50': index % 2 !== 0 }"
            class="border-neutral-200 border-solid">
            <TableCell class="text-neutral-500">{{ index + 1 }}</TableCell>
            <TableCell class="font-medium">{{ role.name }}</TableCell>
            <TableCell class="text-neutral-500">{{ role.description }}</TableCell>
            <TableCell>
              <Badge class="border-transparent bg-[#1877F2]/10 text-[#1877F2] hover:bg-[#1877F2]/20">
                {{ role.permissions.length }}
              </Badge>
            </TableCell>
            <TableCell class="text-right">
              <div class="flex justify-end items-center gap-2">

                <Button variant="ghost" size="icon" class="size-8 text-[#1877F2]" @click="openUpdateModal(role)">
                  <Pencil class="size-4" />
                </Button>

                <ConfirmDialog @confirm="handleDeleteRole(role.id)">
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
      <span class="text-neutral-500 text-sm leading-5">Showing 1 to 5 of 5 roles</span>
      <div class="flex items-center gap-1">
        <Button variant="outline" size="sm" class="gap-1">
          <ChevronLeft class="size-4" /> Previous
        </Button>
        <Button size="sm" class="size-8 bg-[#1877F2] text-white hover:bg-[#1877F2]/90">1</Button>
        <Button variant="outline" size="sm" class="size-8">2</Button>
        <Button variant="outline" size="sm" class="size-8">3</Button>
        <Button variant="outline" size="sm" class="gap-1">
          Next
          <ChevronRight class="size-4" />
        </Button>
      </div>
    </CardFooter>
  </Card>

  <div v-if="isUpdateModalOpen"
    class="bg-[#1a2236]/60 fixed inset-0 z-50 flex justify-center items-center backdrop-blur-sm">
    <form @submit.prevent="handleUpdateRole">
      <Card class="shadow-2xl p-6 gap-6 w-[520px] relative">

        <Button type="button" variant="ghost" size="icon"
          class="absolute top-4 right-4 size-8 text-neutral-500 hover:text-neutral-950"
          @click="isUpdateModalOpen = false">
          <X class="size-4" />
        </Button>

        <CardHeader class="p-0 flex flex-col gap-1 pr-8">
          <h2 class="font-semibold text-lg leading-7">Update Role</h2>
          <p class="text-neutral-500 text-sm leading-5">Update the details of this role.</p>
        </CardHeader>

        <CardContent class="flex p-0 flex-col gap-4 mt-6">
          <div class="flex flex-col gap-2">
            <Label for="update-rname">Role Name</Label>
            <Input id="update-rname" placeholder="e.g. Content Manager" v-model="updateForm.name" />
          </div>
          <div class="flex flex-col gap-2">
            <Label for="update-rdesc">Description</Label>
            <Textarea id="update-rdesc" placeholder="Short description of this role..." class="min-h-20"
              v-model="updateForm.description" />
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
import { ref, watch } from "vue";
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

import type { IRole } from '@/interfaces/roles';

defineProps<{
  roles: IRole[]
}>();

const store = useStore();

const isUpdateModalOpen = ref(false);
const updateForm = ref({
  id: 0,
  name: '',
  description: ''
});
const searchKeyword = ref('');

watch(searchKeyword, (newKeyword) => {
  store.dispatch('roles/findRolesAction', { name: newKeyword });
});

const openUpdateModal = (role: IRole) => {
  updateForm.value = {
    id: role.id,
    name: role.name,
    description: role.description
  };
  isUpdateModalOpen.value = true;
};

const handleUpdateRole = async () => {
  try {
    await store.dispatch('roles/updateRoleAction', {
      id: updateForm.value.id,
      name: updateForm.value.name,
      description: updateForm.value.description
    });

    isUpdateModalOpen.value = false;
    store.dispatch("roles/findRolesAction");
    toast.success("Role updated successfully.");
  } catch {
    toast.error("Failed to update role. Please try again.");
  }
};

const handleDeleteRole = async (id: number) => {
  try {
    await store.dispatch('roles/deleteRoleAction', id);
    store.dispatch("roles/findRolesAction");
    toast.success("Role deleted successfully.");
  } catch {
    toast.error("Failed to delete role. Please try again later.");
  }
}
</script>

<style></style>
