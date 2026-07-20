import DashboardLayout from '@/shared/layouts/DashboardLayout.vue'

export default [
    {
        path: '/my_bookings',
        component: DashboardLayout,
        meta: { requiresAuth: true },
        children: [
            {
                path: '',
                name: 'All Bookings',
                meta: { title: 'All Bookings' },
                component: () => import('@/modules/booking/pages/Dashboard.vue')
            },
            {
                path: 'courier',
                name: 'courier.booking',
                meta: { title: 'Courier Booking' },
                component: () => import('@/modules/booking/pages/courier/Courier.vue')
            },
            {
                path: 'freight_forwarding',
                name: 'freight.forwarding',
                meta: { title: 'Freight Forwarding' },
                component: () => import('@/modules/booking/pages/freight_forwarding/FreightForwarding.vue')
            }
        ]
    }
]