<template>
    <div class="auth">
        <div class="tabs is-centered">
            <ul>
                <li
                    :class="{
                        'is-active': !register,
                    }"
                >
                    <a @click.prevent="register = false">Login</a>
                </li>
                <li
                    :class="{
                        'is-active': register,
                    }"
                >
                    <a @click.prevent="register = true">Register</a>
                </li>
            </ul>
        </div>
        <div class="card auth-form">
            <div class="card-content">
                <div class="title has-text-centered">{{ title }}</div>
                <form @submit="onSubmit">
                    <div class="field">
                        <label class="label">Email</label>
                        <div class="control">
                            <input
                                v-model="credentials.email"
                                class="input"
                                type="email"
                                placeholder="e.g. alexsmith@gmail.com"
                            />
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Password</label>
                        <div class="control">
                            <input
                                v-model="credentials.password"
                                class="input"
                                type="password"
                                placeholder="Enter a password"
                            />
                        </div>
                    </div>
                    <div class="field is-grouped is-grouped-right">
                        <p class="control">
                            <button class="button is-primary">
                                {{ title }}
                            </button>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, reactive } from "vue";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();
const { registerUser, loginUser } = authStore;

// register / login
const register = ref(false);

// form title
const title = computed(() => (register.value ? "Register" : "Login"));

// sunmit form
const onSubmit = (e) => {
    e.preventDefault();
    if (!credentials.email || !credentials.password) {
        alert("Please enter your email and password");
    } else {
        if (register.value) {
            registerUser(credentials);
        } else {
            loginUser(credentials);
        }
    }
};

// credentials
const credentials = reactive({
    email: "",
    password: "",
});
</script>


<style>
.auth-form {
    max-width: 400px;
    margin: 0 auto;
}
</style>
