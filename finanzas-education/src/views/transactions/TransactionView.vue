<template>
    <div class="transaction p-4 bg-gray-100 rounded-lg shadow-md">
        <h1 class="text-3xl font-bold mb-4">Transacciones</h1>
        <!--<button type="button" @click="showForm('add')" class="bg-blue-500 text-white px-4 py-2 rounded mb-4 hover:bg-blue-600 transition">
        Agregar transacción
    </button>
    v-if="isFormVisible"
    -->

        <div class="mt-4">
            <!--<h3 class="text-xl font-semibold mb-2">{{ isEditing ? 'Editar transacción' : 'Agregar transacción' }}</h3>-->
            <TransactionFormView :isEditing="isEditing"
                :initialTransaction="isEditing ? currentTransaction : newTransaction" @submit="handleSubmit">
            </TransactionFormView>
        </div>
        <br />
        <TransactionListView @edit="startEditing" />
    </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import TransactionFormView from './TransactionFormView.vue';
import TransactionListView from './TransactionListView.vue';
import { Transaction } from '@/modules/transactions/Transaction';
import { getTransactionsByMonth } from '@/services/transaction/TransactionService';

const isEditing = ref<boolean>(false);
const isFormVisible = ref<boolean>(false);

const newTransaction = ref<Transaction>({
    date: new Date(),
    type: 'income',
    category: '',
    amount: 0,
    description: '',
    account: ''
});

const currentTransaction = ref<Transaction>({
    date: new Date(),
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
        date: new Date(),
        type: 'income',
        category: '',
        amount: 0,
        description: '',
        account: ''
    };
    fetchTransactions();
};

const startEditing = (transaction: Transaction) => {
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