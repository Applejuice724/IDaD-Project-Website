import { createRouter, createWebHistory } from 'vue-router'
import Home from './components/Home.vue'
import Shop from './components/Shop.vue'
import About from './components/About.vue'
import Contact from './components/Contact.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/shop', name: 'Shop', component: Shop },
  { path: '/about', name: 'About', component: About },
  { path: '/contact', name: 'Contact', component: Contact },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router