import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import BoardView from '@/views/BoardView.vue'
import Login from '@/authenticate/Login.vue'
import SignUp from '@/authenticate/SignUp.vue'
import TicketForm from '@/components/flow/TicketForm.vue'
import Sprint from '@/components/flow/Sprint.vue'
import NotFound from '@/views/NotFound.vue'
import ProjectsView from '@/views/projects/ProjectsView.vue'
import ProjectById from '@/views/projects/ProjectById.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUp,
    },
    {
      path: '/sprint',
      name: 'sprint',
      component: Sprint,
    },
    {
      path: '/board',
      name: 'board',
      component: BoardView,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFound
    },
    {
      path: '/projects',
      name: 'projects',
      component: ProjectsView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/project/:projectId',
      name: 'project',
      component: ProjectById,
      meta: {
        requiresAuth: true
      }
    }
  ],
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = () => {
    const auth = localStorage.getItem('auth');
    const token = auth ? JSON.parse(auth).token : null;

    return token ? true : false;
  };
  if (to.meta.requiresAuth && !isAuthenticated()) {
    next({ name: 'login' }); // Redirect to login page if not authenticated
  } else {
    next(); // Proceed to the route
  }
});

export default router
