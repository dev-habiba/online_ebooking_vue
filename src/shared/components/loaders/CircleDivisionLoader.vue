<script setup>
    import { useLoader } from '@/shared/composables/useLoader.js'

    const props = defineProps({
        loaderKey: {
            type: String,
            required: true
        }
    });

    const { isCircleLoading } = useLoader();
</script>

<template>
    <div class="circle-loader" v-if="isCircleLoading(props.loaderKey)"></div>
</template>

<style lang="css" scoped>
/* Circular Loader - Centered Division Bashed */
.circle-loader {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 50px;
    aspect-ratio: 1;
    border-radius: 50%;
    border: 8px solid lightblue;       /* main border color */
    border-top-color: #0065d1;          /* highlight part */
    border-right-color: lightblue;
    border-bottom-color: lightblue;
    border-left-color: lightblue;
    animation: rotateLoader 1s linear infinite;
}

@keyframes rotateLoader {
    to { transform: translate(-50%, -50%) rotate(1turn); }
}
</style>
