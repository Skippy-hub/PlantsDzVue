import { createRouter, createWebHistory, RouteLocationNormalized, NavigationGuardNext } from 'vue-router'
import Home from '../views/Home.vue'
import { useAutorisation } from '../stores/useAutorisation';

async function requireAuth(to: RouteLocationNormalized, from: RouteLocationNormalized): Promise<boolean> {
  const Autoris = useAutorisation();
  
  if (to.meta.requiresAuth === false) {
      return true;
  }

  if (!Autoris.isAuthenticated) {
      return false;
  }

  return true;
}

const router = createRouter({
  // history: createWebHistory(import.meta.env.BASE_URL),
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        requiresAuth: false,
      }
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/About.vue'),
      meta: {
        requiresAuth: false,
      }
    },
    {
      path: '/shop',
      name: 'shop',
      component: () => import('../views/Shop.vue'),
      meta: {
        requiresAuth: false,
      }
    },
    {
      path: '/shop/:id',
      name: 'card',
      component: () => import('../views/ShopCard.vue'),
      meta: {
        requiresAuth: false,
      }
    },
    {
      path: '/shop/shoping-cart',
      name: 'cart',
      component: () => import('../views/ShopingCart.vue'),
      meta: {
        requiresAuth: false,
      }
    },
    {
      path: '/favourite',
      name: 'favourite',
      component: () => import('../views/FavouriteCards.vue'),
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/autorisation/sign-in',
      name: 'sign-in',
      component: () => import('../views/SignIn.vue'),
      meta: {
        requiresAuth: false,
      }
    },
    {
      path: '/autorisation/sign-up',
      name: 'sign-up',
      component: () => import('../views/SignUp.vue'),
      meta: {
        requiresAuth: false,
      }
    },
  ],
})

router.beforeEach(async (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  const Autoris = useAutorisation();

  if (to.path === '/autorisation/sign-in' || to.path === '/autorisation/sign-up') {
    if (Autoris.isAuthenticated) {
        next('/');
        return;
    }
    next();
    return;
  }
  
  const isAuthPassed = await requireAuth(to, from);
  if (isAuthPassed) {
    next();
  } else {
    next('/autorisation/sign-in');
  }
});

export default router
