<template>
    <div class="space-y-4 p-2">
        <h2 class="text-2xl mb-4">Listado de Transacciones</h2>
    </div>

    <div class="relative flex flex-col w-full h-full text-gray-700 bg-white shadow-md rounded-lg bg-clip-border">
        <table class="w-full text-left table-auto min-w-max">
            <thead>
                <tr>
                    <th class="p-4 border-b border-slate-200 bg-slate-50">
                        <p class="text-sm font-normal leading-none text-slate-500">
                            Fecha
                        </p>
                    </th>
                    <th class="p-4 border-b border-slate-200 bg-slate-50">
                        <p class="text-sm font-normal leading-none text-slate-500">
                            Tipo
                        </p>
                    </th>
                    <th class="p-4 border-b border-slate-200 bg-slate-50">
                        <p class="text-sm font-normal leading-none text-slate-500">
                            Categoría
                        </p>
                    </th>
                    <th class="p-4 border-b border-slate-200 bg-slate-50">
                        <p class="text-sm font-normal leading-none text-slate-500">
                            Monto
                        </p>
                    </th>
                    <th class="p-4 border-b border-slate-200 bg-slate-50 hidden lg:block">
                        <p class="text-sm font-normal leading-none text-slate-500">
                            Descripción
                        </p>
                    </th>
                    <th class="p-4 border-b border-slate-200 bg-slate-50">
                        <p class="text-sm font-normal leading-none text-slate-500">
                            Cuenta
                        </p>
                    </th>
                    <th class="p-4 border-b border-slate-200 bg-slate-50">
                        <p class="text-sm font-normal leading-none text-slate-500">
                            
                        </p>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="transaction in transactions" :key="transaction.uid"
                    class="hover:bg-slate-50 border-b border-slate-200">
                    <td class="p-4 py-5">
                        <p class="text-sm text-slate-500"> {{formatDate(transaction.date) }}</p>
                    </td>
                    <td class="p-4 py-2">
                        <p class="text-sm text-slate-500"> 
                            <span v-if="transaction.type === 'expense'" class="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-yellow-600/20 ring-inset">gasto</span>
                            <span v-if="transaction.type === 'income'"  class="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-green-600/20 ring-inset">ingreso</span>
                        </p>
                    </td>
                    <td class="p-4 py-2">
                        <p class="text-sm text-slate-500"> {{ transaction.category }}</p>
                    </td>
                    <td class="p-4 py-2">
                        <p class="text-sm text-slate-500"> {{ formatCurrency(transaction.amount)}} </p>
                    </td>
                    <td class="p-4 py-2 hidden lg:inline">
                        <p class="text-sm text-slate-500"> {{ transaction.description }}</p>
                    </td>
                    <td class="p-4 py-2">
                        <p class="text-sm text-slate-500"> {{ transaction.account }}</p>
                    </td>
                    <td class="p-4 py-2">
                        <button @click="handleEdit(transaction)" class="bg-white text-indigo-600 cursor-pointer"
                            title="Editar">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                            </svg>

                        </button>
                        <button @click="handleDelete(transaction.uid)" class="bg-white text-red-600 cursor-pointer"
                            title="Eliminar">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="size-6 fill-regal-blue">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                            </svg>
                        </button>
                    </td>
                </tr>

            </tbody>
        </table>

        <div class="flex justify-between items-center px-4 py-3">
            <div class="text-sm text-slate-500">
                Showing <b>1-5</b> of 45
            </div>
            <div class="flex space-x-1">
                <button
                    class="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-slate-500 bg-white border border-slate-200 rounded hover:bg-slate-50 hover:border-slate-400 transition duration-200 ease">
                    Prev
                </button>
                <button
                    class="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-white bg-slate-800 border border-slate-800 rounded hover:bg-slate-600 hover:border-slate-600 transition duration-200 ease">
                    1
                </button>
                <button
                    class="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-slate-500 bg-white border border-slate-200 rounded hover:bg-slate-50 hover:border-slate-400 transition duration-200 ease">
                    2
                </button>
                <button
                    class="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-slate-500 bg-white border border-slate-200 rounded hover:bg-slate-50 hover:border-slate-400 transition duration-200 ease">
                    3
                </button>
                <button
                    class="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-slate-500 bg-white border border-slate-200 rounded hover:bg-slate-50 hover:border-slate-400 transition duration-200 ease">
                    Next
                </button>
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