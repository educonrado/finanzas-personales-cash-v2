<template>
    <header class="flex items-center justify-between px-6 py-4 bg-white border-b-4 border-indigo-600">
        <div class="flex items-center">
            <button @click="isOpen = true" class="text-gray-500 focus:outline-none lg:hidden">
                <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 6H20M4 12H20M4 18H11" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                        stroke-linejoin="round" />
                </svg>
            </button>

           <!-- <div class="relative mx-4 lg:mx-0">
                <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                    <svg class="w-5 h-5 text-gray-500" viewBox="0 0 24 24" fill="none">
                        <path
                            d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </span>

                <input
                    class="w-32 pl-10 pr-4 text-indigo-600 border-gray-200 rounded-md sm:w-64 focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                    type="text" placeholder="Search">
            </div>-->
        </div>

        <div class="flex items-center">
            <!--<button class="flex mx-4 text-gray-600 focus:outline-none">
                <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M15 17H20L18.5951 15.5951C18.2141 15.2141 18 14.6973 18 14.1585V11C18 8.38757 16.3304 6.16509 14 5.34142V5C14 3.89543 13.1046 3 12 3C10.8954 3 10 3.89543 10 5V5.34142C7.66962 6.16509 6 8.38757 6 11V14.1585C6 14.6973 5.78595 15.2141 5.40493 15.5951L4 17H9M15 17V18C15 19.6569 13.6569 21 12 21C10.3431 21 9 19.6569 9 18V17M15 17H9"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </button>-->

            <div class="relative">
                <button @click="dropdownOpen = !dropdownOpen"
                    class="relative z-10 block w-8 h-8 overflow-hidden rounded-full shadow focus:outline-none" :title="user.displayName || 'user'">
                    <img class="object-cover w-full h-full" 
                        :src="user.photoURL || defaultUserPhoto"
                        :alt="user.displayName || 'user'"
                        :title="user.displayName || 'user'"
                        @error="handleImageError">
                </button>
                <div v-show="dropdownOpen" class="fixed inset-0 z-10 w-full h-full" @click="dropdownOpen = false" />

                <transition enter-active-class="transition duration-150 ease-out transform"
                    enter-from-class="scale-95 opacity-0" enter-to-class="scale-100 opacity-100"
                    leave-active-class="transition duration-150 ease-in transform"
                    leave-from-class="scale-100 opacity-100" leave-to-class="scale-95 opacity-0">
                    <div v-show="dropdownOpen"
                        class="absolute right-0 z-20 w-48 py-2 mt-2 bg-white rounded-md shadow-xl">
                        <a href="#"
                            class="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white">Perfil</a>
                        
                        <a @click="handleLogout()"
                            class="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white">
                            Salir
                        </a>
                    </div>
                </transition>
            </div>
        </div>
    </header>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useSidebar } from './useSidebar';
import { useRouter } from 'vue-router';

const router = useRouter();
const dropdownOpen = ref(false);
const { isOpen } = useSidebar();

const user = ref({ displayName: '', photoURL: '' });
const defaultUserPhoto = 'data:image/png;base64,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';
const handleImageError = (event: Event) => {
    (event.target as HTMLImageElement).src = defaultUserPhoto;
};
onMounted(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
        user.value = JSON.parse(storedUser);
        console.log(user.value.displayName);
        console.log(user.value.photoURL);
        
    }
});

const handleLogout = () => {
    localStorage.removeItem('user');
    router.push({ name: 'login' });
};

</script>