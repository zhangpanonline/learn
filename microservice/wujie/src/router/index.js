import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/app1',
    },
    {
      path: '/app1',
      name: 'app1',
      component: () => import('@/views/app1.vue'),
    },
    {
      path: '/app2',
      name: 'app2',
      component: () => import('@/views/app2.vue'),
    },
  ],
})

export default router
