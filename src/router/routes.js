import store from '@/store';

export default [
    {
        path: '/',
        name: 'home',
        redirect: { name: 'dashboard' },
        meta: {
            authRequired: true
        }
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('@/views/Dashboard'),
        meta: {
            authRequired: true
        }
    },
    {
        path: '/form',
        name: 'form',
        component: () => import('@/views/Transaction'),
        meta: {
            authRequired: true
        },
        props: route => ({ item: route.params.item })
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/Login'),
        beforeEnter(routeTo, routeFrom, next) {
            // If the user is already logged in
            if (store.getters['user/isLoggedIn']) {
                // Redirect to the home page instead
                next({ name: 'home' });
            } else {
                // Continue to the login page
                next();
            }
        }
    },
    {
        path: '/transactions',
        name: 'transactions',
        component: () => import('@/views/TransactionsOverview'),
        meta: {
            authRequired: true
        }
    },
    {
        path: '/accounts',
        name: 'accounts',
        component: () => import('@/views/Accounts'),
        meta: {
            authRequired: true
        }
    },
    {
        path: '/users',
        name: 'users',
        component: () => import('@/views/Users'),
        meta: {
            authRequired: true
        }
    },
    {
        path: '/logout',
        name: 'logout',
        meta: {
            authRequired: true
        },
        beforeEnter(routeTo, routeFrom, next) {
            store.dispatch('auth/logOut');
            const authRequiredOnPreviousRoute = routeFrom.matched.some(route => route.meta.authRequired);
            // Navigate back to previous page, or home as a fallback
            next(authRequiredOnPreviousRoute ? { name: 'home' } : { ...routeFrom });
        }
    },
    {
        path: '/404',
        name: '404',
        component: () => import('@/views/404'),
        // Allows props to be passed to the 404 page through route
        // params, such as `resource` to define what wasn't found.
        props: true
    },
    // Redirect any unmatched routes to the 404 page. This may
    // require some server configuration to work in production:
    // https://router.vuejs.org/en/essentials/history-mode.html#example-server-configurations
    {
        path: '*',
        redirect: '404'
    }
];
