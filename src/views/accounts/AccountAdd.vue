<template>
  <div class="flex justify-between items-end">
    <div class="flex flex-col gap-1">
      <h1 class="font-semibold text-2xl leading-8 tracking-tight">Accounts</h1>
      <div class="text-neutral-500 text-sm leading-5 flex items-center gap-1">
        <span>Admin</span>
        <ChevronRight class="size-3.5" />
        <span class="text-neutral-950">Accounts</span>
      </div>
    </div>

    <div class="flex items-center gap-3">
      <Button class="bg-[#1877F2] text-white hover:bg-[#1877F2]/90 gap-2" @click="isModalOpen = true">
        <Plus class="size-4" /> Add New Account
      </Button>
    </div>
  </div>

  <div v-if="isModalOpen" class="bg-[#1a2236]/60 fixed inset-0 z-50 flex justify-center items-center backdrop-blur-sm">
    <form @submit.prevent="handleCreateAccount">
      <Card class="shadow-2xl p-6 gap-6 w-[520px] relative">
        <Button type="button" variant="ghost" size="icon"
          class="absolute top-4 right-4 size-8 text-neutral-500 hover:text-neutral-950" @click="isModalOpen = false">
          <X class="size-4" />
        </Button>

        <CardHeader class="p-0 flex flex-col gap-1 pr-8">
          <h2 class="font-semibold text-lg leading-7">Add New Account</h2>
          <p class="text-neutral-500 text-sm leading-5">Create a new user account and assign their role.</p>
        </CardHeader>

        <CardContent class="flex p-0 flex-col gap-4 mt-6">
          <div class="flex flex-col gap-2">
            <Label for="fullName">Full Name</Label>
            <Input id="fullName" placeholder="e.g. John Doe" v-model="fullName" required />
          </div>

          <div class="flex flex-col gap-2">
            <Label for="userName">Username</Label>
            <Input id="userName" placeholder="e.g. johndoe" v-model="userName" required />
          </div>

          <div class="flex flex-col gap-2">
            <Label for="password">Password</Label>
            <Input id="password" type="password" placeholder="••••••••" v-model="password" required />
          </div>

          <div class="flex flex-col gap-2">
            <Label for="roleId">Role</Label>
            <select
              id="roleId"
              v-model="roleId"
              class="h-9 rounded-md border border-neutral-200 bg-white px-3 py-1 text-sm shadow-xs outline-hidden focus-visible:ring-3 focus-visible:ring-ring/50 w-full"
              required
            >
              <option value="" disabled selected>Select a role...</option>
              <option v-for="role in roles" :key="role.id" :value="role.id">
                {{ role.name }}
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
import type { IRole } from '@/interfaces/roles';

const store = useStore();

const isModalOpen = ref(false);
const fullName = ref('');
const userName = ref('');
const password = ref('');
const roleId = ref<number | ''>('');

const roles = computed<IRole[]>(() => store.state.roles.roles);

onMounted(() => {
  store.dispatch('roles/findRolesAction', { size: 100 });
});

const handleCreateAccount = async () => {
  if (roleId.value === '') {
    toast.error('Please select a role.');
    return;
  }

  try {
    await store.dispatch('accounts/createAccountAction', {
      fullName: fullName.value,
      userName: userName.value,
      password: password.value,
      roleId: roleId.value
    });

    isModalOpen.value = false;
    fullName.value = '';
    userName.value = '';
    password.value = '';
    roleId.value = '';

    store.dispatch('accounts/findAccountsAction');

    toast.success('Account created successfully!');
  } catch (error: any) {
    const errorMsg = error?.response?.data?.message || 'Failed to create account.';
    toast.error(errorMsg);
  }
}
</script>

<style scoped></style>
