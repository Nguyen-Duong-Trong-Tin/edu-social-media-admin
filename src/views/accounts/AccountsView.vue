<template>
  <div class="flex p-8 flex-col flex-1 gap-6">
    <AccountAdd />

    <AccountsTable :accounts="accounts" />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import type { IAccount } from '@/interfaces/accounts';
import AccountsTable from './AccountsTable.vue';
import AccountAdd from './AccountAdd.vue';

const store = useStore();

const accounts = computed<IAccount[]>(() => store.state.accounts.accounts);

onMounted(() => {
  store.dispatch("accounts/findAccountsAction");
});
</script>

<style scoped></style>
