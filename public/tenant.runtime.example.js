/**
 * Tanent Runtime JS
 */
Object.defineProperty(window, "APP_CONFIG", {
    value: Object.freeze({
        soft_cust_id: "API",
        partition_id: 69,
        baseURL: "https://api.example.com", //API Server Call or Connect
    }),
    writable: false,
    configurable: false,
});