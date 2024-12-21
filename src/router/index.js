import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import BoardView from '@/views/BoardView.vue'
import Login from '@/authenticate/Login.vue'
import SignUp from '@/authenticate/SignUp.vue'
import TicketForm from '@/components/flow/TicketForm.vue'
import Sprint from '@/components/flow/Sprint.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
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
      path: '/ticketform',
      name: 'ticketform',
      component: TicketForm,
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
    }
  ],
})

export default router
