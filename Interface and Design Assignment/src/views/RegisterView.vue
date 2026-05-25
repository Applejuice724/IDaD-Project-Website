<template>
  <div class="auth-page">
    <div class="auth-card">
      <div class="auth-logo">🃏 CardVault</div>
      <h2 class="auth-title">Create an account</h2>
      <p class="auth-sub">Join the trading card community</p>
      <div v-if="error" class="alert alert-danger py-2">{{ error }}</div>
      <form @submit.prevent="handleRegister" novalidate>
        <div class="mb-3">
          <label class="form-label">Username</label>
          <input v-model="form.username" type="text" class="form-control"
            :class="{ 'is-invalid': v.username }" placeholder="Choose a username" />
          <div class="invalid-feedback">{{ v.username }}</div>
        </div>
        <div class="mb-3">
          <label class="form-label">Email address</label>
          <input v-model="form.email" type="email" class="form-control"
            :class="{ 'is-invalid': v.email }" placeholder="you@example.com" />
          <div class="invalid-feedback">{{ v.email }}</div>
        </div>
        <div class="mb-4">
          <label class="form-label">Password</label>
          <input v-model="form.password" type="password" class="form-control"
            :class="{ 'is-invalid': v.password }" placeholder="At least 6 characters" />
          <div class="invalid-feedback">{{ v.password }}</div>
          <div v-if="form.password" class="mt-1">
            <div class="strength-bar">
              <div class="strength-fill" :class="strengthClass" :style="{ width: strengthWidth }"></div>
            </div>
            <small :class="strengthTextClass">{{ strengthLabel }}</small>
          </div>
        </div>
        <button class="btn btn-primary w-100" type="submit" :disabled="loading">
          <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
          {{ loading ? 'Creating account...' : 'Create Account' }}
        </button>
      </form>
      <p class="auth-footer-text">
        Already have an account?
        <router-link :to="{ name: 'Login' }">Log in</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const auth = useAuthStore()
const router = useRouter()
const loading = ref(false)
const error = ref(null)
const form = reactive({ username: '', email: '', password: '' })
const v = reactive({ username: '', email: '', password: '' })

const passwordStrength = computed(() => {
  const p = form.password
  if (!p) return 0
  let score = 0
  if (p.length >= 6) score++
  if (p.length >= 10) score++
  if (/[A-Z]/.test(p)) score++
  if (/[0-9]/.test(p)) score++
  if (/[^A-Za-z0-9]/.test(p)) score++
  return score
})
const strengthClass = computed(() => ['weak','weak','fair','good','strong','strong'][passwordStrength.value])
const strengthWidth = computed(() => `${(passwordStrength.value / 5) * 100}%`)
const strengthLabel = computed(() => ['','Weak','Fair','Good','Strong','Very Strong'][passwordStrength.value])
const strengthTextClass = computed(() => ({
  'text-danger': passwordStrength.value <= 1,
  'text-warning': passwordStrength.value === 2,
  'text-success': passwordStrength.value >= 3,
  'small': true
}))

function validate() {
  v.username = form.username.length >= 3 ? '' : 'Username must be at least 3 characters'
  v.email = /\S+@\S+\.\S+/.test(form.email) ? '' : 'Please enter a valid email'
  v.password = form.password.length >= 6 ? '' : 'Password must be at least 6 characters'
  return !v.username && !v.email && !v.password
}

async function handleRegister() {
  if (!validate()) return
  loading.value = true
  error.value = null
  try {
    await auth.register({ ...form, firstName: form.username, lastName: form.username })
    router.push({ name: 'Dashboard' })
  } catch (e) {
    error.value = e.message || 'Registration failed. Please try again.'
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
.strength-bar { height: 4px; background: #e2e8f0; border-radius: 2px; overflow: hidden; }
.strength-fill { height: 100%; border-radius: 2px; transition: width 0.3s ease; }
.strength-fill.weak { background: #fc8181; }
.strength-fill.fair { background: #f6ad55; }
.strength-fill.good { background: #68d391; }
.strength-fill.strong { background: #48bb78; }
.auth-footer-text { text-align: center; margin-top: 1.25rem; color: #718096; font-size: 0.9rem; }
</style>
