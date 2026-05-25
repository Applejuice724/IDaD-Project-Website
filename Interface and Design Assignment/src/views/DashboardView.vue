<template>
  <div class="container py-5">
    <div class="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
      <div>
        <h2 class="fw-bold mb-0">My Dashboard</h2>
        <p class="text-muted mb-0">Welcome back, {{ auth.user?.username }} 👋</p>
      </div>
      <router-link :to="{ name: 'Catalogue' }" class="btn btn-primary">+ Add New Card</router-link>
    </div>

    <div class="row g-3 mb-5">
      <div class="col-6 col-md-3">
        <div class="stat-card">
          <div class="stat-num">{{ myCards.length }}</div>
          <div class="stat-label">Cards Added</div>
        </div>
      </div>
      <div class="col-6 col-md-3">
        <div class="stat-card">
          <div class="stat-num">{{ totalLikes }}</div>
          <div class="stat-label">Likes Received</div>
        </div>
      </div>
      <div class="col-6 col-md-3">
        <div class="stat-card">
          <div class="stat-num">{{ collection.length }}</div>
          <div class="stat-label">In Collection</div>
        </div>
      </div>
      <div class="col-6 col-md-3">
        <div class="stat-card">
          <div class="stat-num">{{ totalComments }}</div>
          <div class="stat-label">Comments Made</div>
        </div>
      </div>
    </div>

    <h4 class="fw-bold mb-3">My Cards</h4>
    <div v-if="loading" class="text-center py-4">
      <div class="spinner-border text-primary"></div>
    </div>
    <div v-else-if="myCards.length === 0" class="text-muted">
      You haven't added any cards yet.
    </div>
    <div v-else class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3">
      <div v-for="card in myCards" :key="card.id" class="col">
        <div class="card h-100 shadow-sm card-hover"
             @click="$router.push({ name: 'CardDetail', params: { id: card.id } })">
          <img v-if="card.image_url" :src="card.image_url" :alt="card.name"
               class="card-img-top" style="height:160px;object-fit:contain;padding:8px" />
          <div v-else class="card-img-top d-flex align-items-center justify-content-center"
               style="height:160px;background:#f7f8fa;font-size:2.5rem">🃏</div>
          <div class="card-body">
            <h6 class="card-title mb-1">{{ card.name }}</h6>
            <small class="text-muted">{{ card.rarity }}</small>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-5 pt-4 border-top">
      <button class="btn btn-outline-danger" @click="handleLogout">Log Out</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { getProfile } from '../api'

const auth = useAuthStore()
const router = useRouter()
const loading = ref(true)
const myCards = ref([])
const collection = ref([])

const totalLikes = computed(() => myCards.value.reduce((s, c) => s + (c.like_count || 0), 0))
const totalComments = computed(() => myCards.value.reduce((s, c) => s + (c.comment_count || 0), 0))

async function fetchProfile() {
  try {
    const { data } = await getProfile(auth.user.id)
    myCards.value = data.cards
    collection.value = data.collection
  } catch (e) {
    console.error('Failed to load profile', e)
  } finally {
    loading.value = false
  }
}

function handleLogout() {
  auth.logout()
  router.push({ name: 'Home' })
}

onMounted(fetchProfile)
</script>

<style scoped>
.stat-card { background: #fff; border-radius: 12px; box-shadow: 0 2px 12px rgba(0,0,0,0.06); padding: 1.5rem; text-align: center; }
.stat-num { font-size: 2rem; font-weight: 800; color: #6c63ff; }
.stat-label { color: #718096; font-size: 0.85rem; }
.card-hover { cursor: pointer; transition: transform 0.2s; }
.card-hover:hover { transform: translateY(-3px); }
</style>
