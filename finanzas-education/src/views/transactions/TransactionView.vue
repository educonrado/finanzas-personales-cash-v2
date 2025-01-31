<template>
    <div class="transaction">
        <h1>Transacciones</h1>
        <TransactionFormView :isEditing="false" :initialTransaction="newTransaction" @submit="handleNewTransaction">
        </TransactionFormView>
        <TransactionListView @edit="startEditing"></TransactionListView>
    </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import TransactionFormView from './TransactionFormView.vue';
import TransactionListView from './TransactionListView.vue';
import { Transaction } from '@/modules/transactions/Transaction';

const newTransaction = ref<Transaction>({
    id: 0,
    date: new Date(),
    type: 'income',
    category: '',
    amount: 0,
    description: '',
    account: ''
});

const isEditing = ref<false>();
const currentTransaction = ref<Transaction | null>(null);

const handleNewTransaction = () => {
    newTransaction.value = {
        id: 0,
        date: new Date(),
        type: 'income',
        category: '',
        amount: 0,
        description: '',
        account: ''
    };
};

const startEditing = (transaction: Transaction) => {
    isEditing.value = true;
    currentTransaction.value = { ...transaction};
};

const stopEditing = () => {
    isEditing.value = false;
    currentTransaction.value = null;
};
/*const date = ref<string>('');
const type = ref<'income'|'expense'>('income');
const category = ref<''>('');
const amount = ref<number>(0);
const description = ref<string>('');
const account = ref<string>('');

const handleSubmit = () => {
    console.info("Manejador");
    addTransaction({
        id: Date.now(),
        date: new Date(date.value),
        type: type.value,
        category: category.value,
        amount: amount.value,
        description: description.value,
        account: account.value
    });
    alert('Transacción registrada con éxito');
}*/
</script>
<style lang="css"></style>