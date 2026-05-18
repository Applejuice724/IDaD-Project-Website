import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'

const API = 'http://localhost:3000/api'

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem('cv_token') || null)
  const user  = ref(JSON.parse(localStorage.getItem('cv_user') || 'null'))
  const isLoggedIn = computed(() => !!token.value)

  async function login(credentials) {
    const { data } = await axios.post(`${API}/auth/login`, credentials)
    token.value = data.token
    user.value  = data.user
    localStorage.setItem('cv_token', data.token)
    localStorage.setItem('cv_user',  JSON.stringify(data.user))
  }

  async function register(credentials) {
    const { data } = await axios.post(`${API}/auth/register`, credentials)
    token.value = data.token
    user.value  = data.user
    localStorage.setItem('cv_token', data.token)
    localStorage.setItem('cv_user',  JSON.stringify(data.user))
  }

  function logout() {
    token.value = null
    user.value  = null
    localStorage.removeItem('cv_token')
    localStorage.removeItem('cv_user')
  }

  return { token, user, isLoggedIn, login, register, logout }
})
