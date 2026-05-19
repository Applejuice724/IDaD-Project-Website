<script setup lang="ts">
import logo from '@/assets/header-logo.png'
import { globals } from '@/composables/globals'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()

function handleLogout() {
  auth.logout()
  router.push('/')
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
          <li class="nav-item"><router-link class="nav-link p-0" to="/about">About</router-link></li>
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
      <div class="col-12 col-md-4">
        <div class="d-flex gap-2 justify-content-md-end">
          <input type="text" class="form-control" placeholder="Search..." />
          <button class="btn btn-primary">Search</button>
        </div>
      </div>
    </div>
  </div>
</template>
