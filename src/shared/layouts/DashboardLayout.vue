<script setup>
    import AppTopbar from '@/shared/components/Topbar.vue'
</script>

<template>
    <div class="dashboard-wrapper">
        <div class="main-content">
            <AppTopbar />
            <div class="page-content">
                <router-view />
            </div>
        </div>
    </div>
</template>

<style scoped>
.main-content {
    margin-left: 0px;
    flex: 1;
}
.page-content {
    margin-top: 53px;
    padding: 8px;
}
</style>