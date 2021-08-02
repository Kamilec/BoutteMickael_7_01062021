import { createWebHistory, createRouter } from 'vue-router';

const routes = [
  {
    name: 'login',
    path: '/',
    component: () => import('../views/Login'),
  },
  {
    name: 'profile',
    path: '/profile',
    component: () => import('../views/Profile'),
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
