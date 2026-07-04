<script setup>
import { ref, computed } from 'vue';
import { useAuth } from '@modules/auth/composable/useAuth';

/** Auth composable */
const { do_login, is_loading } = useAuth();
/** Tenant Config */
const TENANT_CONFIG = window.APP_CONFIG;


/** Screen Info */
function getScreenDetails() {
    return {
        screenWidth: window.screen.width,
        screenHeight: window.screen.height,
        viewportWidth: window.innerWidth,
        viewportHeight: window.innerHeight,
        zoom: window.devicePixelRatio || (window.outerWidth / window.innerWidth)
    };
}

/** Form state */
const username = ref("");
const password = ref("");
const remember = ref(false);

/** Password show/hide toggle */
const show_password = ref(false);

/** Validation error state (only after submit) */
const errors = ref({
    username: false,
    password: false
});

/** Real-time validity (for UI hint only) */
const isUsernameValid = computed(() => username.value.trim().length > 0);
const isPasswordValid = computed(() => password.value.trim().length > 0);

/** Submit handler */
const login_from_submit = async () => {

    // reset errors
    errors.value.username = !username.value.trim();
    errors.value.password = !password.value.trim();

    // stop if invalid
    if (errors.value.username || errors.value.password) return;

    // call
    await do_login({
        userId: username.value,
        password: password.value,
        soft_cust_id: TENANT_CONFIG.soft_cust_id,
        partition_id: TENANT_CONFIG.partition_id,
        remember: remember.value,
        
        ...getScreenDetails()
    });
};
</script>

<template>
    <div class="form-body">
        <div class="iofrm-layout">

            <!-- LEFT SIDE INFO -->
            <div class="img-holder">
                <div class="bg"></div>
                <div class="info-holder">
                    <h3>Powering Smarter Cargo & Freight Management.</h3>
                    <p>
                        From shipment tracking to freight forwarding — Cargoaim ERP gives you full control.
                    </p>
                    <img src="@modules/auth/assets/images/LoginTwo.jpeg" />
                </div>
            </div>

            <!-- LOGIN FORM -->
            <div class="form-holder">
                <div class="form-content">
                    <div class="form-items">

                        <!-- LOGO -->
                        <div class="website-logo-inside">
                            <img class="logo-size" src="@/assets/images/logo.png" />
                        </div>

                        <form @submit.prevent="login_from_submit">

                            <!-- USERNAME -->
                            <input
                                class="form-control"
                                :class="{
                                    'is-invalid': errors.username,
                                    'is-valid': !errors.username && isUsernameValid
                                }"
                                type="text"
                                v-model="username"
                                placeholder="Username"
                                autocomplete="username"
                            />

                            <!-- PASSWORD WRAPPER -->
                            <div class="input-wrapper">

                                <input
                                    class="form-control password-input"
                                    :class="{
                                    'is-invalid': errors.password,
                                    'is-valid': !errors.password && isPasswordValid
                                    }"
                                    :type="show_password ? 'text' : 'password'"
                                    v-model="password"
                                    placeholder="Password"
                                />

                                <button
                                    type="button"
                                    class="eye-btn"
                                    @click="show_password = !show_password"
                                >
                                    <i :class="show_password ? 'fa fa-eye-slash' : 'fa fa-eye'"></i>
                                </button>

                            </div>

                            <!-- REMEMBER ME -->
                            <!-- <label class="remember-box">
                                <input type="checkbox" v-model="remember" />
                                <span>Remember me</span>
                            </label> -->

                            <!-- SUBMIT -->
                            <div class="form-button">

                                <button
                                    type="submit"
                                    class="ibtn"
                                    :disabled="is_loading"
                                >
                                    <span v-if="!is_loading">Sign In</span>

                                    <span v-else>
                                        <span class="spinner-border spinner-border-sm"></span>
                                    </span>
                                </button>

                                <a href="#">Forget password?</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<style lang="css">
@import '@modules/auth/assets/css/login_two.css';

/** INPUT VALIDATION */
.is-invalid {
    /* border: 2px solid #e74c3c !important; */
    background: #fff5f5 !important;
    box-shadow: 0 0 0 3px rgba(231, 76, 60, 0.15) !important;
}

.is-valid {
    /* border: 2px solid #2ecc71 !important; */
    background: #f3fff7 !important;
    box-shadow: 0 0 0 3px rgba(46, 204, 113, 0.15) !important;
}

/** PASSWORD WRAPPER */
.input-wrapper {
    position: relative;
}

.eye-btn {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    cursor: pointer;
    color: var(--primary-color);
}
</style>