<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/modules/auth/store/authStore'
import { useAuth } from '@/modules/auth/composable/useAuth'
import { menus } from "@/core/config/menuConfig";

const route = useRoute()

const authStore = useAuthStore()
const { do_logout } = useAuth()

const user = authStore.getUser

/** Topbar Menus */
const topbarMenus = menus.topbar;

/** Check active menu (including children & nested) */
const isMenuActive = (menu) => {
    if (route.path.startsWith(menu.path)) return true
    if (menu.children?.length) {
        return menu.children.some(child =>
            route.path.startsWith(child.path) ||
            child.children?.some(nested => route.path.startsWith(nested.path))
        )
    }
    return false
}

const isChildActive = (child) => {
    if (route.path.startsWith(child.path)) return true
    if (child.children?.length) {
        return child.children.some(nested => route.path.startsWith(nested.path))
    }
    return false
}

/** Open Lang Dropdown */
const lang_dropdown_open = ref(false)
let lang_dropdown_timer = null

const open_langDropdown = () => {
    clearTimeout(lang_dropdown_timer)
    lang_dropdown_open.value = true
}

/** Close Lang Dropdown */
const close_langDropdown = () => {
    lang_dropdown_timer = setTimeout(() =>{
        lang_dropdown_open.value = false
    }, 150)
}

/** Open User Dropdown */
const user_dropdown_open = ref(false)
let user_dropdown_timer = null

const open_userDropdown = () =>{
    clearTimeout(user_dropdown_timer)
    user_dropdown_open.value = true
}

/** Close User Dropdown */
const close_userDropdown = () => {
    user_dropdown_timer = setTimeout(() => {
        user_dropdown_open.value = false
    }, 150)
}

</script>

<template>
    <header class="app-topbar">
        <div class="topbar-inner">

            <!-- Left: Brand + Menu -->
            <div class="d-flex align-items-center">

                <!-- Brand -->
                <div class="app_brand_name">
                    <router-link to="/dashboard">Cargoaim</router-link>
                </div>

                <!-- Topbar Menu -->
                <nav class="topbar_menu">
                    <ul>
                        <li v-for="menu in topbarMenus" :key="menu.id"
                            :class="{ active: isMenuActive(menu) }">
                            <router-link :to="menu.path">
                                <i :class="menu.icon"></i>
                                {{ menu.title }}
                                <i v-if="menu.children?.length" class="fa-solid fa-angle-double-down"></i>
                            </router-link>

                            <!-- Submenu -->
                            <ul v-if="menu.children?.length" class="submenu">
                                <li
                                    v-for="child in menu.children"
                                    :key="child.id"
                                    :class="{ active: isChildActive(child) }"
                                >
                                    <router-link :to="child.path">
                                        <i :class="child.icon"></i>
                                        {{ child.title }}
                                        <i v-if="child.children?.length" class="fa-solid fa-angle-double-right"></i>
                                    </router-link>

                                    <!-- Nested Menu -->
                                    <ul v-if="child.children?.length" class="nested-menu">
                                        <li
                                            v-for="nested in child.children"
                                            :key="nested.id"
                                            :class="{ active: route.path.startsWith(nested.path) }"
                                        >
                                            <router-link :to="nested.path">
                                                <i :class="nested.icon"></i>
                                                {{ nested.title }}
                                            </router-link>
                                        </li>
                                    </ul>

                                </li>
                            </ul>

                        </li>
                    </ul>
                </nav>

            </div>

            <!-- Right: Flag + User -->
            <div class="d-flex align-items-center gap-2">

                <!-- Language Flag -->
                <div class="topbar-item">
                    <div class="topbar-dropdown" @mouseenter="open_langDropdown"
                        @mouseleave="close_langDropdown">

                        <!-- Selected Flag -->
                        <button class="topbar-link" type="button">
                            <img src="@/assets/images/flags/en.svg" alt="flag"
                                class="flag-img">
                        </button>

                        <!-- Dropdown -->
                        <div class="topbar-dropdown-menu lang-dropdown" v-show="lang_dropdown_open"
                            @mouseenter="open_langDropdown" @mouseleave="close_langDropdown">
                            <div class="dropdown-header">
                                <h6 class="m-0">Select Language</h6>
                            </div>

                            <!-- English -->
                            <a href="#" class="dropdown-item">
                                <img src="@/assets/images/flags/en.svg" alt="English" class="flag-img">
                                <span>English</span>
                            </a>

                            <!-- Bengali -->
                            <a href="#" class="dropdown-item">
                                <img src="@/assets/images/flags/bn.png" alt="Bengali" class="flag-img">
                                <span>Bengali</span>
                            </a>
                            
                            <!-- Chinese -->
                            <a href="#" class="dropdown-item">
                                <img src="@/assets/images/flags/kh.png" alt="Chinese" class="flag-img">
                                <span>Chinese</span>
                            </a>

                            <!-- Thailand -->
                            <a href="#" class="dropdown-item">
                                <img src="@/assets/images/flags/th.jpg" alt="French" class="flag-img">
                                <span>Thailand</span>
                            </a>
                            
                            <!-- Vietnamese -->
                            <a href="#" class="dropdown-item">
                                <img src="@/assets/images/flags/vn.png" alt="German" class="flag-img">
                                <span>Vietnamese</span>
                            </a>

                            <!-- Cambodia -->
                            <a href="#" class="dropdown-item">
                                <img src="@/assets/images/flags/kh.png" alt="Hindi" class="flag-img">
                                <span>Cambodia</span>
                            </a>

                            <!-- France -->
                            <a href="#" class="dropdown-item">
                                <img src="@/assets/images/flags/fr.jpg" alt="Hindi" class="flag-img">
                                <span>France</span>
                            </a>

                            <!-- Spain -->
                            <a href="#" class="dropdown-item">
                                <img src="@/assets/images/flags/es.jpg" alt="Hindi" class="flag-img">
                                <span>Spain</span>
                            </a>
                        </div>
                    </div>
                </div>

                <!-- User Dropdown -->
                <div class="topbar-item nav-user">
                    <div class="topbar-dropdown" @mouseenter="open_userDropdown" @mouseleave="close_userDropdown">
                        <div class="topbar-link topbar-user-btn">
                            <span class="d-flex flex-column gap-1">
                                <h5 class="my-0 topbar_user">{{ user?.userFullName || 'Administrator' }}</h5>
                                <h6 class="my-0 fw-normal topbar_email">{{ user?.email || '' }}</h6>
                            </span>
                            <i class="fa-solid fa-chevron-down dop_down_icon"></i>
                        </div>

                        <!-- Dropdown Menu -->
                        <div class="topbar-dropdown-menu" v-show="user_dropdown_open" @mouseenter="open_userDropdown" @mouseleave="close_userDropdown">
                            <div class="dropdown-header">
                                <h6 class="m-0">Welcome!</h6>
                            </div>

                            <router-link to="/profile" class="dropdown-item">
                                <i class="fa-solid fa-user"></i>
                                <span>My Profile</span>
                            </router-link>

                            <router-link to="/color" class="dropdown-item">
                                <i class="fa-solid fa-palette"></i>
                                <span>Theme Color</span>
                            </router-link>

                            <router-link to="/language" class="dropdown-item">
                                <i class="fa-solid fa-language"></i>
                                <span>Language Settings</span>
                            </router-link>

                            <div class="dropdown-divider"></div>

                            <button class="dropdown-item fw-bold" @click="do_logout">
                                <i class="fa-solid fa-right-from-bracket"></i>
                                <span>Sign Out</span>
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </header>
</template>

<style scoped>


</style>