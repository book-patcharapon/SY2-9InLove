<script setup>
import { RouterView } from 'vue-router'
import SideBar from './components/SideBar.vue';
</script>
 
<template>
    <div class="w-full h-full flex">
        <div class="w-1/6">
            <SideBar />
        </div>

        <div class="w-5/6">
            <RouterView />
        </div>
    </div>
</template>
 
<style scoped></style>