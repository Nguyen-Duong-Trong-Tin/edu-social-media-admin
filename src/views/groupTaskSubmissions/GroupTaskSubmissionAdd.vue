<template>
  <div class="flex justify-between items-end">
    <div class="flex flex-col gap-1">
      <h1 class="font-semibold text-2xl leading-8 tracking-tight">Group Task Submissions</h1>
      <div class="text-neutral-500 text-sm leading-5 flex items-center gap-1">
        <span>Admin</span>
        <ChevronRight class="size-3.5" />
        <span class="text-neutral-950">Group Task Submissions</span>
      </div>
    </div>

    <div class="flex items-center gap-3">
      <Button class="bg-[#1877F2] text-white hover:bg-[#1877F2]/90 gap-2" @click="isModalOpen = true">
        <Plus class="size-4" /> Add New Submission
      </Button>
    </div>
  </div>

  <div v-if="isModalOpen" class="bg-[#1a2236]/60 fixed inset-0 z-50 flex justify-center items-center backdrop-blur-sm animate-in fade-in duration-200">
    <form @submit.prevent="handleCreateSubmission">
      <Card class="shadow-2xl p-6 gap-6 w-[520px] relative">
        <Button type="button" variant="ghost" size="icon"
          class="absolute top-4 right-4 size-8 text-neutral-500 hover:text-neutral-950" @click="isModalOpen = false">
          <X class="size-4" />
        </Button>

        <CardHeader class="p-0 flex flex-col gap-1 pr-8">
          <h2 class="font-semibold text-lg leading-7">Add New Submission</h2>
          <p class="text-neutral-500 text-sm leading-5">Create a task submission for a user.</p>
        </CardHeader>

        <CardContent class="flex p-0 flex-col gap-4 mt-6">
          <div class="flex flex-col gap-2">
            <Label for="name">Submission Title / Name</Label>
            <Input id="name" placeholder="e.g. John Doe - Math Task 1" v-model="name" required />
          </div>

          <div class="flex flex-col gap-2">
            <Label for="description">Description</Label>
            <Textarea id="description" placeholder="Submission comments or notes..." class="min-h-16" v-model="description" />
          </div>

          <div class="flex flex-col gap-2">
            <Label for="comment">Comment</Label>
            <Input id="comment" placeholder="Evaluation comment..." v-model="comment" />
          </div>

          <div class="flex flex-col gap-2">
            <Label for="groupTaskId">Group Task</Label>
            <select
              id="groupTaskId"
              v-model="groupTaskId"
              class="h-9 rounded-md border border-neutral-200 bg-white px-3 py-1 text-sm shadow-xs outline-hidden focus-visible:ring-3 focus-visible:ring-ring/50 w-full"
              required
            >
              <option value="" disabled selected>Select a group task...</option>
              <option v-for="tsk in groupTasks" :key="tsk.id" :value="tsk.id">
                {{ tsk.name }} ({{ getGroupName(tsk.groupId) }})
              </option>
            </select>
          </div>

          <div class="flex flex-col gap-2">
            <Label for="userId">Author / User</Label>
            <select
              id="userId"
              v-model="userId"
              class="h-9 rounded-md border border-neutral-200 bg-white px-3 py-1 text-sm shadow-xs outline-hidden focus-visible:ring-3 focus-visible:ring-ring/50 w-full"
              required
            >
              <option value="" disabled selected>Select an author...</option>
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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import type { IGroupTask } from '@/interfaces/groupTasks';
import type { IUser } from '@/interfaces/users';
import type { IGroup } from '@/interfaces/groups';

const store = useStore();

const isModalOpen = ref(false);
const name = ref('');
const description = ref('');
const comment = ref('');
const groupTaskId = ref<number | ''>('');
const userId = ref<number | ''>('');

const groupTasks = computed<IGroupTask[]>(() => store.state.groupTasks.groupTasks);
const users = computed<IUser[]>(() => store.state.users.users);
const groups = computed<IGroup[]>(() => store.state.groups.groups);

const getGroupName = (groupId: number | string | undefined | null) => {
  if (!groupId) return '—';
  const g = groups.value.find(group => String(group.id) === String(groupId));
  return g ? g.name : '—';
};

onMounted(() => {
  store.dispatch('groupTasks/findGroupTasksAction', { size: 100 });
  store.dispatch('users/findUsersAction', { size: 100 });
  store.dispatch('groups/findGroupsAction', { size: 100 });
});

const handleCreateSubmission = async () => {
  if (groupTaskId.value === '') {
    toast.error('Please select a group task.');
    return;
  }
  if (userId.value === '') {
    toast.error('Please select an author.');
    return;
  }

  try {
    await store.dispatch('groupTaskSubmissions/createGroupTaskSubmissionAction', {
      name: name.value,
      description: description.value || undefined,
      comment: comment.value || undefined,
      groupTaskId: Number(groupTaskId.value),
      userId: Number(userId.value)
    });

    isModalOpen.value = false;
    name.value = '';
    description.value = '';
    comment.value = '';
    groupTaskId.value = '';
    userId.value = '';

    store.dispatch('groupTaskSubmissions/findGroupTaskSubmissionsAction');

    toast.success('Group task submission created successfully!');
  } catch (error: any) {
    const errorMsg = error?.response?.data?.message || 'Failed to create group task submission.';
    toast.error(errorMsg);
  }
}
</script>

<style scoped></style>
