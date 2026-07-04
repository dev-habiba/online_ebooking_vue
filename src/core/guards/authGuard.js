//** core/guards/authGuard.js */
export function authGuard(to){
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");

    /** 01 - Already login -> but request to access login.php TO */ 
    if (to.meta.guestOnly && token) {
        return "/dashboard";
    }

    //** 02 - login required to access protected pages FROM*/
    if (to.meta.requiresAuth && !token) {
        return "/";
    }

    /** 03 - next good to go! */
    return true;
}

