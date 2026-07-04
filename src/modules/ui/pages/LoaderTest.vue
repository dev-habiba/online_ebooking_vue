<script setup>
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';
    import { useLoader } from '@/shared/composables/useLoader.js'
    import CircleDivisionLoader from '@/shared/components/loaders/CircleDivisionLoader.vue';
    import SquareDivisionLoader from '@/shared/components/loaders/SquareDivisionLoader.vue';

    const {
        showModernLoader,
        hideModernLoader,
        showCircleLoader,
        hideCircleLoader,
        showSquareLoader,
        hideSquareLoader
    } = useLoader();

    /** Test 1: Full Page Loader - 2 second er jonno show hobe */
    const testPageLoader = () => {
        showModernLoader('Please Wait...');
        setTimeout(() => {
            hideModernLoader();
        }, 2000);
    };

    /** Test 2: Circle Div Loader - 2 second er jonno show hobe */
    const testCircleLoader = () => {
        showCircleLoader('test_div_box');
        setTimeout(() => {
            hideCircleLoader('test_div_box');
        }, 2000);
    };
 
    /** Test 3: Division Block Loader - 2 second er jonno show hobe */
    const testSquareLoader = () => {
        showSquareLoader('test_division_box');
        setTimeout(() => {
            hideSquareLoader('test_division_box');
        }, 2000);
    };

 
</script>

<template>
    
    <div class="container py-4">
        <p class="lead">Loader Test Page</p>
 
        <div class="d-flex gap-2 flex-wrap mb-4">
            <button class="btn btn-primary" @click="testPageLoader">
                Test Page Loader
            </button>
            <button class="btn btn-secondary" @click="testCircleLoader">
                Test Circle Loader
            </button>
            <button class="btn btn-success" @click="testSquareLoader">
                Test Square Loader
            </button>
        </div>
 
        <!-- Circle Loader Test Box -->
        <div id="test_div_box" class="position-relative border rounded p-4 mb-4" style="height: 150px;">
            <p class="text-muted m-0">Circle loader appears inside this box</p>
            <CircleDivisionLoader loader-key="test_div_box" />
        </div>
 
        <!-- Square Loader Test Box -->
        <div id="test_division_box" class="position-relative border rounded p-4" style="height: 150px;">
            <p class="text-muted m-0">Block loader appears inside this box</p>
            <SquareDivisionLoader loader-key="test_division_box" />
        </div>
    </div>

</template>
