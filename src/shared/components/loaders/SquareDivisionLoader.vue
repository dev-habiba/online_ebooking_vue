<script setup>
    import { useLoader } from '@/shared/composables/useLoader.js'

    const props = defineProps({
        loaderKey: {
            type: String,
            required: true
        }
    })

    const { isSquareLoading } = useLoader()
</script>

<template>
    <div class="division-loader-blocks" v-if="isSquareLoading(props.loaderKey)">
        <div class="division-loader-block"></div>
        <div class="division-loader-block"></div>
        <div class="division-loader-block"></div>
        <div class="division-loader-block"></div>
        <div class="division-loader-block"></div>
    </div>
</template>

<style lang="css" scoped>
/* Division Loader CSS */
 .division-loader-blocks {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 10;
    gap: 6px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.division-loader-block {
    width: 15px;
    height: 15px;
    background-color: #0065d1;
    animation: blockPulse 1s infinite ease-in-out;
}

.division-loader-block:nth-child(1) { animation-delay: 0s; }
.division-loader-block:nth-child(2) { animation-delay: 0.2s; }
.division-loader-block:nth-child(3) { animation-delay: 0.4s; }
.division-loader-block:nth-child(4) { animation-delay: 0.6s; }
.division-loader-block:nth-child(5) { animation-delay: 0.8s; }

@keyframes blockPulse {
    0%, 80%, 100% { transform: scale(0.3); opacity: 0.4; }
    40% { transform: scale(1); opacity: 1; }
}
</style>
