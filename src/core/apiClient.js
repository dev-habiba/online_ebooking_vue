/** Central HTTP Client */
import axios from "axios";
import router from "@/core/router";

/** APP CONFIG */
const TENANT_CONFIG = window.APP_CONFIG;

//** 01 - Client Create */
const apiClient = axios.create({

    baseURL: TENANT_CONFIG.baseURL,
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }

});

/** 02 - Attach JWT Token Automatically for Every Request */
apiClient.interceptors.request.use((config) => {

    const token =
        localStorage.getItem("token") ||
        sessionStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config

},(error) => Promise.reject(error));


/** 03 - Response and Error Handle Here */
apiClient.interceptors.response.use(
    (response) => response, // if success -> directly return
    (error) => {

        const status = error.response?.status;

        if (status === 401) {
            // Token expired or invalid →  do logout 
            localStorage.removeItem("token");
            sessionStorage.removeItem("token");
            
            if (router.currentRoute.value.path !== "/") {
                router.push("/");
            }
        }

        if (status === 403) {
            // Permission Invalid
            router.push("/unauthorized");
        }

        if (status === 500) {
            console.error("Server error:", error.response?.data?.message);
        }

        return Promise.reject(error); // error -> handle to service
    }
)

export default apiClient