<template>
    <div class="min-h-full">
        <header class="bg-white shadow-sm">
            <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <h1 class="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
            </div>
            <p>{{ user.displayName }} </p>
            <img :src="user.photoURL" alt="profile" class="w-16 h-16 rounded-full">
            <button type="button" @click="handleLogout()">Logout</button>
        </header>
        <main>
            <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <router-link to="/dashboard/transaccion">Registrar transacción</router-link>
                <router-view></router-view>
            </div>
        </main>
    </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const user = ref({ displayName: '', photoURL: '' });

onMounted(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
        user.value = JSON.parse(storedUser);
    }
});

const handleLogout = () => {
    localStorage.removeItem('user');
    router.push({ name: 'login' });
};
</script>
<style lang="css"></style>