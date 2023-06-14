import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/todos',
        component: () => import('@/views/todos-list-page.vue')
    },
    {
        path: '/todo/:id',
        component: () => import('@/views/todo-page.vue')
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/todos'
    }
]

const router = createRouter({
    routes,
    history: createWebHistory()
})

export default router;