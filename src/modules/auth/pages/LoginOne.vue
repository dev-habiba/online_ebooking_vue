<script setup>
import { ref } from 'vue';
import { useAuth } from '@modules/auth/composable/useAuth';
import logo from '@/assets/images/logo.png'

const { do_login, is_loading, api_error, form_error } = useAuth();
const TENANT_CONFIG = window.APP_CONFIG;

const username = ref("");
const password = ref("");
const remember = ref(false);

const show_password = ref(false);

/** Login Submit */
const login_from_submit = async () => {
    await do_login({
        userId: username.value,
        password: password.value,
        soft_cust_id: TENANT_CONFIG.soft_cust_id,
        partition_id: TENANT_CONFIG.partition_id,
        remember: remember.value
    });
};
</script>

<template>
    <div class="login-container">
        <div class="login-card">
            
            <!-- login header -->
            <div class="login-header">
                <div class="company-logo d-flex justify-content-center">
                    <div class="logo-icon">
                        <img :src="logo" alt="cargoaim-logo" class="logo-image">
                    </div>
                </div>
                <h2>CARGOAIM</h2>
                <p>Please sign in to your cargoaim account</p>
            </div>

            <!-- submit form -->
            <form @submit.prevent="login_from_submit" class="login-form" novalidate>

                <!-- userId -->
                <div class="form-group" :class="{ error: form_error }">
                    <div class="input-wrapper">
                        <input type="text" id="email" v-model="username" required autocomplete="username">
                        <label for="email">Username</label>
                        <span class="input-border"></span>
                    </div>
                </div>

                <!-- password -->
                <div class="form-group" :class="{ error: form_error }">

                    <div class="input-wrapper password-wrapper">
                        <!-- password input -->
                        <input :type="show_password ? 'text' : 'password'" id="password" v-model="password" required autocomplete="current-password">

                        <label for="password">Password</label>
                        <button type="button" class="password-toggle" id="passwordToggle"
                            aria-label="Toggle password visibility" @click="show_password = !show_password">

                            <i :class="show_password ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'"></i>
                        </button>
                        
                        <span class="input-border"></span>
                    </div>

                    <!-- error msg -->
                    <div class="error-message show" v-if="api_error">{{ api_error }}</div>
                </div>

                <!-- remember  & reset password -->
                <div class="form-options">
                    <div class="remember-wrapper">
                        <input type="checkbox" id="remember" v-model="remember">
                        <label for="remember" class="checkbox-label">
                            <span class="checkbox-custom"></span>
                            Keep me signed in
                        </label>
                    </div>
                    <a href="#" class="forgot-password">Reset password</a>
                </div>

                <!-- Sign In -->
                <button type="submit" class="login-btn" :disabled="is_loading">
                    <span class="btn-text" v-if="!is_loading">Sign In</span>
                    <span v-else>
                        <span class="spinner-border spinner-border-sm" role="status"></span>
                    </span>
                </button>
            </form>
        </div>
    </div>
</template>

<style lang="css">
    @import '@modules/auth/assets/css/login_one.css';
</style>

