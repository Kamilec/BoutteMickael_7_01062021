import { createWebHistory, createRouter } from 'vue-router';

const routes = [
  {
    name: 'login',
    path: '/',
    component: () => import('../views/Login'),
  },
  {
    name: 'inscription',
    path: '/inscription',
    component: () => import('../views/Inscription'),
  },
  {
    name: 'profile',
    path: '/profile',
    component: () => import('../views/Profile'),
  },
  {
    name: 'aide',
    path: '/aide',
    component: () => import('../views/Aide'),
  },
  {
    name: 'post',
    path: '/post',
    component: () => import('../views/Post'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});


export default router;