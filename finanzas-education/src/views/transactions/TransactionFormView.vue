<template>

    <form @submit.prevent="handleSubmit">
        <label for="date">Fecha</label>
        <input type="date" name="date" id="date" v-model="transaction.date" required />

        <label for="type">Tipo</label>
        <select name="type" id="type" v-model="transaction.type">
            <option value="income">Ingreso</option>
            <option value="expense">Gasto</option>
        </select>

        <label for="amount">Valor</label>
        <input type="number" name="amount" id="amount" v-model="transaction.amount" required />

        <label for="description">Descripci&oacute;n</label>
        <input type="text" name="description" id="description" v-model="transaction.description" />

        <label for="account">Cuenta</label>
        <select name="account" id="account" v-model="transaction.account">
            <option value="efectivo">Efectivo</option>
            <option value="cuenta1">Cuenta 1</option>
        </select>
        <button type="submit">{{ isEditing ? 'Actualizar' : 'Registrar' }}</button>
    </form>

</template>
<script lang="ts" setup>
import { Transaction, addTransaction, updateTransaction } from '@/modules/transactions/Transaction';
import { ref } from 'vue';

interface Props {
    isEditing: boolean;
    initialTransaction: Transaction;
}

const props = defineProps<Props>();
const emit = defineEmits(['submit']);

const transaction = ref<Transaction>({ ...props.initialTransaction });

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