<template>
  <div class="space-y-4 p-2">
    <h2 class="text-2xl mb-4">Listado de Transacciones</h2>
    <div class="relative flex flex-col w-full h-full text-gray-700 bg-white shadow-md rounded-lg bg-clip-border">
      <div class="overflow-x-auto rounded-xl">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col">
              </th>
              <th scope="col"
                class="py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                Fecha</th>
              <th scope="col"
                class="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                Tipo</th>
              <th scope="col" class="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Categor&iacute;a</th>

              <th scope="col"
                class="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                Descripci&oacute;n</th>
              <th scope="col" class="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Cuenta</th>
              <th scope="col"
                class="px-2 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider w-32">
                Monto
              </th>
              <th scope="col" class="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="transaction in transactions" :key="transaction.uid">

              <td class="px-2 py-2 whitespace-nowrap text-sm text-gray-500 text-center">
                <div class="flex justify-center">
                  <span v-if="transaction.type === 'expense'" class="h-2.5 w-2.5 bg-yellow-500 rounded-full"></span>
                  <span v-if="transaction.type === 'income'" class="h-2.5 w-2.5 bg-green-500 rounded-full"></span>
                </div>
              </td>
              <td class="py-2 whitespace-nowrap text-sm text-gray-500 hidden sm:table-cell">
                {{ formatDate(transaction.date) }}
              </td>
              <td class="px-2 py-2 whitespace-nowrap text-sm text-gray-500 hidden sm:table-cell">
                <div v-if="transaction.type === 'expense'" class="flex items-center" title="Gasto">
                  <span>gasto</span>
                </div>
                <div v-if="transaction.type === 'income'" class="flex items-center" title="Ingreso">
                  <span>ingreso</span>
                </div>
              </td>
              <td class="px-2 py-2 whitespace-nowrap text-sm text-gray-500">{{ transaction.category }}</td>

              <td class="px-2 py-2 whitespace-nowrap text-sm text-gray-500 hidden sm:table-cell">{{
                transaction.description }}</td>
              <td class="px-2 py-2 whitespace-nowrap text-sm text-gray-500">{{ transaction.account }}</td>
              <td class="px-2 py-2 whitespace-nowrap text-sm w-32 text-right"
                :class="transaction.type === 'expense' ? 'text-yellow-500' : 'text-green-500'">
                {{ formatCurrency(transaction.amount, transaction.type) }}
              </td>
              <td class="px-2 py-2 whitespace-nowrap text-sm text-gray-500">
                <button @click="handleEdit(transaction)" class="text-blue-600 hover:text-blue-800 mx-1" title="Editar">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4">
                    <path fill-rule="evenodd"
                      d="M11.013 2.513a1.75 1.75 0 0 1 2.475 2.474L6.226 12.25a2.751 2.751 0 0 1-.892.596l-2.047.848a.75.75 0 0 1-.98-.98l.848-2.047a2.75 2.75 0 0 1 .596-.892l7.262-7.261Z"
                      clip-rule="evenodd" />
                  </svg>
                </button>
                <button @click="handleDelete(transaction.uid)"
                  class="text-red-600 hover:text-red-800 mx-1 transition duration-300 ease-in-out"
                  aria-label="Eliminar transacción" title="Eliminar">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4">
                    <path d="M2 3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3Z" />
                    <path fill-rule="evenodd"
                      d="M13 6H3v6a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V6ZM5.72 7.47a.75.75 0 0 1 1.06 0L8 8.69l1.22-1.22a.75.75 0 1 1 1.06 1.06L9.06 9.75l1.22 1.22a.75.75 0 1 1-1.06 1.06L8 10.81l-1.22 1.22a.75.75 0 0 1-1.06-1.06l1.22-1.22-1.22-1.22a.75.75 0 0 1 0-1.06Z"
                      clip-rule="evenodd" />
                  </svg>
                </button>
              </td>
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
import { Timestamp } from 'firebase/firestore';

const { transactions } = useTransactions(1);
const emit = defineEmits(['edit']);

const handleEdit = (transaction: Transaction) => {
  emit('edit', transaction);
};

const handleDelete = (uid?: string) => {
  if (uid && confirm('Desea eliminar la transaccion?')) {
    deleteTransactionFirebase(uid);
  }
};

const formatCurrency = (amount: number, type: string) => {
  const value = type === 'expense' ? -amount : amount;
  const formattedNumber = new Intl.NumberFormat('es-EC', {
    style: 'currency',
    currency: 'USD'
  }).format(Math.abs(value));

  return value < 0 ? `-${formattedNumber}` : `+${formattedNumber}`;
};

const formatDate = (date: Timestamp): string => {
  const dateObj = date.toDate();
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