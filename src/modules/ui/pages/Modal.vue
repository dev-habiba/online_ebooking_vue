<script setup>
    import { ref } from 'vue';
    import BaseModal from '@/shared/components/modal/BaseModal.vue';

    const showTestModal = ref(false)

</script>

<template>

    <div class="container py-4">
        <p class="lead">Modal Page</p>
        <div class="d-flex gap-2 flex-wrap mb-4">
            <button class="btn btn-primary" @click="showTestModal = true">
                New Modal
            </button>
        </div>
    </div>

    <BaseModal v-model:modalValue="showTestModal" :closeOnBackdrop="true" position="center" width="500px" height="300px" padding="30px">
        <template #header>
            <div class="">
                <h6 class="lead text-primary">Customer Modal</h6>
            </div>
        </template>

        <template #body>
            <table>
                <tr>
                    <td>1</td>
                    <td>3</td>
                    <td>4</td>
                    <td>5</td>
                    <td>6</td>
                </tr>
            </table>
        </template>
        
        <template #footer>
            <button class="btn btn-secondary me-2" @click="showTestModal = false">
                Cancel 
            </button>

            <button class="btn btn-success" @click="showTestModal = false">
                Save
            </button>
        </template>
    </BaseModal>

    
</template>