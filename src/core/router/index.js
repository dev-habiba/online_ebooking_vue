import { createRouter, createWebHistory } from 'vue-router'
import { authGuard } from "@/core/guards/authGuard";

/** Module routes */
import authRoutes from '@/modules/auth/routes/index.js'
import dashRoutes from '@/modules/dashboard/routes/index.js';
import ebookingRoutes from '@/modules/booking/routes/index.js';
import uiRoutes from '@modules/ui/routes/index.js'

/** progress bar */
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({
  showSpinner: false,
})

/** Custom loader */
import { useLoader } from '@/shared/composables/useLoader'
const { showModernLoader, hideModernLoader } = useLoader()

const routes = [
    ...authRoutes,
    ...dashRoutes,
    ...ebookingRoutes,
    ...uiRoutes,
    
    //** Not Found or Access Denied */
    {
        path: "/:pathMatch(.*)*",
        name: "NotFound",
        component: () => import("@/shared/views/errors/AccessDenied.vue"),
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

let loaderStartTime = 0
const MIN_LOADER_TIME = 200

router.beforeEach((to) => {
    NProgress.start()

    // show loader
    if (!to.meta?.hideLoader) {
        loaderStartTime = Date.now()
        showModernLoader('Please Wait...')
    }

    return authGuard(to) // guard used for all routes
});

router.afterEach((to) => {
    // Progress Bar
    NProgress.done()

    // Hide Loader
    if (!to.meta?.hideLoader) {
        const elapsed = Date.now() - loaderStartTime
        const remaining = MIN_LOADER_TIME - elapsed

        if (remaining > 0) {
            setTimeout(() => hideModernLoader(), remaining)
        } else {
            hideModernLoader()
        }
    }

    // Dynamic Title
    const title = to.meta?.title
    document.title = title ? `Cargoaim | ${title}` : 'Cargoaim'
})

export default router