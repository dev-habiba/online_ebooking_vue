import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from '@/core/router'

//** For Auto Login */
const token = new URLSearchParams(window.location.search).get("token");

if (token) {
    localStorage.setItem("token", token);
}

//** apexchart */
import VueApexCharts from 'vue3-apexcharts';

//** vue toastification Toast Open for full app */
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

/** Fontawesome Icon */
import '@fortawesome/fontawesome-free/css/all.min.css'

/** Bootstrap */
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

//** Core Global CSS */
import '@/assets/css/core.css'

const app = createApp(App);
const pinia = createPinia();

app.use(pinia)
app.use(router)
app.use(VueApexCharts)
app.use(Toast, {
    position: "top-right",
    timeout: 1500,
    closeOnClick: true,
})

app.mount('#app')