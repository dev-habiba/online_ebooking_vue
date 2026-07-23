// ===================== USAGE EXAMPLES =====================

// import { getActionIcon } from '@/shared/utils/allSiteIcon.js';
// import { getSeaAirLandIcon } from '@/shared/utils/allSiteIcon.js';

//  Action icon usage in template (Font Awesome class binding)
// <i :class="getActionIcon('edit')"></i>

//  Sea / Air / Land icon usage (raw SVG via v-html, based on numeric code from API)
// <span v-html="getSeaAirLandIcon(item.sea_air_land_code)" class="cargoaim_custom_cft_page_sea_air_icon"></span>

// ===================== Sea / Air / Land icons (by code) =====================
export const SEA_AIR_LAND_ICONS = {
    1: `<svg viewBox="0 -27.24 122.88 122.88" fill="#ffffff" stroke="#ffffff" stroke-width="3" stroke-linejoin="round"><path d="M11.14,66.21L0.02,39.85c-0.05-0.13,0.01-0.28,0.14-0.33c0.03-0.01,0.07-0.02,0.1-0.02l22.75,0l4.18-19.99c0.02-0.12,0.13-0.2,0.25-0.2l7.02,0V0.25C34.44,0.11,34.56,0,34.7,0h3.49c0.14,0,0.26,0.11,0.26,0.25V19.3h4.23V8.73c0-0.14,0.11-0.25,0.26-0.25h3.49c0.14,0,0.25,0.11,0.25,0.25V19.3h26.05l0.16,0.01c2.15,0.18,4.16,0.61,6,1.35c1.85,0.74,3.53,1.78,5.03,3.17c1.47,1.36,2.74,3.04,3.79,5.08c1.04,2.03,1.86,4.42,2.43,7.2l0.04,0.37l0,0.03l0,2.99h32.44c0.14,0,0.26,0.11,0.26,0.26c0,0.07-0.03,0.14-0.08,0.19l-12.11,12.92c-0.92,0.98-1.56,1.69-2.18,2.37l-0.01,0.01c-1.82,2-3.48,3.85-5.4,5.5c-1.93,1.66-4.11,3.13-6.93,4.38c-0.6,0.27-1.21,0.51-1.83,0.74c-0.62,0.23-1.24,0.44-1.89,0.63c-0.63,0.19-1.28,0.36-1.94,0.51c-0.65,0.15-1.32,0.28-2.01,0.4c-19.74,2.21-55.22,0.03-76.68,0.03c-0.11,0-0.21-0.07-0.24-0.18L11.14,66.21L11.14,66.21z M66.49,27.53h15.5l-0.19-0.21c-0.19-0.2-0.38-0.39-0.58-0.57c-1.13-1.04-2.42-1.83-3.85-2.4c-1.43-0.57-3.02-0.91-4.72-1.05H30.46l-3.38,16.2h59.11v-2.81c-0.04-0.2-0.09-0.41-0.14-0.61l-0.1-0.43H66.49c-0.14,0-0.25-0.11-0.25-0.26v-7.61C66.24,27.64,66.35,27.53,66.49,27.53L66.49,27.53z M50.54,27.53h7.87c0.14,0,0.25,0.11,0.25,0.26v7.79c0,0.14-0.11,0.26-0.25,0.26h-7.87c-0.14,0-0.26-0.11-0.26-0.26v-7.79C50.28,27.64,50.4,27.53,50.54,27.53L50.54,27.53z M5.88,43.5l8.41,19.94h73.76c0.55-0.09,1.09-0.2,1.63-0.33c0.55-0.13,1.10-0.27,1.64-0.43c0.55-0.16,1.10-0.35,1.64-0.55c0.54-0.2,1.08-0.42,1.60-0.65c2.44-1.08,4.35-2.39,6.07-3.88c1.73-1.50,3.26-3.19,4.92-5.03l1.16-1.28c0.38-0.41,0.74-0.81,1.07-1.16L114,43.5H5.88L5.88,43.5z"></path></svg>`, // Sea

    2: `<svg viewBox="0 0 1024 1024" class="icon" xmlns="http://www.w3.org/2000/svg" fill="#000000" transform="rotate(45)"><g stroke-width="0"></g><g stroke-linecap="round" stroke-linejoin="round"></g><g><path d="M453.12 948.032h131.264c6.4 0 12.48 0.576 18.688 1.344V157.952c0-51.072-38.656-92.416-86.336-92.416-47.744 0-86.464 41.344-86.464 92.416v792c7.552-1.216 15.104-1.92 22.848-1.92z" fill="#daf3fb"></path><path d="M603.072 313.6l324.8 346.176v78.592L603.072 570.624zM603.072 788.16l87.104 90.752v92.864l-87.104-25.984zM430.336 782.4l-87.04 90.752v92.736l87.04-25.92zM430.336 312.32l-324.8 346.048v78.72l324.8-167.808zM502.144 949.44h30.144c1.408 0 2.944 0.128 4.288 0.384v-189.376c0-12.16-8.896-22.08-19.84-22.08s-19.904 9.856-19.904 22.08v189.504a28.8 28.8 0 0 1 5.312-0.512z" fill="#ffffff"></path></g></svg>`, // Air

    3: `<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g stroke-width="0"></g><g stroke-linecap="round" stroke-linejoin="round"></g><g><rect x="10.199" y="114.007" style="fill:#D35B38;" width="314.105" height="169.96"></rect><g><rect x="10.199" y="283.967" style="fill:#FFE6B8;" width="314.105" height="73.149"></rect><polygon style="fill:#FFE6B8;" points="468.453,238.789 383.472,238.789 383.472,137.671 324.308,137.671 324.308,357.117 501.801,357.117 501.801,258.152 "></polygon></g><path style="fill:#BCC987;" d="M468.453,238.789l-17.88-76.396c-3.389-14.481-16.303-24.722-31.176-24.722h-35.926v101.117h84.982 V238.789z"></path><rect x="462.004" y="277.511" style="fill:#FFAD61;" width="39.797" height="31.195"></rect><g><circle style="fill:#CCCCCC;" cx="399.605" cy="357.115" r="40.878"></circle><circle style="fill:#CCCCCC;" cx="93.027" cy="357.115" r="40.878"></circle></g></g></svg>`, // Land

    4: '4',
    5: '5',
    6: '6',
    7: '7',
    8: '<i class="fa-solid fa-truck-fast"></i>',
    9: '9',
    10: '10',
    11: '11',
    12: '12',
    13: '13',
    14: `<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" fill="#ffffff" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill="#000000" d="M247 16v89h9c14.9 0 23 11.7 23.8 23.6.4 6-1.2 11.5-4.7 15.4-3.5 4-9.1 7-19.1 7-5 0-11.1-2.8-15.6-7.4-4.6-4.5-7.4-10.6-7.4-15.6h-18c0 11 5.2 20.9 12.6 28.4 7.5 7.4 17.4 12.6 28.4 12.6 14 0 25.4-5 32.5-13 7.2-8.1 10-18.6 9.3-28.6-1.2-17.5-13.4-35.18-32.8-39.42V16h-18zm-47.9 140.5L61.34 247h32.7l114.86-75.5-9.8-15zm113.8 0l-9.8 15L418 247h32.6l-137.7-90.5zM41 265v222h430V265H41zm38 23h18v176H79V288zm48 0h18v176h-18V288zm48 0h18v176h-18V288zm48 0h18v176h-18V288zm48 0h18v176h-18V288zm48 0h18v176h-18V288zm48 0h18v176h-18V288zm48 0h18v176h-18V288z"></path></g></svg>`,
    15: '15',
};

export function getSeaAirLandIcon(code) {
    return SEA_AIR_LAND_ICONS[code] ?? '';
}


// ===================== Common action icons (edit, save, delete, etc.) =====================
export const ACTION_ICONS = {
    edit: 'fa-solid fa-pen-to-square',
    save: 'fa-solid fa-floppy-disk',
    delete: 'fa-solid fa-trash',
    view: 'fa-solid fa-eye',
    download: 'fa-solid fa-download',
    print: 'fa-solid fa-print',
    close: 'fa-solid fa-xmark',
    add: 'fa-solid fa-plus',
    rotate: 'fa-solid fa-arrows-rotate',
    copy: 'fa-solid fa-copy',
    lock: 'fa-solid fa-lock',
    unlock: 'fa-solid fa-lock-open',
    send: 'fa-solid fa-paper-plane',
    excel: 'fa-solid fa-file-excel',
    pdf: 'fa-solid fa-file-pdf',
    filter: 'fa-solid fa-filter',
    search: 'fa-solid fa-magnifying-glass',
    approve: 'fa-solid fa-check',
    reject: 'fa-solid fa-ban',
    warning: 'fa-solid fa-triangle-exclamation',
    info: 'fa-solid fa-circle-info',
    mail: 'fa-regular fa-envelope',
    palette: 'fa-solid fa-palette',
    circle_check: 'fa-solid fa-circle-check',
    rotate_left: 'fa-solid fa-rotate-left',
};

export function getActionIcon(name) {
    return ACTION_ICONS[name] ?? '';
}