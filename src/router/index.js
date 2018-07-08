import Vue from 'vue';
import VueRouter from 'vue-router';
// https://github.com/declandewet/vue-meta
// Adds a loading bar at the top during page loads.
import store from '@/store';
import routes from './routes';

Vue.use(VueRouter);

const router = new VueRouter({
    routes,
    // Use the HTML5 history API (i.e. normal-looking routes)
    // instead of routes with hashes (e.g. example.com/#/about).
    // This may require some server configuration in production:
    // https://router.vuejs.org/en/essentials/history-mode.html#example-server-configurations
    mode: 'hash',
    // Simulate native-like scroll behavior when navigating to a new
    // route and using back/forward buttons.
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            return { x: 0, y: 0 };
        }
    }
});

// Before each route evaluates...
router.beforeEach((routeTo, routeFrom, next) => {
    // Check if auth is required on this route
    // (including nested routes).
    const authRequired = routeTo.matched.some(route => route.meta.authRequired);

    // If auth isn't required for the route, just continue.
    if (!authRequired || store.getters['user/isLoggedIn']) return next();

    // If auth is required and the user is NOT currently logged in,
    // redirect to login
    next({ name: 'login' });
});

export default router;
