const loginPages = [
    () => import('@modules/auth/pages/LoginOne.vue'),
    () => import('@modules/auth/pages/LoginTwo.vue'),
];

// const slots = Math.floor(Date.now() / (6 * 60 * 60 * 1000))
const slots = Math.floor(Date.now() / (1 * 60 * 1000))
const currentLoginPage = loginPages[slots % loginPages.length];


export default [
    {
        path: '/',
        name: 'Login',
        component: currentLoginPage,
        meta: { guestOnly: true, hideLoader: true } // Hide Loader for this route
    }
]