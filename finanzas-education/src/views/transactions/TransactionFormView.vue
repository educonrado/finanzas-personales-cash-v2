<template>

<form @submit.prevent="handleSubmit" class="space-y-4 bg-white p-6 rounded-lg shadow-md">
    <div>
        <label for="date" class="block text-sm font-medium text-gray-700">Fecha</label>
        <input type="date" name="date" id="date" v-model="transaction.date" required class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
    </div>

    <div>
        <label for="type" class="block text-sm font-medium text-gray-700">Tipo</label>
        <select name="type" id="type" v-model="transaction.type" class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
            <option value="income">Ingreso</option>
            <option value="expense">Gasto</option>
        </select>
    </div>

    <div>
        <label for="amount" class="block text-sm font-medium text-gray-700">Valor</label>
        <input type="number" name="amount" id="amount" v-model="transaction.amount" required class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
    </div>

    <div>
        <label for="description" class="block text-sm font-medium text-gray-700">Descripción</label>
        <input type="text" name="description" id="description" v-model="transaction.description" class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
    </div>

    <div>
        <label for="account" class="block text-sm font-medium text-gray-700">Cuenta</label>
        <select name="account" id="account" v-model="transaction.account" class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
            <option value="efectivo">Efectivo</option>
            <option value="cuenta1">Cuenta 1</option>
        </select>
    </div>

    <div>
        <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">
            {{ isEditing ? 'Actualizar' : 'Registrar' }}
        </button>
    </div>
</form>


</template>
<script lang="ts" setup>
import { Transaction, addTransaction, updateTransaction } from '@/modules/transactions/Transaction';
import { ref, watch } from 'vue';

interface Props {
    isEditing: boolean;
    initialTransaction: Transaction;
}

const props = defineProps<Props>();
const emit = defineEmits(['submit']);

const transaction = ref<Transaction>({ ...props.initialTransaction });

watch(() => props.initialTransaction, (newVal) => {
    transaction.value = { ...newVal };
}, { deep: true });

const handleSubmit = () => {
    if (props.isEditing) {
        updateTransaction(transaction.value);
    } else {
        addTransaction({
            ...transaction.value,
            id: Date.now()
        });
    }
    emit('submit');
};
</script>
<style lang="css"></style>