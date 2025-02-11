<template>

  <div class="flex">
    <!-- Backdrop -->
    <div class="fixed inset-0 z-20 transition-opacity bg-black opacity-50 lg:hidden"
      :class="isOpen ? 'block' : 'hidden'" @click="isOpen = false" />
    <div :class="isOpen ? 'translate-x-0 ease-out' : '-translate-x-full ease-in'"
      class="fixed inset-y-0 left-0 z-30 w-64 overflow-y-auto transition duration-300 transform bg-gray-900 lg:translate-x-0 lg:static lg:inset-0">
      <div class="flex items-center justify-center mt-8">
        <div class="flex items-center">
          <img class="w-12 h-12"
            src="data:image/png;base64,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"
            alt="refund-2">
          <span class="mx-2 text-2xl font-semibold text-white">Mis finanzas</span>
        </div>
      </div>

      <nav class="mt-10">
        <router-link class="flex items-center px-6 py-2 mt-4 duration-200 border-l-4"
          :class="[$route.name === 'Dashboard' ? activeClass : inactiveClass]" to="/home">
          <svg class="w-5 h-5" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 10C2 5.58172 5.58172 2 10 2V10H18C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10Z"
              fill="currentColor" />
            <path d="M12 2.25195C14.8113 2.97552 17.0245 5.18877 17.748 8.00004H12V2.25195Z" fill="currentColor" />
          </svg>

          <span class="mx-4">Dashboard</span>
        </router-link>

        <!--<router-link class="flex items-center px-6 py-2 mt-4 duration-200 border-l-4"
          :class="[$route.name === 'UIElements' ? activeClass : inactiveClass]" to="/ui-elements">
          <svg class="w-5 h-5" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M5 3C3.89543 3 3 3.89543 3 5V7C3 8.10457 3.89543 9 5 9H7C8.10457 9 9 8.10457 9 7V5C9 3.89543 8.10457 3 7 3H5Z"
              fill="currentColor" />
            <path
              d="M5 11C3.89543 11 3 11.8954 3 13V15C3 16.1046 3.89543 17 5 17H7C8.10457 17 9 16.1046 9 15V13C9 11.8954 8.10457 11 7 11H5Z"
              fill="currentColor" />
            <path
              d="M11 5C11 3.89543 11.8954 3 13 3H15C16.1046 3 17 3.89543 17 5V7C17 8.10457 16.1046 9 15 9H13C11.8954 9 11 8.10457 11 7V5Z"
              fill="currentColor" />
            <path
              d="M11 13C11 11.8954 11.8954 11 13 11H15C16.1046 11 17 11.8954 17 13V15C17 16.1046 16.1046 17 15 17H13C11.8954 17 11 16.1046 11 15V13Z"
              fill="currentColor" />
          </svg>

          <span class="mx-4">UI Elements</span>
        </router-link>

        <router-link class="flex items-center px-6 py-2 mt-4 duration-200 border-l-4"
          :class="[$route.name === 'Tables' ? activeClass : inactiveClass]" to="/tables">
          <svg class="w-5 h-5" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M7 3C6.44772 3 6 3.44772 6 4C6 4.55228 6.44772 5 7 5H13C13.5523 5 14 4.55228 14 4C14 3.44772 13.5523 3 13 3H7Z"
              fill="currentColor" />
            <path
              d="M4 7C4 6.44772 4.44772 6 5 6H15C15.5523 6 16 6.44772 16 7C16 7.55228 15.5523 8 15 8H5C4.44772 8 4 7.55228 4 7Z"
              fill="currentColor" />
            <path
              d="M2 11C2 9.89543 2.89543 9 4 9H16C17.1046 9 18 9.89543 18 11V15C18 16.1046 17.1046 17 16 17H4C2.89543 17 2 16.1046 2 15V11Z"
              fill="currentColor" />
          </svg>

          <span class="mx-4">Tables</span>
        </router-link>

        <router-link class="flex items-center px-6 py-2 mt-4 duration-200 border-l-4"
          :class="[$route.name === 'Forms' ? activeClass : inactiveClass]" to="/forms">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
            <path fill-rule="evenodd"
              d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
              clip-rule="evenodd" />
          </svg>

          <span class="mx-4">Forms</span>
        </router-link>

        <router-link class="flex items-center px-6 py-2 mt-4 duration-200 border-l-4"
          :class="[$route.name === 'Cards' ? activeClass : inactiveClass]" to="/cards">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
            <path fill-rule="evenodd"
              d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
              clip-rule="evenodd" />
          </svg>

          <span class="mx-4">Cards</span>
        </router-link>

        <router-link class="flex items-center px-6 py-2 mt-4 duration-200 border-l-4"
          :class="[$route.name === 'Modal' ? activeClass : inactiveClass]" to="/modal">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M3 12v3c0 1.657 3.134 3 7 3s7-1.343 7-3v-3c0 1.657-3.134 3-7 3s-7-1.343-7-3z" />
            <path d="M3 7v3c0 1.657 3.134 3 7 3s7-1.343 7-3V7c0 1.657-3.134 3-7 3S3 8.657 3 7z" />
            <path d="M17 5c0 1.657-3.134 3-7 3S3 6.657 3 5s3.134-3 7-3 7 1.343 7 3z" />
          </svg>

          <span class="mx-4">Modal</span>
        </router-link>

        <router-link class="flex items-center px-6 py-2 mt-4 duration-200 border-l-4"
          :class="[$route.name === 'Blank' ? activeClass : inactiveClass]" to="/blank">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
          </svg>

          <span class="mx-4">Blank</span>
        </router-link>-->
        <router-link class="flex items-center px-6 py-2 mt-4 duration-200 border-l-4"
          :class="[$route.name === 'Transacciones' ? activeClass : inactiveClass]" to="/dashboard/transaccion">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
          </svg>
          <span class="mx-4">Transacciones</span></router-link>
      </nav>
    </div>
  </div>


</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { useSidebar } from './useSidebar';

const { isOpen } = useSidebar();

const activeClass = ref(
  'bg-gray-600 bg-opacity-25 text-gray-100 border-gray-100',
)
const inactiveClass = ref(
  'border-gray-900 text-gray-500 hover:bg-gray-600 hover:bg-opacity-25 hover:text-gray-100',
)
</script>