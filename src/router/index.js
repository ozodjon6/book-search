import { createRouter, createWebHistory } from 'vue-router';
import Login from '../components/Login.vue';
import Search from '../components/Search.vue';

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
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
