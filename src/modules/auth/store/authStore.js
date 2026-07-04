// modules/auth/store/authStore.js
import { defineStore } from "pinia";
import authService from "../services/authService";
// import router from "@/core/router";

export const useAuthStore = defineStore("auth", {

    /** Store token, expire time, user, api_list data */
    state: () => ({
        token: localStorage.getItem("token") || sessionStorage.getItem("token") || null,
        expiresIn: localStorage.getItem("expires_in") || sessionStorage.getItem("expires_in") || null,
        user: JSON.parse(localStorage.getItem("user") || sessionStorage.getItem("user")) || null,
        apiList: JSON.parse(localStorage.getItem("api_list") || sessionStorage.getItem("api_list")) || {},
    }),

    getters: {
        isAuthenticated: (state) => !!state.token,
        getUser: (state) => state.user,
        getApiUrl: (state) => (key) => state.apiList[key] || null,
    },

    actions: {

        async login(payload) {

            const res = await authService.login(payload);

            this.token = res.data.token;
            this.expiresIn = res.data.expires_in;
            this.user = res.data.user;
            this.apiList = res.data.api_list || {};

            /** Remember -> localStorage Save else */
            if(payload.remember){
                localStorage.setItem("token", this.token);
                localStorage.setItem("expires_in", this.expiresIn);
                localStorage.setItem("user", JSON.stringify(this.user));
                localStorage.setItem("api_list", JSON.stringify(this.apiList));
            } else{
                sessionStorage.setItem("token", this.token);
                sessionStorage.setItem("expires_in", this.expiresIn);
                sessionStorage.setItem("user", JSON.stringify(this.user));
                sessionStorage.setItem("api_list", JSON.stringify(this.apiList));
            }

            // router.push("/dashboard");
        },

        async logout(payload) {
            
            try {
                await authService.logout(payload);
            } catch (error) {
                console.error("Logout API Error:", error);
            }

            // local clear
            this.token = null;
            this.expiresIn = null;
            this.user = null;
            this.apiList = {};

            localStorage.removeItem("token");
            localStorage.removeItem("expires_in");
            localStorage.removeItem("user");
            localStorage.removeItem("api_list");

            sessionStorage.removeItem("token");
            sessionStorage.removeItem("expires_in");
            sessionStorage.removeItem("user");
            sessionStorage.removeItem("api_list");
        }
    }

});