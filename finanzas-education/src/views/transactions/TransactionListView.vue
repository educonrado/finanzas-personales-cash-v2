<template>
   <div class="transactionsList p-4 bg-gray-100 rounded-lg shadow-md">
    <h2 class="text-2xl font-bold mb-4">Listado de Transacciones</h2>
    <table class="min-w-full bg-white">
        <thead>
            <tr>
                <th class="py-2 px-4 bg-gray-200">ID</th>
                <th class="py-2 px-4 bg-gray-200">Fecha</th>
                <th class="py-2 px-4 bg-gray-200">Tipo</th>
                <th class="py-2 px-4 bg-gray-200">Categoría</th>
                <th class="py-2 px-4 bg-gray-200">Monto</th>
                <th class="py-2 px-4 bg-gray-200">Descripción</th>
                <th class="py-2 px-4 bg-gray-200">Cuenta</th>
                <th class="py-2 px-4 bg-gray-200">Acciones</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="transaction in transactions" :key="transaction.id" class="border-b">
                <td class="py-2 px-4">{{ transaction.id }}</td>
                <td class="py-2 px-4">{{ transaction.date }}</td>
                <td class="py-2 px-4">{{ transaction.type }}</td>
                <td class="py-2 px-4">{{ transaction.category }}</td>
                <td class="py-2 px-4 font-semibold">{{ transaction.amount }}</td>
                <td class="py-2 px-4">{{ transaction.description }}</td>
                <td class="py-2 px-4">{{ transaction.account }}</td>
                <td class="py-2 px-4">
                    <button @click="handleEdit(transaction)" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">Editar</button>
                    <button @click="handleDelete(transaction.id)" class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition ml-2">Eliminar</button>
                </td>
            </tr>
        </tbody>
    </table>
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