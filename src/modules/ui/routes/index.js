import DashboardLayout from '@/shared/layouts/DashboardLayout.vue'

export default [
    {
        path: '/blank',
        component: DashboardLayout,
        meta: { requiresAuth: true },
        children: [
            {
                path: '',
                name: 'Blank Page', // ✅
                meta: { title: 'Blank Page' },
                component: () => import('@modules/ui/pages/BlankPage.vue')
            }
        ]
    },
    {
        path: '/loader',
        component: DashboardLayout,
        meta: { requiresAuth: true },
        children: [
            {
                path: '',
                name: 'Loader Page',
                meta: { title: 'Loader Page' },
                component: () => import('@modules/ui/pages/LoaderTest.vue')
            }
        ]
    },
    {
        path: '/modal',
        component: DashboardLayout,
        meta: { requiresAuth: true },
        children: [
            {
                path: '',
                name: 'Modal Page',
                meta: { title: 'Modal Page' },
                component: () => import('@modules/ui/pages/Modal.vue')
            }
        ]
    },
    {
        path: '/sweetalert',
        component: DashboardLayout,
        meta: { requiresAuth: true },
        children: [
            {
                path: '',
                name: 'SweetAlert Page',
                meta: { title: 'SweetAlert Page' },
                component: () => import('@modules/ui/pages/SweetAlert.vue')
            }
        ]
    },
    {
        path: '/table',
        component: DashboardLayout,
        meta: { requiresAuth: true },
        children: [
            {
                path: '',
                name: 'Table Page',
                meta: { title: 'Table Page' },
                component: () => import('@modules/ui/pages/Table.vue')
            }
        ]
    },
    {
        path: '/breadcrumb',
        component: DashboardLayout,
        meta: { requiresAuth: true },
        children: [
            {
                path: '',
                name: 'Breadcrumb Page',
                meta: { title: 'Breadcrumb Page' },
                component: () => import('@modules/ui/pages/Breadcrumb.vue')
            }
        ]
    },
    {
        path: '/color',
        component: DashboardLayout,
        meta: { requiresAuth: true },
        children: [
            {
                path: '',
                name: 'Color Page',
                meta: { title: 'Color Page' },
                component: () => import('@modules/ui/pages/Color.vue')
            }
        ]
    },
    {
        path: '/suggestion',
        component: DashboardLayout,
        meta: { requiresAuth: true },
        children: [
            {
                path: '',
                name: 'Suggestion Test Page',
                meta: { title: 'Suggestion Page' },
                component: () => import('@modules/ui/pages/Suggestion.vue')
            }
        ]
    }
]