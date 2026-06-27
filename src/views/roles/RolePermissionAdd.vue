<template>
  <div class="flex justify-between items-end">
    <div class="flex flex-col gap-1">
      <h1 class="font-semibold text-2xl leading-8 tracking-tight">Role — Permissions</h1>
      <div class="text-neutral-500 text-sm leading-5 flex items-center gap-1">
        <span>Admin</span>
        <ChevronRight class="size-3.5" />
        <span>Roles</span>
        <ChevronRight class="size-3.5" />
        <span class="text-neutral-950">Permissions</span>
      </div>
    </div>
    <Button class="bg-[#1877F2] text-white hover:bg-[#1877F2]/90 gap-2" @click="isModalOpen = true">
      <Plus class="size-4" /> Add New Permission
    </Button>
  </div>

  <div v-if="isModalOpen" class="bg-[#1a2236]/60 fixed inset-0 z-50 flex justify-center items-center backdrop-blur-sm">
    <form @submit.prevent="handleCreatePermission">
      <Card class="shadow-2xl p-6 gap-6 w-[520px] relative">

        <Button type="button" variant="ghost" size="icon"
          class="absolute top-4 right-4 size-8 text-neutral-500 hover:text-neutral-950" @click="isModalOpen = false">
          <X class="size-4" />
        </Button>

        <CardHeader class="p-0 flex flex-col gap-1 pr-8">
          <h2 class="font-semibold text-lg leading-7">Add New Permission</h2>
          <p class="text-neutral-500 text-sm leading-5">Define a new system permission.</p>
        </CardHeader>

        <CardContent class="flex p-0 flex-col gap-4 mt-6">
          <div class="flex flex-col gap-2">
            <Label for="pname">Permission Name</Label>
            <Input id="pname" placeholder="e.g. Create User" v-model="permissionName" />
          </div>
          <div class="flex flex-col gap-2">
            <Label for="pcategory">Category</Label>
            <Input id="pcategory" placeholder="e.g. User Management" v-model="permissionCategory" />
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
import { ref } from 'vue';
import { useStore } from 'vuex';
import { toast } from 'vue-sonner';
import { Check, ChevronRight, Plus, X } from "lucide-vue-next";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

const store = useStore();

const isModalOpen = ref(false);
const permissionName = ref('');
const permissionCategory = ref('');

const handleCreatePermission = async () => {
  try {
    await store.dispatch('permissions/createPermissionAction', {
      name: permissionName.value,
      category: permissionCategory.value
    });

    isModalOpen.value = false;
    permissionName.value = '';
    permissionCategory.value = '';

    store.dispatch('permissions/findPermissionsAction');
    toast.success('Permission created successfully!');
  } catch {
    toast.error('Failed to create permission.');
  }
}
</script>
