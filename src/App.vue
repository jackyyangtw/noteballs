<script setup>
import NavBar from "./components/Layout/NavBar.vue";
import { useAuthStore } from "./stores/auth";
const authStore = useAuthStore();
const { initAuth } = authStore;
initAuth();
</script>

<template>
    <NavBar />
    <div class="container is-max-desktop px-2 py-4">
        <RouterView />
    </div>
</template>

<style>
@import "bulma/css/bulma.min.css";
</style>
