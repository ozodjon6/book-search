import { createRouter, createWebHistory } from 'vue-router';
import Login from '../components/Login.vue';
import Search from '../components/Search.vue';
import Details from '../components/Detail.vue';
import NotFound from "../components/NotFound.vue";

const routes = [
    {
        path: '/login',
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
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;
