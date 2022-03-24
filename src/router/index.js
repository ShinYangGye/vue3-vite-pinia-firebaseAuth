import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '../store/user';
import HomeView from '../views/Home.vue'

const requiredAuth = async (to, from, next) => {
  const userStore = useUserStore();
  userStore.loadingSession = true;
  const user =  await userStore.currentUser();
  if(user) {
    next();
  } else {
    next('/login');
  }
  userStore.loadingSession = false;
};

const routes = [
  {
    path: '/',
    name: 'home',
    beforeEnter: requiredAuth,
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/Register.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

