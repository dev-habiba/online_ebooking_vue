import DashboardLayout from '@/shared/layouts/DashboardLayout.vue'

export default [
    {
        path: '/user-admin',
        component: DashboardLayout,
        meta: { requiresAuth: true },
        children: [
            {
                path: '',
                name: 'User Admin',
                meta: { title: 'User Admin' },
                component: () => import('@/modules/users/pages/Dashboard.vue')
            },
        ]
    }
]