import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/sub1_1',
    },
    {
      path: '/sub1_1',
      name: 'sub1_1',
      component: () => import('../views/sub1_1.vue'),
    },
    {
      path: '/sub1_2',
      name: 'sub1_2',
      component: () => import('../views/sub1_2.vue'),
    },
  ],
})

export default router
