import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from './stores/auth'

import Home        from './components/Home.vue'
import About       from './components/About.vue'
import Catalogue   from './components/Catalogue.vue'
import Contact     from './components/Contact.vue'
import Events      from './components/Events.vue'
import EventDetail from './components/Event_Components/EventDetail.vue'
import Faq from  './components/Faq.vue'

import LoginView    from './views/LoginView.vue'
import RegisterView from './views/RegisterView.vue'
import CardDetail   from './views/CardDetailView.vue'
import Dashboard    from './views/DashboardView.vue'
import Profile      from './views/ProfileView.vue'
import Guides       from './views/GuidesView.vue'


const routes = [
  { path: '/',            name: 'Home',         component: Home },
  { path: '/about',       name: 'About',        component: About },
  { path: '/catalogue',   name: 'Catalogue',    component: Catalogue },
  { path: '/contact',     name: 'Contact',      component: Contact },
  { path: '/events',      name: 'Events',       component: Events },
  { path: '/events/:id',  name: 'EventDetail',  component: EventDetail },
  { path: '/guides',      name: 'Guides',       component: Guides },
  { path: '/login',       name: 'Login',        component: LoginView,    meta: { guestOnly: true } },
  { path: '/register',    name: 'Register',     component: RegisterView, meta: { guestOnly: true } },
  { path: '/dashboard',   name: 'Dashboard',    component: Dashboard,    meta: { requiresAuth: true } },
  { path: '/cards/:id',   name: 'CardDetail',   component: CardDetail },
  { path: '/profile/:id', name: 'Profile',      component: Profile },
  {path: '/faq',          name: 'Faq',          component: Faq},
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 })
})

router.beforeEach((to, from, next) => {
  const auth = useAuthStore()
  if (to.meta.requiresAuth && !auth.isLoggedIn) {
    next({ name: 'Login', query: { redirect: to.fullPath } })
  } else if (to.meta.guestOnly && auth.isLoggedIn) {
    next({ name: 'Dashboard' })
  } else {
    next()
  }
})

export default router
