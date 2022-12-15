export default [
    {
        name: 'Home',
        path: '/',
        component: require('@/components/PageHome').default,
    },
    {
        name: 'Home',
        path: '/:pathMatch(.*)*',
        component: require('@/components/PageHome').default,
    }
]