<template>
  <form @submit.prevent="handleSubmit" class="space-y-6 bg-gradient-to-r from-white to-gray-50 p-8 rounded-xl shadow-lg w-[95%] mx-auto border border-gray-100">

    <div class="border-b border-gray-200 pb-4">
      <h2 class="text-2xl font-bold text-gray-800 mb-2">Transacci&oacute;n</h2>
      <p class="text-gray-600">Agregar o editar informaci&oacute;n de transacciones personales.</p>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-6 gap-6">
      <div class="flex flex-col">
        <label for="date" class="text-sm font-semibold text-gray-700 mb-2">*Fecha</label>
        <input name="type" type="date" v-model="fecha" id="date" required 
          class="p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-full transition-all duration-200">
      </div>

      <div class="flex flex-col">
        <label for="type" class="text-sm font-semibold text-gray-700 mb-2">Tipo</label>
        <div class="flex flex-col space-y-2">
          <label for="income" class="flex items-center space-x-2 cursor-pointer">
        <input name="type" type="radio" v-model="transaction.type" value="income" id="income" 
          class="w-4 h-4 text-indigo-600 focus:ring-indigo-500">
        <span class="text-gray-700">Ingreso</span>
          </label>
          <label for="expense" class="flex items-center space-x-2 cursor-pointer">
        <input name="type" type="radio" v-model="transaction.type" value="expense" id="expense" 
          class="w-4 h-4 text-indigo-600 focus:ring-indigo-500">
        <span class="text-gray-700">Gasto</span>
          </label>
        </div>
      </div>

      <div class="flex flex-col">
        <label for="category" class="text-sm font-semibold text-gray-700 mb-2">*Categoria</label>
        <select id="category" name="category" v-model="transaction.category" required
          class="p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-full transition-all duration-200">
          <option value="vivienvia">Vivienda</option>
          <option value="educacion">Educaci&oacute;n</option>
        </select>
      </div>

      <div class="flex flex-col">
        <label for="description" class="text-sm font-semibold text-gray-700 mb-2">Descripci&oacute;n</label>
        <input type="text" name="description" id="description" v-model="transaction.description"
          placeholder="Descripci&oacute;n" 
          class="p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-full transition-all duration-200">
      </div>

      <div class="flex flex-col">
        <label for="amount" class="text-sm font-semibold text-gray-700 mb-2">*Valor</label>
        <input type="number" step="0.01" min="0.01" max="999999999" name="amount" id="amount" v-model="transaction.amount"
          placeholder="0.00" required 
          class="p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-full transition-all duration-200">
      </div>

      <div class="flex flex-col">
        <label for="account" class="text-sm font-semibold text-gray-700 mb-2">*Cuenta</label>
        <select id="account" name="account" v-model="transaction.account" 
          class="p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-full transition-all duration-200">
          <option value="vivienda" selected>Efectivo</option>
          <option value="educacion">Cuenta 1</option>
        </select>
      </div>
    </div>

    <div class="mt-8 flex items-center justify-end gap-x-4">
      <button type="reset" @click="handleReset()"
        class="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors duration-200">
        Cancelar
      </button>
      <button type="submit"
        class="px-6 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-lg shadow-sm hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 transition-all duration-200">
        {{ isEditing ? 'Actualizar' : 'Guardar' }}
      </button>
    </div>
  </form>
</template>
<script lang="ts" setup>
import { Transaction } from '@/modules/transactions/Transaction';
import { addTransactionFirebase, updateTransactionFirebase } from '@/services/transaction/TransactionService';
import { Timestamp } from 'firebase/firestore';
import { ref, watch } from 'vue';

interface Props {
  isEditing: boolean;
  initialTransaction: Transaction;
}

const props = defineProps<Props>();
const emit = defineEmits(['submit']);
const transaction = ref<Transaction>({ ...props.initialTransaction });
const fecha = ref(transaction.value.date.toDate().toISOString().substring(0, 10));

watch(() => props.initialTransaction, (newVal) => {
  transaction.value = { ...newVal };
  fecha.value = newVal.date.toDate().toISOString().substring(0, 10);
}, { deep: true });

const handleSubmit = () => {
  transaction.value.date = Timestamp.fromDate(combinarFechaHora(fecha.value));
  if (props.isEditing && transaction.value.uid) {
    updateTransactionFirebase(transaction.value.uid, transaction.value);
  } else {
    addTransactionFirebase(transaction.value)
      .catch(error => console.log(error));

  }
  emit('submit');
  transaction.value = { ...props.initialTransaction };
};

const handleReset = () => {
  transaction.value = { ...props.initialTransaction };
  emit('submit');
};

function combinarFechaHora(value: string): Date {
  const selectedDate = value;
  const now = new Date();

  const year = parseInt(selectedDate.substring(0, 4));
  const month = parseInt(selectedDate.substring(5, 7)) - 1;
  const day = parseInt(selectedDate.substring(8, 10));

  const hours = now.getUTCHours();
  const minutes = now.getUTCMinutes();
  const seconds = now.getUTCSeconds();
  const milliseconds = now.getUTCMilliseconds();

  return new Date(Date.UTC(year, month, day, hours, minutes, seconds, milliseconds));

}
</script>
<style lang="css"></style>