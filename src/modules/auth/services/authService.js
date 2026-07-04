//** modules/auth/services/authService.js -> Only Api Call */

import apiClient from "@/core/apiClient";

export default {

    login(payload){
        console.log(payload);
        return apiClient.post("/online/login.php", payload);
    },

    logout(payload){
        return apiClient.post("/online/logout.php", payload);
    },
}
