<script setup>
    const { moduleTitle, moduleShortTitle, pageTitle } = defineProps({
        moduleTitle: {
            type: String,
            default: ""
        },
        moduleShortTitle: {
            type: String,
            default: ""
        },
        moduleUrl:{
            type: String,
            default: "/"
        },
        pageTitle: {
            type: String,
            default: ""
        },

    });
</script>

<template>
    <div class="module_header">
        <div class="d-flex justify-content-between align-items-center">
            <div>
                <h5 class="fw-semibold">{{ moduleTitle }}</h5>
                <small>{{ pageTitle }}</small>
            </div>

            <nav aria-label="breadcrumb" v-if="pageTitle">
                <ol class="breadcrumb bg-transparent p-0 small d-flex align-items-center">
                    <li class="breadcrumb-item d-flex align-items-center">
                        <router-link :to="{ moduleUrl }" class="text-decoration-none">{{ moduleShortTitle }}</router-link>
                        <i class="fas fa-angle-right"></i>
                    </li>
                    <li class="breadcrumb-item active" aria-current="page">{{ pageTitle }}</li>
                </ol>
            </nav>
        </div>
    </div> 
</template>
