<template>
  <div class="auth-page">
    <div class="auth-card">
      <div class="auth-logo">🃏 CardVault</div>
      <h2 class="auth-title">Welcome back</h2>
      <p class="auth-sub">Log in to your account</p>
      <div v-if="error" class="alert alert-danger py-2">{{ error }}</div>
      <form @submit.prevent="handleLogin" novalidate>
        <div class="mb-3">
          <label class="form-label">Email address</label>
          <input v-model="form.email" type="email" class="form-control"
            :class="{ 'is-invalid': v.email }" placeholder="you@example.com" />
          <div class="invalid-feedback">{{ v.email }}</div>
        </div>
        <div class="mb-4">
          <label class="form-label">Password</label>
          <input v-model="form.password" type="password" class="form-control"
            :class="{ 'is-invalid': v.password }" placeholder="Enter your password" />
          <div class="invalid-feedback">{{ v.password }}</div>
        </div>
        <button class="btn btn-primary w-100" type="submit" :disabled="loading">
          <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
          {{ loading ? 'Logging in...' : 'Log In' }}
        </button>
      </form>
      <p class="auth-footer-text">
        Don't have an account?
        <router-link :to="{ name: 'Register' }">Sign up free</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const auth = useAuthStore()
const router = useRouter()
const route = useRoute()
const loading = ref(false)
const error = ref(null)
const form = reactive({ email: '', password: '' })
const v = reactive({ email: '', password: '' })

function validate() {
  v.email = /\S+@\S+\.\S+/.test(form.email) ? '' : 'Please enter a valid email'
  v.password = form.password.length >= 1 ? '' : 'Password is required'
  return !v.email && !v.password
}

async function handleLogin() {
  if (!validate()) return
  loading.value = true
  error.value = null
  try {
    await auth.login(form)
    router.push(route.query.redirect || { name: 'Dashboard' })
  } catch (e) {
    error.value = e.response?.data?.error || 'Invalid email or password'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.auth-page { min-height: 100vh; display: flex; align-items: center; justify-content: center; background: #f0f2f5; padding: 2rem; }
.auth-card { background: #fff; border-radius: 12px; box-shadow: 0 4px 24px rgba(0,0,0,0.08); padding: 2.5rem; width: 100%; max-width: 420px; }
.auth-logo { font-size: 1.5rem; font-weight: 700; color: #6c63ff; margin-bottom: 1.5rem; }
.auth-title { font-size: 1.5rem; font-weight: 700; margin-bottom: 0.25rem; }
.auth-sub { color: #718096; margin-bottom: 1.5rem; }
.auth-footer-text { text-align: center; margin-top: 1.25rem; color: #718096; font-size: 0.9rem; }
</style>
