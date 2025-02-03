<template>
  <form @submit.prevent="handleSubmit" class="space-y-4 bg-white p-6 rounded-lg shadow-md">
    <div class="space-y-12">
      <div class="border-b border-gray-900/10 pb-12">
        <h2 class="text-base/7 font-semibold text-gray-900">Transacci&oacute;n</h2>
        <p class="mt-1 text-sm/6 text-gray-600">Agregar o editar informaci&oacute;n de transacciones personales.</p>

        <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div class="sm:col-span-1">
            <label for="date" class="block text-sm/6 font-medium text-gray-900">Fecha</label>
            <div class="mt-2">
              <input type="date" name="date" id="date" v-model="transaction.date" required
                class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
            </div>
          </div>
          <div class="sm:col-span-1">
            <label for="type" class="block text-sm/6 font-medium text-gray-900">Tipo</label>
            <div class="mt-2 grid grid-cols-1">
              <select id="type" name="type" v-model="transaction.type"
                class="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
                <option value="income">Ingreso</option>
                <option value="expense">Gasto</option>
              </select>
              <svg
                class="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" data-slot="icon">
                <path fill-rule="evenodd"
                  d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z"
                  clip-rule="evenodd" />
              </svg>
            </div>
          </div>
          <div class="sm:col-span-1">
            <label for="category" class="block text-sm/6 font-medium text-gray-900">Categoria</label>
            <div class="mt-2 grid grid-cols-1">
              <select id="category" name="category" v-model="transaction.category"
                class="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
                <option value="vivienvia">Vivienda</option>
                <option value="educacion">Educaci&oacute;n</option>
              </select>
              <svg
                class="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" data-slot="icon">
                <path fill-rule="evenodd"
                  d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z"
                  clip-rule="evenodd" />
              </svg>
            </div>
          </div>
          <div class="sm:col-span-1">
            <label for="amount" class="block text-sm/6 font-medium text-gray-900">Valor</label>
            <div class="mt-2">
              <div
                class="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">
                <div class="shrink-0 text-base text-gray-500 select-none sm:text-sm/6">$</div>
                <input type="number" step="0.01" min="0" max="999999999" name="amount" id="amount"
                  v-model="transaction.amount"
                  class="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                  placeholder="0.00">
                <div class="grid shrink-0 grid-cols-1 focus-within:relative">
                  <label id="currency" name="currency" aria-label="Currency"
                    class="col-start-1 row-start-1 w-full appearance-none rounded-md py-1.5 pr-7 pl-3 text-base text-gray-500 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
                    USD
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div class="sm:col-span-1">
            <label for="description" class="block text-sm/6 font-medium text-gray-900">Descripción</label>
            <div class="mt-2">
              <input type="text" name="description" id="description" v-model="transaction.description"
                class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
            </div>
          </div>
          <div class="sm:col-span-1">
            <label for="account" class="block text-sm/6 font-medium text-gray-900">Cuenta</label>
            <div class="mt-2 grid grid-cols-1">
              <select id="account" name="account" v-model="transaction.account"
                class="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
                <option value="efectivo">Efectivo</option>
                <option value="cuenta1">Cuenta 1</option>
              </select>
              <svg
                class="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" data-slot="icon">
                <path fill-rule="evenodd"
                  d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z"
                  clip-rule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-6 flex items-center justify-end gap-x-6">
      <button type="button" class="text-sm/6 font-semibold text-gray-900">Cancelar</button>
      <button type="submit"
        class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
        {{ isEditing ? 'Actualizar' : 'Guardar' }}
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