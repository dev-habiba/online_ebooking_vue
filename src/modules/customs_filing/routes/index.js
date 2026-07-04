import DashboardLayout from '@/shared/layouts/DashboardLayout.vue'

export default [
    {
        path: '/filing/ics_ens',
        name: 'EU ICS-2/ENS',
        component: DashboardLayout ,
        meta: { requiresAuth: true },
        children: [
            {
                path: '',
                component: () => import('@/modules/customs_filing/pages/Dashboard.vue')
            }
        ]
    }
]