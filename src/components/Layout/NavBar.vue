<template>
    <nav
        class="navbar is-success"
        role="navigation"
        aria-label="main navigation"
    >
        <div class="container is-max-desktop">
            <div class="navbar-brand">
                <div class="navbar-item is-size-4 is-family-monospace">
                    Noteballs
                </div>

                <a
                    @click.prevent="showMobileNav = !showMobileNav"
                    ref="navbarBurgerRef"
                    role="button"
                    class="navbar-burger"
                    aria-label="menu"
                    aria-expanded="false"
                    data-target="navbarBasicExample"
                    :class="{ 'is-active': showMobileNav }"
                >
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>

            <div
                id="navbarBasicExample"
                class="navbar-menu"
                :class="{ 'is-active': showMobileNav }"
                ref="navbarMenuRef"
            >
                <div class="navbar-start">
                    <button
                        class="button is-small is-info mt-3 ml-3"
                        @click="logoutUser"
                        v-if="user && user.uid"
                    >
                        logout {{ user.email }}
                    </button>
                </div>
                <div class="navbar-end">
                    <RouterLink
                        class="navbar-item"
                        to="/"
                        active-class="is-active"
                        @click="showMobileNav = false"
                    >
                        Notes
                    </RouterLink>

                    <RouterLink
                        class="navbar-item"
                        to="/stats"
                        active-class="is-active"
                        @click="showMobileNav = false"
                    >
                        Stats
                    </RouterLink>
                </div>
            </div>
        </div>
    </nav>
</template>

<script setup>
import { ref } from "vue";
import { onClickOutside } from "@vueuse/core";
import { useAuthStore } from "../../stores/auth";
import { storeToRefs } from "pinia";
const showMobileNav = ref(false);
const navbarBurgerRef = ref(null);

// close mobile nav when clicking outside
const navbarMenuRef = ref(null);
onClickOutside(
    navbarMenuRef,
    () => {
        showMobileNav.value = false;
    },
    {
        ignore: [navbarBurgerRef],
    }
);

// logout
const authStore = useAuthStore();
const { user } = storeToRefs(authStore);
const { logoutUser: logout } = authStore;
const logoutUser = () => {
    logout();
    showMobileNav.value = false;
};
</script>


<style>
@media screen and (max-width: 1023px) {
    .navbar-menu {
        /* background-color: #fff; */
        position: absolute;
        left: 0;
        width: 100%;
    }
}
</style>
