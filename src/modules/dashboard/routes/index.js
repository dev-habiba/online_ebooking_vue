import DashboardLayout from '@/shared/layouts/DashboardLayout.vue'

export default [
    {
        path: '/dashboard',
        component: DashboardLayout,
        meta: { requiresAuth: true },
        children: [
            {
                path: '',
                name: 'Dashboard',
                meta: { title: 'Dashboard' },
                component: () => import('@/modules/dashboard/pages/Index.vue')
            }
        ]
    }
]