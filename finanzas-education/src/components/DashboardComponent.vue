

<template>
    <div class="flex h-screen bg-gray-200 font-roboto">
        <SidebarComponent></SidebarComponent>
        <div class="flex-1 flex flex-col overflow-hidden">
            <HeaderComponent></HeaderComponent>

            <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
                <div class="container mx-auto px-6 py-8">
                    <slot/>
                </div>
            </main>
        </div>
    </div>
</template>
<script setup lang="ts">
import HeaderComponent from '@/components/HeaderComponent.vue';
import SidebarComponent from '@/components/SidebarComponent.vue';
</script>