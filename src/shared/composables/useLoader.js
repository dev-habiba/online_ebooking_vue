import { ref, reactive } from "vue";

/** -- Loader 1: Full Page Loader -- */
const pageLoaderVisible = ref(false);
const pageLoaderMessage = ref("Please Wait...");

/** -- Loader 2: Circle Div Loader -- */
const circleLoaderKeys = reactive(new Set());

/** -- Loader 3: Square Div Block Loader -- */
const squareLoaderKeys = reactive(new Set());


export function useLoader(){

    /***************************** 
     * Show Page Loader
     * ***************************/
    const showModernLoader = (message = 'PLEASE WAIT...') => {
        pageLoaderMessage.value = message
        pageLoaderVisible.value = true
        document.body.style.overflow = 'hidden'
    }

    /** Hide Page Loader */
    const hideModernLoader = () => {
        pageLoaderVisible.value = false
        document.body.style.overflow = ''
    }

    /***************************** 
     * Show Circle Div Loader 
     * ***************************/
    const showCircleLoader = (key) =>{
        circleLoaderKeys.add(key);
    }

    const hideCircleLoader = (key) => { /** Hide Circle Div Loader */
        circleLoaderKeys.delete(key);
    };

    // Checking True -> False (used in template v-if)
    const isCircleLoading = (key) => circleLoaderKeys.has(key);

    /***************************** 
     * Show Square Div Loader 
     * ***************************/
    const showSquareLoader = (key) => {
        squareLoaderKeys.add(key)
    }

    const hideSquareLoader = (key) => { /** Hide Square Loader */
        squareLoaderKeys.delete(key);
    };

    // Checking True -> False (used in template v-if)
    const isSquareLoading = (key) => squareLoaderKeys.has(key); 


    return{
        // page loader
        pageLoaderVisible,
        pageLoaderMessage,
        showModernLoader,
        hideModernLoader,

        // circle loader
        showCircleLoader,
        hideCircleLoader,
        isCircleLoading,

        // square loader
        showSquareLoader,
        hideSquareLoader,
        isSquareLoading,
    }
}
