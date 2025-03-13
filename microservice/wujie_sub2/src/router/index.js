import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/sub2_1',
      name: 'sub2_1',
      component: () => import('../views/sub2_1.vue'),
    },
    {
      path: '/sub2_2',
      name: 'sub2_2',
      component: () => import('../views/sub2_2.vue'),
    },
  ],
})

export default router
