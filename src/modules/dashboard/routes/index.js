import DashboardLayout from '@/shared/layouts/DashboardLayout.vue'

export default [
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: DashboardLayout ,
        meta: { requiresAuth: true },
        children: [
            {
                path: '',
                meta: { title: 'Dashboard' },
                component: () => import('@/modules/dashboard/pages/Index.vue')
            }
        ]
    }
]