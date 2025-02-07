<template>
    <div class="space-y-4 p-2">
    <h2 class="text-2xl mb-4">Listado de Transacciones</h2>
    <div class="relative flex flex-col w-full h-full text-gray-700 bg-white shadow-md rounded-lg bg-clip-border">
      <div class="overflow-x-auto">
        <table class="w-full text-left table-auto min-w-max">
          <thead>
            <tr>
              <th class="p-4 border-b border-slate-200 bg-slate-50">
                <p class="text-sm font-normal leading-none text-slate-500">Fecha</p>
              </th>
              <th class="p-4 border-b border-slate-200 bg-slate-50">
                <p class="text-sm font-normal leading-none text-slate-500">Tipo</p>
              </th>
              <th class="p-4 border-b border-slate-200 bg-slate-50">
                <p class="text-sm font-normal leading-none text-slate-500">Categoría</p>
              </th>
              <th class="p-4 border-b border-slate-200 bg-slate-50">
                <p class="text-sm font-normal leading-none text-slate-500">Monto</p>
              </th>
              <th class="p-4 border-b border-slate-200 bg-slate-50 hidden lg:table-cell">
                <p class="text-sm font-normal leading-none text-slate-500">Descripción</p>
              </th>
              <th class="p-4 border-b border-slate-200 bg-slate-50">
                <p class="text-sm font-normal leading-none text-slate-500">Cuenta</p>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="transaction in transactions" :key="transaction.id">
              <td class="p-4 border-b border-slate-200">{{ transaction.date }}</td>
              <td class="p-4 border-b border-slate-200">{{ transaction.type }}</td>
              <td class="p-4 border-b border-slate-200">{{ transaction.category }}</td>
              <td class="p-4 border-b border-slate-200">{{ transaction.amount }}</td>
              <td class="p-4 border-b border-slate-200 hidden lg:table-cell">{{ transaction.description }}</td>
              <td class="p-4 border-b border-slate-200">{{ transaction.account }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>

import { Transaction } from '@/modules/transactions/Transaction';
import { deleteTransactionFirebase } from '@/services/transaction/TransactionService';
import { useTransactions } from '@/services/transaction/UseTransaction';

const {transactions} = useTransactions(1);
const emit = defineEmits(['edit']);

const handleEdit = (transaction: Transaction) => {
    emit('edit', transaction);
};

const handleDelete = (uid?: string) => {
    if(uid && confirm('Desea eliminar la transaccion?')) {
        deleteTransactionFirebase(uid);
    }
};

const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-EC', { style: 'currency', currency: 'USD' }).format(amount);
};

const formatDate = (date: Date): string => {
  const dateObj = new Date(date);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const month = months[dateObj.getMonth()];
  const day = dateObj.getUTCDate();  
  return `${month}-${day}`
};


</script>
<style lang="css">
/* Ocultar flechas en Firefox */
input[type='number']::-moz-outer-spin-button,
input[type='number']::-moz-inner-spin-button {
    -moz-appearance: none;
    margin: 0;
}

/* Ocultar flechas en Chrome, Safari, Edge y Opera */
input[type='number']::-webkit-outer-spin-button,
input[type='number']::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

/* Opcional: Ocultar flechas en dispositivos móviles */
input[type='number']::-webkit-input-placeholder {
    -webkit-appearance: none;
    appearance: none;
    margin: 0;
}
</style>