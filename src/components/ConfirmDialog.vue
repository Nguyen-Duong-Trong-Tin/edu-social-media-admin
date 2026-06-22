<template>
  <div @click.stop="isOpen = true" class="inline-block cursor-pointer">
    <slot />
  </div>

  <AlertDialog v-model:open="isOpen">
    <AlertDialogContent class="pointer-events-auto z-[99999]">
      <AlertDialogHeader>
        <AlertDialogTitle>{{ title }}</AlertDialogTitle>
        <AlertDialogDescription>{{ description }}</AlertDialogDescription>
      </AlertDialogHeader>

      <AlertDialogFooter>
        <Button variant="outline" @click.stop="isOpen = false">
          Cancel
        </Button>

        <Button class="bg-red-600 hover:bg-red-700 text-white" @click.stop="handleConfirm">
          {{ confirmText }}
        </Button>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

defineProps({
  title: { type: String, default: 'Are you absolutely sure?' },
  description: { type: String, default: 'This action cannot be undone. This will permanently delete this item.' },
  confirmText: { type: String, default: 'Delete' }
});

const emit = defineEmits(['confirm']);

const isOpen = ref(false);

const handleConfirm = () => {
  isOpen.value = false;
  emit('confirm');
};
</script>
