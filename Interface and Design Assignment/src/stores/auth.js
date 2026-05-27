import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { supabase } from '../supabase'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const isLoggedIn = computed(() => !!user.value)

  async function init() {
    const { data: { session } } = await supabase.auth.getSession()
    user.value = session?.user || null

    supabase.auth.onAuthStateChange((_event, session) => {
      user.value = session?.user || null
    })
  }

  async function login({ email, password }) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
    user.value = data.user
    console.log(data);
    console.log(user.value);
  }

  async function register({ email, password, username, firstName, lastName }) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username,
          first_name: firstName || username,
          last_name: lastName || ''
        }
      }
    })
    if (error) throw error
    user.value = data.user
  }

  async function logout() {
    await supabase.auth.signOut()
    user.value = null
  }
  async function role(){
    await init();

    if (!user.value) return null;
    const { data, error } = await supabase
      .from('public_users')
      .select('role')
      .eq('id', user.value.id)
      .single()
    if (error) throw error
    return data.role
  }
  async function username(){
    await init();
    if (!user.value) return null;
    const { data, error } = await supabase
      .from('public_users')
      .select('username')
      .eq('id', user.value.id)
      .single()
    if (error) throw error
    return data.username
  }

  return { user, isLoggedIn, login, register, logout, init, role, username }
})
