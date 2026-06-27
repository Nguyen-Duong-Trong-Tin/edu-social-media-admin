<template>
  <div class="flex p-8 flex-col flex-1 gap-6 max-w-[1200px] mx-auto w-full">

    <div class="flex justify-between items-end">
      <div class="flex flex-col gap-1">
        <h1 class="font-bold text-3xl leading-9 tracking-tight text-neutral-950">Assign Permissions</h1>
        <div class="text-neutral-500 text-sm leading-5 flex items-center gap-1 mt-1">
          <span>Admin</span>
          <ChevronRight class="size-3.5" />
          <span>Roles</span>
          <ChevronRight class="size-3.5" />
          <span class="text-neutral-950">Assign permissions</span>
        </div>
      </div>
    </div>

    <Card class="shadow-sm border-neutral-200 mt-2 bg-white flex flex-col">

      <Tabs v-model="activeRole" class="w-full flex flex-col">

        <div class="px-8 pt-6 border-b border-neutral-100 block w-full">
          <TabsList class="bg-transparent h-auto p-0 flex gap-6 border-none justify-start w-full">
            <TabsTrigger v-for="role in roles" :key="role.id" :value="role.id"
              class="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-[#1877F2] data-[state=active]:text-neutral-950 text-neutral-500 rounded-none pb-3 px-0 font-medium text-sm transition-colors">
              {{ role.name }}
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent :value="activeRole" class="p-8 m-0 outline-none flex flex-col w-full">

          <p class="text-sm text-neutral-500 mb-8 block w-full">
            Assign permissions to the <span class="font-semibold text-neutral-800">{{ activeRoleName }}</span> role by
            checking the boxes below.
          </p>

          <div class="flex flex-col gap-8 w-full">
            <div v-for="group in groupedPermissions" :key="group.name" class="flex flex-col gap-4">
              <h3 class="text-xs font-bold text-neutral-400 tracking-wider uppercase border-b border-neutral-100 pb-2">
                {{ group.name }}
              </h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label v-for="permission in group.items" :key="permission.id"
                  class="flex items-start gap-3 p-4 rounded-xl border border-neutral-200 cursor-pointer transition-all hover:border-[#1877F2]/30 hover:bg-[#1877F2]/5 group"
                  :class="{ 'border-[#1877F2]/50 bg-[#1877F2]/5': isSelected(permission.id) }">
                  <Checkbox :id="`perm-${permission.id}`" :checked="isSelected(permission.id)"
                    @update:checked="togglePermission(permission.id)"
                    class="mt-1 data-[state=checked]:bg-[#1877F2] data-[state=checked]:border-[#1877F2]" />
                  <div class="flex flex-col gap-1.5">
                    <span class="text-sm font-semibold text-neutral-900 group-hover:text-[#1877F2] transition-colors">
                      {{ permission.name }}
                    </span>
                    <span
                      class="bg-neutral-100 text-neutral-500 text-[10px] font-mono uppercase px-2 py-0.5 rounded inline-flex w-fit">
                      {{ permission.code }}
                    </span>
                  </div>
                </label>
              </div>
            </div>
          </div>

          <div class="flex justify-between items-center mt-10 pt-6 border-t border-neutral-100 w-full">
            <div class="flex items-center gap-4">
              <label class="flex items-center gap-2 text-sm font-semibold text-neutral-900 cursor-pointer">
                <Checkbox :checked="isAllSelected" @update:checked="toggleSelectAll"
                  class="data-[state=checked]:bg-neutral-900 data-[state=checked]:border-neutral-900" />
                Select All
              </label>

              <div class="bg-neutral-100 text-neutral-600 px-3 py-1.5 rounded-full text-xs font-medium">
                {{ selectedCount }} of {{ totalPermissionsCount }} permissions selected
              </div>
            </div>

            <Button class="bg-[#1877F2] text-white hover:bg-[#1877F2]/90 gap-2 font-medium" @click="savePermissions">
              <Save class="size-4" /> Save Changes
            </Button>
          </div>

        </TabsContent>
      </Tabs>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { toast } from 'vue-sonner';
import { ChevronRight, Save } from 'lucide-vue-next';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useStore } from 'vuex';

import type { IRole } from '@/interfaces/roles';
import type { IPermission } from '@/interfaces/permissions';

const store = useStore();

const activeRole = ref('');
const selectedPermissionIds = ref<number[]>([]);

const roles = computed(() => store.state.roles.roles);
const permissions = computed(() => store.state.permissions.permissions);

// Auto-activate the first role when the roles list is loaded
watch(roles, (newRoles) => {
  if (newRoles && newRoles.length > 0 && !activeRole.value) {
    activeRole.value = String(newRoles[0].id);
  }
}, { immediate: true });

// Sync selected checkboxes to active role's current permissions
watch([activeRole, roles], () => {
  const role = roles.value.find((r: IRole) => String(r.id) === String(activeRole.value));
  if (role && role.permissions) {
    selectedPermissionIds.value = role.permissions.map((p: IPermission) => p.id);
  } else {
    selectedPermissionIds.value = [];
  }
}, { immediate: true });

const activeRoleName = computed(() => {
  return roles.value.find((r: IRole) => String(r.id) === String(activeRole.value))?.name || '';
});

const groupedPermissions = computed(() => {
  const groups: Record<string, IPermission[]> = {};
  permissions.value.forEach((p: IPermission) => {
    const cat = p.category || 'Other';
    if (!groups[cat]) {
      groups[cat] = [];
    }
    groups[cat].push(p);
  });
  return Object.keys(groups)
    .sort((a, b) => {
      if (a === 'Other') return 1;
      if (b === 'Other') return -1;
      return a.localeCompare(b);
    })
    .map(category => ({
      name: category,
      items: groups[category]
    }));
});

const totalPermissionsCount = computed(() => permissions.value.length);
const selectedCount = computed(() => selectedPermissionIds.value.length);
const isAllSelected = computed(() => totalPermissionsCount.value > 0 && selectedCount.value === totalPermissionsCount.value);

const isSelected = (id: number) => selectedPermissionIds.value.includes(id);

const togglePermission = (id: number) => {
  if (isSelected(id)) {
    selectedPermissionIds.value = selectedPermissionIds.value.filter(permId => permId !== id);
  } else {
    selectedPermissionIds.value.push(id);
  }
};

const toggleSelectAll = (checked: boolean) => {
  if (checked) {
    selectedPermissionIds.value = permissions.value.map((p: IPermission) => p.id);
  } else {
    selectedPermissionIds.value = [];
  }
};

const savePermissions = async () => {
  try {
    const roleId = Number(activeRole.value);
    if (!roleId) return;

    await store.dispatch('roles/replaceRolePermissionsAction', {
      id: roleId,
      permissionIds: selectedPermissionIds.value
    });

    // Refresh roles list to sync permissions in local state
    await store.dispatch('roles/findRolesAction');
    toast.success(`${activeRoleName.value} permissions updated successfully!`);
  } catch (error) {
    toast.error('Failed to update permissions.');
  }
};

store.dispatch('roles/findRolesAction');
store.dispatch('permissions/findPermissionsAction', { size: 1000 });
</script>

<style scoped>
label {
  transition: background-color 0.2s ease, border-color 0.2s ease;
}
</style>
