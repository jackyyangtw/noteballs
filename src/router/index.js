import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth.js';
import { getAuth } from 'firebase/auth';


const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'notes',
      component: () => import('../views/NotesView.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/stats',
      name: 'stats',
      component: () => import('../views/StatsView.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/edit/:id',
      name: 'edit',
      component: () => import('../views/EditView.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/auth',
      name: 'auth',
      component: () => import('../views/AuthView.vue'),
      meta: {
        requiresAuth: false
      }
    }
  ]
})


router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  const { user } = authStore;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  if (requiresAuth && !user) {
    next('/auth');
  }
  else if (!requiresAuth && user) {
    next('/');
  }
  else {
    next();
  }
})

export default router
