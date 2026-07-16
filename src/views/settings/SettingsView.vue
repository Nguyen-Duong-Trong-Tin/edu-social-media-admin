<template>
  <div class="flex p-8 flex-col flex-1 gap-6">
    <!-- Breadcrumbs / Title -->
    <div class="flex justify-between items-end">
      <div class="flex flex-col gap-1">
        <h1 class="font-semibold text-2xl leading-8 tracking-tight">Settings</h1>
        <div class="text-neutral-500 text-sm leading-5 flex items-center gap-1">
          <span>Admin</span>
          <ChevronRight class="size-3.5" />
          <span class="text-neutral-950">Settings</span>
        </div>
      </div>
    </div>

    <!-- Tabs Container -->
    <Tabs v-model="activeTab" class="w-full flex flex-col">
      <div class="border-b border-neutral-100 block w-full">
        <TabsList class="bg-transparent h-auto p-0 flex gap-6 border-none justify-start w-full">
          <TabsTrigger
            value="sidebar-links"
            class="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-[#1877F2] data-[state=active]:text-neutral-950 text-neutral-500 rounded-none pb-3 px-0 font-medium text-sm transition-colors"
          >
            Sidebar Links
          </TabsTrigger>
          <!-- Future tabs placeholders to match settings expansions -->
          <TabsTrigger
            value="general"
            disabled
            class="text-neutral-400 rounded-none pb-3 px-0 font-medium text-sm cursor-not-allowed opacity-50"
          >
            General Settings (Future)
          </TabsTrigger>
          <TabsTrigger
            value="localization"
            disabled
            class="text-neutral-400 rounded-none pb-3 px-0 font-medium text-sm cursor-not-allowed opacity-50"
          >
            Localization (Future)
          </TabsTrigger>
        </TabsList>
      </div>

      <!-- Tab Content - Sidebar Links CRUD -->
      <TabsContent value="sidebar-links" class="mt-6 m-0 outline-none flex flex-col w-full gap-4">
        <Card class="shadow-sm p-6 gap-4">
          <CardHeader class="p-0 flex-row justify-between items-center gap-2">
            <div class="relative w-72">
              <Search class="size-4 top-1/2 -translate-y-1/2 text-neutral-500 absolute left-3" />
              <Input
                class="border-transparent bg-neutral-100 pl-9 h-9"
                placeholder="Search links by name..."
                v-model="searchKeyword"
              />
            </div>
            <Button
              class="bg-[#1877F2] text-white hover:bg-[#1877F2]/90 gap-2 h-9"
              size="sm"
              @click="openAddModal"
            >
              <Plus class="size-4" /> Add New Link
            </Button>
          </CardHeader>

          <CardContent class="p-0 gap-0 overflow-x-auto mt-4">
            <Table>
              <TableHeader>
                <TableRow class="border-neutral-200 border-solid">
                  <TableHead class="text-neutral-500 w-12">#</TableHead>
                  <TableHead class="text-neutral-500">Name</TableHead>
                  <TableHead class="text-neutral-500">Path</TableHead>
                  <TableHead class="text-neutral-500">Icon</TableHead>
                  <TableHead class="text-neutral-500">Match Type</TableHead>
                  <TableHead class="text-neutral-500 w-28">Sort Order</TableHead>
                  <TableHead class="text-right text-neutral-500">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow
                  v-for="(link, index) in settingSidebarLinks"
                  :key="link.id"
                  :class="{ 'bg-neutral-100/50': index % 2 !== 0 }"
                  class="border-neutral-200 border-solid"
                >
                  <TableCell class="text-neutral-500">
                    {{ (currentPage * pageSize) + index + 1 }}
                  </TableCell>
                  <TableCell class="font-medium text-neutral-900">{{ link.name }}</TableCell>
                  <TableCell class="text-neutral-600 font-mono text-xs">{{ link.path }}</TableCell>
                  <TableCell>
                    <div class="flex items-center gap-2">
                      <div class="size-7 rounded-md bg-neutral-100 flex justify-center items-center text-neutral-600">
                        <component :is="iconMap[link.icon]" class="size-4 text-[#1877F2]" />
                      </div>
                      <span class="text-xs text-neutral-500">{{ link.icon }}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      :class="link.isExact ? 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100' : 'bg-amber-50 text-amber-700 hover:bg-amber-100'"
                      variant="secondary"
                    >
                      {{ link.isExact ? 'Exact Match' : 'Prefix Match' }}
                    </Badge>
                  </TableCell>
                  <TableCell class="font-mono text-xs text-neutral-600">
                    {{ link.sortOrder }}
                  </TableCell>
                  <TableCell class="text-right">
                    <div class="flex justify-end items-center gap-2">
                      <Button variant="ghost" size="icon" class="size-8 text-[#1877F2]" @click="openUpdateModal(link)">
                        <Pencil class="size-4" />
                      </Button>

                      <ConfirmDialog @confirm="handleDeleteLink(link.id)">
                        <Button variant="ghost" size="icon" class="size-8 text-[#e7000b]">
                          <Trash2 class="size-4" />
                        </Button>
                      </ConfirmDialog>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow v-if="settingSidebarLinks.length === 0">
                  <TableCell colspan="7" class="text-center py-8 text-neutral-400">
                    No sidebar links found.
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
                class="h-8 w-8 p-0"
                :disabled="currentPage === 0"
                @click="changePage(currentPage - 1)"
              >
                &lt;
              </Button>
              <Button
                v-for="page in visiblePages"
                :key="page"
                size="sm"
                class="h-8 w-8 p-0"
                :variant="currentPage === page - 1 ? 'default' : 'outline'"
                @click="changePage(page - 1)"
              >
                {{ page }}
              </Button>
              <Button
                variant="outline"
                size="sm"
                class="h-8 w-8 p-0"
                :disabled="currentPage === totalPages - 1 || totalPages === 0"
                @click="changePage(currentPage + 1)"
              >
                &gt;
              </Button>
            </div>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>

    <!-- CREATE MODAL -->
    <div v-if="isAddModalOpen" class="bg-[#1a2236]/60 fixed inset-0 z-50 flex justify-center items-center backdrop-blur-sm">
      <form @submit.prevent="handleCreateLink">
        <Card class="shadow-2xl p-6 gap-6 w-[520px] relative">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            class="absolute top-4 right-4 size-8 text-neutral-500 hover:text-neutral-950"
            @click="isAddModalOpen = false"
          >
            <X class="size-4" />
          </Button>

          <CardHeader class="p-0 flex flex-col gap-1 pr-8">
            <h2 class="font-semibold text-lg leading-7">Add New Sidebar Link</h2>
            <p class="text-neutral-500 text-sm leading-5">Create a new dynamic link in the left-hand navigation sidebar.</p>
          </CardHeader>

          <CardContent class="flex p-0 flex-col gap-4 mt-6">
            <div class="flex flex-col gap-2">
              <Label for="name">Link Name</Label>
              <Input id="name" placeholder="e.g. Courses" v-model="addForm.name" required />
            </div>

            <div class="flex flex-col gap-2">
              <Label for="path">Path</Label>
              <Input id="path" placeholder="e.g. /courses" v-model="addForm.path" required />
            </div>

            <div class="flex flex-col gap-2">
              <Label for="icon">Sidebar Icon</Label>
              <div class="flex items-center gap-3">
                <select
                  id="icon"
                  v-model="addForm.icon"
                  class="flex-1 h-9 rounded-md border border-neutral-200 bg-white px-3 py-1.5 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
                  required
                >
                  <option v-for="ico in availableIcons" :key="ico" :value="ico">
                    {{ ico }}
                  </option>
                </select>
                <div class="size-9 rounded-lg border border-neutral-200 flex justify-center items-center bg-neutral-50 shrink-0">
                  <component :is="iconMap[addForm.icon]" class="size-5 text-[#1877F2]" v-if="addForm.icon" />
                </div>
              </div>
            </div>

            <div class="flex flex-col gap-2">
              <Label for="sortOrder">Sort Order</Label>
              <Input id="sortOrder" type="number" placeholder="e.g. 5" v-model.number="addForm.sortOrder" required />
            </div>

            <div class="flex items-center gap-2 mt-2">
              <input
                type="checkbox"
                id="isExact"
                v-model="addForm.isExact"
                class="size-4 rounded border-neutral-300 text-[#1877F2] focus:ring-[#1877F2] cursor-pointer"
              />
              <Label for="isExact" class="cursor-pointer select-none">Exact Path Match</Label>
            </div>
          </CardContent>

          <CardFooter class="p-0 justify-end gap-2 mt-6">
            <Button type="button" variant="secondary" @click="isAddModalOpen = false">Cancel</Button>
            <Button type="submit" class="bg-[#1877F2] text-white hover:bg-[#1877F2]/90 gap-2">
              <Check class="size-4" /> Save
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>

    <!-- UPDATE MODAL -->
    <div v-if="isUpdateModalOpen" class="bg-[#1a2236]/60 fixed inset-0 z-50 flex justify-center items-center backdrop-blur-sm">
      <form @submit.prevent="handleUpdateLink">
        <Card class="shadow-2xl p-6 gap-6 w-[520px] relative">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            class="absolute top-4 right-4 size-8 text-neutral-500 hover:text-neutral-950"
            @click="isUpdateModalOpen = false"
          >
            <X class="size-4" />
          </Button>

          <CardHeader class="p-0 flex flex-col gap-1 pr-8">
            <h2 class="font-semibold text-lg leading-7">Update Sidebar Link</h2>
            <p class="text-neutral-500 text-sm leading-5">Edit the details of the sidebar navigation link.</p>
          </CardHeader>

          <CardContent class="flex p-0 flex-col gap-4 mt-6">
            <div class="flex flex-col gap-2">
              <Label for="edit-name">Link Name</Label>
              <Input id="edit-name" placeholder="e.g. Courses" v-model="updateForm.name" required />
            </div>

            <div class="flex flex-col gap-2">
              <Label for="edit-path">Path</Label>
              <Input id="edit-path" placeholder="e.g. /courses" v-model="updateForm.path" required />
            </div>

            <div class="flex flex-col gap-2">
              <Label for="edit-icon">Sidebar Icon</Label>
              <div class="flex items-center gap-3">
                <select
                  id="edit-icon"
                  v-model="updateForm.icon"
                  class="flex-1 h-9 rounded-md border border-neutral-200 bg-white px-3 py-1.5 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
                  required
                >
                  <option v-for="ico in availableIcons" :key="ico" :value="ico">
                    {{ ico }}
                  </option>
                </select>
                <div class="size-9 rounded-lg border border-neutral-200 flex justify-center items-center bg-neutral-50 shrink-0">
                  <component :is="iconMap[updateForm.icon]" class="size-5 text-[#1877F2]" v-if="updateForm.icon" />
                </div>
              </div>
            </div>

            <div class="flex flex-col gap-2">
              <Label for="edit-sortOrder">Sort Order</Label>
              <Input id="edit-sortOrder" type="number" placeholder="e.g. 5" v-model.number="updateForm.sortOrder" required />
            </div>

            <div class="flex items-center gap-2 mt-2">
              <input
                type="checkbox"
                id="edit-isExact"
                v-model="updateForm.isExact"
                class="size-4 rounded border-neutral-300 text-[#1877F2] focus:ring-[#1877F2] cursor-pointer"
              />
              <Label for="edit-isExact" class="cursor-pointer select-none">Exact Path Match</Label>
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
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { useStore } from 'vuex';
import { toast } from 'vue-sonner';
import {
  BookOpen, ClipboardCheck, ClipboardList, FileText, Globe, GraduationCap,
  Layers, LayoutDashboard, MessageCircle, Network, Settings,
  Shield, UserCog, UserPen, Users, Send, Check, ChevronRight,
  Plus, X, Pencil, Trash2, Search
} from "lucide-vue-next";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ConfirmDialog from "@/components/ConfirmDialog.vue";
import type { ISettingSidebarLink } from '@/interfaces/settingSidebarLink';

const store = useStore();

const activeTab = ref('sidebar-links');
const searchKeyword = ref('');
const currentPage = ref(0);
const pageSize = ref(10);

const isAddModalOpen = ref(false);
const isUpdateModalOpen = ref(false);

const addForm = ref({
  name: '',
  path: '',
  icon: 'BookOpen',
  isExact: false,
  sortOrder: 1
});

const updateForm = ref({
  id: 0,
  name: '',
  path: '',
  icon: 'BookOpen',
  isExact: false,
  sortOrder: 1
});

// Map of standard sidebar icons from TheSideBar.vue
const iconMap: Record<string, any> = {
  LayoutDashboard,
  Shield,
  Users,
  UserCog,
  BookOpen,
  FileText,
  Settings,
  Network,
  Globe,
  Layers,
  UserPen,
  ClipboardList,
  ClipboardCheck,
  MessageCircle,
  Send
};

const availableIcons = Object.keys(iconMap);

// Computed sidebar links from the store
const settingSidebarLinks = computed<ISettingSidebarLink[]>(() => store.state.settingSidebarLinks.settingSidebarLinks);
const totalPages = computed(() => store.state.settingSidebarLinks.totalPages || 1);

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

const fetchLinksData = () => {
  const params: any = {
    page: currentPage.value,
    size: pageSize.value,
    sort: 'sortOrder,asc'
  };

  if (searchKeyword.value.trim()) {
    params.name = searchKeyword.value.trim();
  }

  store.dispatch('settingSidebarLinks/findSettingSidebarLinksAction', params);
};

const changePage = (newPage: number) => {
  if (newPage >= 0 && newPage < totalPages.value) {
    currentPage.value = newPage;
    fetchLinksData();
  }
};

watch(searchKeyword, () => {
  currentPage.value = 0;
  fetchLinksData();
});

onMounted(() => {
  fetchLinksData();
});

const openAddModal = () => {
  addForm.value = {
    name: '',
    path: '',
    icon: 'BookOpen',
    isExact: false,
    sortOrder: (settingSidebarLinks.value.length ? Math.max(...settingSidebarLinks.value.map(l => l.sortOrder)) + 1 : 1)
  };
  isAddModalOpen.value = true;
};

const handleCreateLink = async () => {
  try {
    await store.dispatch('settingSidebarLinks/createSettingSidebarLinkAction', addForm.value);
    isAddModalOpen.value = false;
    fetchLinksData();
    // Dispatch side-effect to update the sidebar itself
    store.dispatch('settingSidebarLinks/findAllSettingSidebarLinksAction', { sort: "sortOrder,asc", size: 100 });
    toast.success("Sidebar link created successfully.");
  } catch (error: any) {
    const errorMsg = error?.response?.data?.message || 'Failed to create link.';
    toast.error(errorMsg);
  }
};

const openUpdateModal = (link: ISettingSidebarLink) => {
  updateForm.value = {
    id: link.id,
    name: link.name,
    path: link.path,
    icon: link.icon,
    isExact: link.isExact,
    sortOrder: link.sortOrder
  };
  isUpdateModalOpen.value = true;
};

const handleUpdateLink = async () => {
  try {
    await store.dispatch('settingSidebarLinks/updateSettingSidebarLinkAction', updateForm.value);
    isUpdateModalOpen.value = false;
    fetchLinksData();
    // Dispatch side-effect to update the sidebar itself
    store.dispatch('settingSidebarLinks/findAllSettingSidebarLinksAction', { sort: "sortOrder,asc", size: 100 });
    toast.success("Sidebar link updated successfully.");
  } catch (error: any) {
    const errorMsg = error?.response?.data?.message || 'Failed to update link.';
    toast.error(errorMsg);
  }
};

const handleDeleteLink = async (id: number) => {
  try {
    await store.dispatch('settingSidebarLinks/deleteSettingSidebarLinkAction', id);
    fetchLinksData();
    // Dispatch side-effect to update the sidebar itself
    store.dispatch('settingSidebarLinks/findAllSettingSidebarLinksAction', { sort: "sortOrder,asc", size: 100 });
    toast.success("Sidebar link deleted successfully.");
  } catch (error: any) {
    const errorMsg = error?.response?.data?.message || 'Failed to delete link.';
    toast.error(errorMsg);
  }
};
</script>

<style scoped></style>
