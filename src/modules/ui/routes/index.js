import DashboardLayout from '@/shared/layouts/DashboardLayout.vue'

export default [
    {
        path: '/blank',
        name: 'Blank Page',
        component: DashboardLayout ,
        meta: { requiresAuth: true },
        children: [
            {
                path: '',
                meta: { title: 'Blank Page' },
                component: () => import('@modules/ui/pages/BlankPage.vue')
            }
        ]
    },
    {
        path: '/loader',
        name: 'Loader Page',
        component: DashboardLayout ,
        meta: { requiresAuth: true },
        children: [
            {
                path: '',
                meta: { title: 'Loader Page' },
                component: () => import('@modules/ui/pages/LoaderTest.vue')
            }
        ]
    },
    {
        path: '/modal',
        name: 'Modal Page',
        component: DashboardLayout ,
        meta: { requiresAuth: true },
        children: [
            {
                path: '',
                meta: { title: 'Modal Page' },
                component: () => import('@modules/ui/pages/Modal.vue')
            }
        ]
    },
    {
        path: '/sweetalert',
        name: 'SweetAlert Page',
        component: DashboardLayout ,
        meta: { requiresAuth: true },
        children: [
            {
                path: '',
                meta: { title: 'SweetAlert Page' },
                component: () => import('@modules/ui/pages/SweetAlert.vue')
            }
        ]
    },
    {
        path: '/table',
        name: 'Table Page',
        component: DashboardLayout ,
        meta: { requiresAuth: true },
        children: [
            {
                path: '',
                meta: { title: 'Table Page' },
                component: () => import('@modules/ui/pages/Table.vue')
            }
        ]
    },
    {
        path: '/breadcrumb',
        name: 'Breadcrumb Page',
        component: DashboardLayout ,
        meta: { requiresAuth: true },
        children: [
            {
                path: '',
                meta: { title: 'Breadcrumb Page' },
                component: () => import('@modules/ui/pages/Breadcrumb.vue')
            }
        ]
    },
    {
        path: '/color',
        name: 'Color Page',
        component: DashboardLayout ,
        meta: { requiresAuth: true },
        children: [
            {
                path: '',
                meta: { title: 'Color Page' },
                component: () => import('@modules/ui/pages/Color.vue')
            }
        ]
    },
    {
        path: '/suggestion',
        name: 'Suggestion Test Page',
        component: DashboardLayout ,
        meta: { requiresAuth: true },
        children: [
            {
                path: '',
                meta: { title: 'Suggestion Page' },
                component: () => import('@modules/ui/pages/Suggestion.vue')
            }
        ]
    }
]