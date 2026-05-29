<script setup lang="ts">
import logo from '@/assets/header-logo.png'
import { globals } from '@/composables/globals'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import {ref, watch} from 'vue'
import NewsCardView from '@/views/NewsCardView.vue'

const auth = useAuthStore()
const router = useRouter()

const query = ref('')
const results = ref<{name: string; route: string}[]>([])

const pages = [
  { name: 'Home', route: '/' },
  { name: 'Catalogue', route: '/catalogue' },
  { name: 'Events', route: '/events' },
  { name: 'About', route: '/about' },
  { name: 'Guides', route: '/guides' },
  { name: 'Contact', route: '/contact' },
  { name: 'FAQ', route: '/faq' },
  { name: 'News', route: '/news' },
  { name: 'Deck Builder', route: '/deckbuilder' },
]

function search(val: string) {
  const q = val.toLowerCase()
  results.value = pages.filter(p => p.name.toLowerCase().includes(q))
}

function goTo(route: string) {
  router.push(route)
  query.value = ''
  results.value = []
}

watch(query, (newVal) => {
  if (newVal.trim().length < 2) {
    results.value = []
    return
  }
  search(newVal)
})

function handleLogout() {
  auth.logout()
  router.push('/')
}

function handleSearch() {
  if (query.value.trim().length === 0) return
  router.push({path: '/catalogue', query: {search: query.value}})
  query.value = ''
  results.value =[]
}
</script>

<template>
  <div class="container">
    <div class="row align-items-center g-3">
      <!-- Logo -->
      <div class="col-12 col-md-4 d-flex align-items-center gap-2">
        <img :src="logo" alt="Logo" style="width: 100px;" />
        <h1 class="m-0">{{ globals.websiteName }}</h1>
      </div>

      <!-- Navigation -->
      <div class="col-12 col-md-4">
        <ul class="nav justify-content-center justify-content-md-start gap-3">
          <li class="nav-item"><router-link class="nav-link p-0" to="/">Home</router-link></li>
          <li class="nav-item"><router-link class="nav-link p-0" to="/catalogue">Catalogue</router-link></li>
          <li class="nav-item"><router-link class="nav-link p-0" to="/events">Events</router-link></li>
          <li class="nav-item"><router-link class="nav-link p-0" to="/guides">Guides</router-link></li>
          <!-- Show Dashboard when logged in, Login/Register when not -->
          <li v-if="auth.isLoggedIn" class="nav-item">
            <router-link class="nav-link p-0" to="/dashboard">👤 {{ auth.user?.username }}</router-link>
          </li>
          <template v-else>
            <li class="nav-item"><router-link class="nav-link p-0" to="/login">Login</router-link></li>
            <li class="nav-item"><router-link class="nav-link p-0" to="/register">Register</router-link></li>
          </template>
          <li v-if="auth.isLoggedIn" class="nav-item">
            <a class="nav-link p-0 text-danger" style="cursor:pointer" @click="handleLogout">Logout</a>
          </li>
        </ul>
      </div>

      <!-- Search bar -->
      <div class="col-12 col-md-4 position-relative">
        <div class="d-flex gap-2 justify-content-md-end">
          <input type="text" class="form-control" placeholder="Search..." v-model="query" @keyup.enter="handleSearch"/>
          <button class="btn btn-primary" @click="handleSearch">Search</button>
        </div>
        <ul v-if="results.length" class="search-dropdown" >
          <li v-for="result in results" :key="result.route" @click="goTo(result.route)">
            {{ result.name }}
          </li>
        </ul>
      </div>
      
    </div>
  </div>
</template>

<style>
.search-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 2px;
  list-style: none;
  padding: 0.5rem 0;
  margin: 0;
  width: calc(100% - 90px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  z-index: 1000;

}
.search-dropdown li {
  padding: 0.5rem 1rem;
  cursor: pointer;
}
.search-dropdown li:hover {
  background: #f7f8fa
}
</style>