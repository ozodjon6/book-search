import {createRouter, createWebHashHistory, createWebHistory} from 'vue-router';
import Login from '../components/Login.vue';
import Search from '../components/Search.vue';
import Details from '../components/Detail.vue';
import NotFound from "../components/NotFound.vue";

const routes = [
    {
        path: '/',
        name: 'login',
        component: Login,
    },
    {
        path: '/search',
        name: 'search',
        component: Search,
    },
    {
        path: '/details/:bookId',
        name: 'details',
        component: Details,
        props: true,
    },
    {
        path: '/:pathMatch(.*)*',
        name: '404',
        component: NotFound
    }
];

const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes,
});

router.beforeEach((to, from, next) => {
    const isAuthenticated = !!localStorage.getItem('authToken');
    if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
        next('/login');
    } else {
        next();
    }
});

export default router;
