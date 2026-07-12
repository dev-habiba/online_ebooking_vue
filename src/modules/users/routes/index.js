import DashboardLayout from '@/shared/layouts/DashboardLayout.vue'

export default [
    {
        path: '/user-admin',
        name: 'User Admin',
        component: DashboardLayout ,
        meta: { requiresAuth: true },
        children: [
            {
                path: '',
                meta: { title: 'User Admin' },
                component: () => import('@/modules/users/pages/Dashboard.vue')
            },
        ]
    }
]