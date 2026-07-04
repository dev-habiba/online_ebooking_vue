<script setup>
    import { useLoader } from '@/shared/composables/useLoader.js'
    const { pageLoaderVisible, pageLoaderMessage } = useLoader();
</script>

<template>
    <div class="elite-loader-container" v-if="pageLoaderVisible">
        <div class="elite-loader-wrapper">
            <div class="elite-spinner p-0 m-0"></div>
            <div class="elite-text">{{ pageLoaderMessage }}</div>
            <!-- <div class="elite-bars">
                <div class="elite-bar"></div>
                <div class="elite-bar"></div>
                <div class="elite-bar"></div>
                <div class="elite-bar"></div>
                <div class="elite-bar"></div>
                <div class="elite-bar"></div>
                <div class="elite-bar"></div>
                <div class="elite-bar"></div>
                <div class="elite-bar"></div>
                <div class="elite-bar"></div>
            </div> -->
        </div>
    </div>
</template>

<style lang="css" scoped>
 .elite-loader-container {
     position: fixed;
     top: 45%;
     left: 50%;
     transform: translate(-50%, -50%);
     z-index: 99999;
 }

 .elite-loader-wrapper {
     background: linear-gradient(145deg, #eeeeee, #f8f8f8);
     padding: 20px 28px;
     border-radius: 20px;
     border: 2px solid rgba(131, 125, 217, 0.2);
     /* box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1),
      0 8px 16px rgba(127, 0, 255, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.9); */
     backdrop-filter: blur(20px);
     display: flex;
     flex-direction: column;
     align-items: center;
     gap: 10px;
 }

 .elite-spinner {
     width: 50px;
     height: 50px;
     border: 3px solid rgba(130, 25, 227, 0.15);
     border-top-color: rgb(127, 0, 255);
     border-right-color: rgb(95, 24, 237);
     border-radius: 50%;
     animation: spinRotate 1.2s linear infinite;
     box-shadow: 0 0 15px rgba(127, 0, 255, 0.3),
         inset 0 0 10px rgba(225, 0, 255, 0.1);
 }

 @keyframes spinRotate {
     to {
         transform: rotate(360deg);
     }
 }

 .elite-bars {
     display: flex;
     justify-content: center;
     align-items: center;
     gap: 3px;
     height: 12px;
 }

 .elite-bar {
     width: 28px;
     height: 12px;
     background: #e0e0e0;
     border-radius: 6px;
     position: relative;
     overflow: hidden;
     box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
 }

 .elite-bar::before {
     content: "";
     position: absolute;
     inset: 0;
     width: 0%;
     background: linear-gradient(90deg,
             rgb(123 31 216) 0%,
             rgb(53 33 219) 56%,
             rgb(51, 71, 228) 100%);
     border-radius: 6px;
     animation: barFill 2s ease-in-out infinite;
     box-shadow: 0 0 10px rgba(127, 0, 255, 0.6);
 }

 /* Sequential animation one after another */
 .elite-bar:nth-child(1)::before {
     animation-delay: 0s;
 }

 .elite-bar:nth-child(2)::before {
     animation-delay: 0.2s;
 }

 .elite-bar:nth-child(3)::before {
     animation-delay: 0.4s;
 }

 .elite-bar:nth-child(4)::before {
     animation-delay: 0.6s;
 }

 .elite-bar:nth-child(5)::before {
     animation-delay: 0.8s;
 }

 .elite-bar:nth-child(6)::before {
     animation-delay: 1s;
 }

 .elite-bar:nth-child(7)::before {
     animation-delay: 1.2s;
 }

 .elite-bar:nth-child(8)::before {
     animation-delay: 1.4s;
 }

 .elite-bar:nth-child(9)::before {
     animation-delay: 1.6s;
 }

 .elite-bar:nth-child(10)::before {
     animation-delay: 1.8s;
 }

 @keyframes barFill {
     0% {
         width: 0%;
         opacity: 0;
     }

     50% {
         width: 100%;
         opacity: 1;
     }

     100% {
         width: 100%;
         opacity: 0;
     }
 }

 .elite-text {
     text-align: center;
     font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
         sans-serif;
     font-size: 16px;
     text-transform: uppercase;
     font-weight: 700;
     background: linear-gradient(90deg,
             rgb(127, 0, 255) 0%,
             rgb(142, 22, 228) 50%,
             rgb(51, 71, 228) 100%);
     -webkit-background-clip: text;
     -webkit-text-fill-color: transparent;
     background-clip: text;
     letter-spacing: 0.8px;
     opacity: 0.9;
 }

 /* Dark Mode */
 @media (prefers-color-scheme: dark) {
     .elite-loader-wrapper {
         background: linear-gradient(145deg, #1f1f2e, #2a2a3f);
         border: 2px solid rgba(131, 125, 217, 0.4);
         box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4),
             0 8px 16px rgba(127, 0, 255, 0.15),
             inset 0 1px 0 rgba(131, 125, 217, 0.2);
     }

     .elite-bar {
         background: #2a2a3f;
         box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.3);
     }

     .elite-spinner {
         border-color: rgba(131, 125, 217, 0.2);
         border-top-color: rgb(127, 0, 255);
         border-right-color: rgb(225, 0, 255);
     }
 }
</style>