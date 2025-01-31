<template>
    <div class="transactionsList">
        <h2>Listado de transacciones</h2>
        <ul>
            <li v-for="transaction in transactions" :key="transaction.id">
                {{ transaction.id }} -
                {{ transaction.date }} -
                {{ transaction.type }} -
                {{ transaction.category }} -
                {{ transaction.amount }} -
                {{ transaction.description }} -
                {{ transaction.account }}
                <button @click="handleEdit(transaction)">Editar</button>
                <button @click="handleDelete(transaction.id)">Eliminar</button>
            </li>
        </ul>
    </div>
</template>
<script lang="ts" setup>
import { ref, watchEffect } from 'vue';
import { Transaction, getTransactions, deleteTransaction } from '@/modules/transactions/Transaction';

const transactions = ref<Transaction[]>([]);

watchEffect(() => {
    transactions.value = getTransactions();
});

const emit = defineEmits(['edit']);

const handleEdit = (transaction: Transaction) => {
    emit('edit', transaction);
};

const handleDelete = (id: number) => {
    deleteTransaction(id);
    alert('Transacción eliminada con éxito');
};

</script>
<style lang="css"></style>