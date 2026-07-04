import { ref } from "vue";
import { useAuthStore } from "@/modules/auth/store/authStore";
import { useToast } from "vue-toastification"; // Toast call
import router from "@/core/router";

export function useAuth(){
    
    const auth = useAuthStore();
    const toast = useToast();
    
    const is_loading = ref(false);
    const api_error = ref("");
    const form_error = ref(false);

    /** Screen Info */
    const getScreenDetails = () => {
        return {
            screenWidth: window.screen.width,
            screenHeight: window.screen.height,
            viewportWidth: window.innerWidth,
            viewportHeight: window.innerHeight,
            zoom: window.devicePixelRatio || (window.outerWidth / window.innerWidth)
        };
    };


    /** do Login */
    const do_login = async (payload) => {
        is_loading.value = true;
        api_error.value = "";
        form_error.value = false;

        try {
            await auth.login(payload);
            toast.success("Logged in successfully!");
            await router.push('/dashboard');
        } catch (err) {
            api_error.value = err.response?.data?.message || "Login failed!";
            form_error.value = true;
            toast.error(api_error.value);
        } finally {
            is_loading.value = false;
        }
    };

    /** do Logout */
    const do_logout = async () => {

        const screen = getScreenDetails();

        const payload = {
            screen_height: screen.screenHeight,
            screen_width: screen.screenWidth,
            screen_zoom: Math.round(screen.zoom * 100)
        };

        try {
            await auth.logout(payload);
            toast.success("Logged out successfully!");
            await router.push("/");
        } catch (error) {
            console.error("Logout Error:", error);
            toast.error("Logout failed!");
        }
    };
   

    return {
        is_loading,
        api_error,
        form_error,
        do_login,
        do_logout,
        user: auth.getUser,
        isAuthenticated: auth.isAuthenticated,
    }
}