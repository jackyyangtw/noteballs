<script setup>
import NavBar from "./components/Layout/NavBar.vue";
import { useNotesStore } from "./stores/notes";
const { getNotes } = useNotesStore();
getNotes();
</script>

<template>
    <!-- <RouterLink to="/" class="button">Notes</RouterLink>
    <RouterLink to="/stats" class="button">Stats</RouterLink> -->
    <NavBar />
    <div class="container is-max-desktop px-2 py-4">
        <RouterView />
    </div>
</template>

<style>
@import "bulma/css/bulma.min.css";
</style>
