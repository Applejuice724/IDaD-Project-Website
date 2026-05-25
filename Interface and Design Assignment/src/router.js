import { createRouter, createWebHistory } from 'vue-router'
import Home from './components/Home.vue'
import Catalogue from './components/Catalogue.vue'
import About from './components/About.vue'
import Contact from './components/Contact.vue'
import events from './components/Events.vue'
import EventDetail from './components/Event_Components/EventDetail.vue'
import DeckBuilder from './components/DeckBuilder.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/Catalogue', name: 'Catalogue', component: Catalogue },
  { path: '/about', name: 'About', component: About },
  { path: '/contact', name: 'Contact', component: Contact },
  { path: '/events', name: 'events', component: events },
  { path: '/events/:id', name: 'event-detail', component: EventDetail },
  { path: '/deckbuilder', name: 'deck-builder', component: DeckBuilder }


]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router