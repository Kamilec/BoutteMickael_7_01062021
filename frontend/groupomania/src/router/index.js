import { createWebHistory, createRouter } from 'vue-router';

const routes = [
  {
    name: 'accueil',
    path: '/',
    component: () => import('../views/Accueil'),
  },
  {
    name: 'signup',
    path: '/signup',
    component: () => import('../views/Signup'),
  },
  {
    name: 'allusers',
    path: '/allusers',
    component: () => import('../views/AllUsers'),
  },
  {
    name: 'allcomments',
    path: '/allcomments',
    component: () => import('../views/AllComments'),
  },
  {
    name: 'profile',
    path: '/profile',
    component: () => import('../views/Profile'),
  },
  {
    name: 'logout',
    path: '/logout',
    component: () => import('../views/Logout'),
  },
  {
    name: 'login',
    path: '/login',
    component: () => import('../views/Login'),
  },
  {
    name: 'posted',
    path: '/posted',
    component: () => import('../views/Posted'),
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