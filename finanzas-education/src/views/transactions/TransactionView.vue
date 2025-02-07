<template>
    <TransactionFormView :isEditing="isEditing" :initialTransaction="isEditing ? currentTransaction : newTransaction"
        @submit="handleSubmit">
    </TransactionFormView>
    <TransactionListView @edit="handleEditTransaction" />
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import TransactionFormView from './TransactionFormView.vue';
import TransactionListView from './TransactionListView.vue';
import { Transaction } from '@/modules/transactions/Transaction';
import { getTransactionsByMonth } from '@/services/transaction/TransactionService';
import { Timestamp } from 'firebase/firestore';

const isEditing = ref<boolean>(false);
const isFormVisible = ref<boolean>(false);

const newTransaction = ref<Transaction>({
    date: Timestamp.now(),
    type: 'income',
    category: '',
    amount: 0,
    description: '',
    account: ''
});

const currentTransaction = ref<Transaction>({
    date: Timestamp.now(),
    type: 'income',
    category: '',
    amount: 0,
    description: '',
    account: ''
});

const showForm = (mode: 'add' | 'edit') => {
    isFormVisible.value = true;
    isEditing.value = (mode === 'edit');
};

const handleSubmit = async () => {
    isFormVisible.value = false;
    isEditing.value = false;
    currentTransaction.value = {
        date: Timestamp.now(),
        type: 'income',
        category: '',
        amount: 0,
        description: '',
        account: ''
    };
    fetchTransactions();
};

const handleEditTransaction = (transaction: Transaction) => {
    showForm('edit');
    currentTransaction.value = { ...transaction };
};

const fetchTransactions = async () => {
    const transacctionList = ref<Transaction[]>([]);
    const month = new Date().getMonth();
    transacctionList.value = await getTransactionsByMonth(month);
}
</script>
<style lang="css"></style>