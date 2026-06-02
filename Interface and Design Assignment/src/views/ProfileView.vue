<template>
  <div class="container py-5">
    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border text-primary"></div>
    </div>
    <template v-else-if="profile">
      <div class="profile-header mb-5">
        <div class="profile-avatar">{{ profile.username?.charAt(0).toUpperCase() }}</div>
        <div>
          <h2 class="fw-bold mb-0">{{ profile.username }}</h2>
          <p class="text-muted mb-1">{{ profile.bio || 'No bio yet.' }}</p>
          
          <small class="text-muted">Member since {{ formatDate(profile.created_at) }}</small>
        </div>
        <router-link
          v-if="auth.isLoggedIn && auth.user?.id === profile.id"
          :to="{ name: 'Dashboard' }"
          class="btn btn-outline-primary btn-sm ms-auto"
        >Edit Profile</router-link>
      </div>
      
      <!-- <h4 class="fw-bold mb-3">Cards Added ({{ cards.length }})</h4>
      <div v-if="cards.length === 0" class="text-muted mb-5">No cards added yet.</div>
      <div v-else class="row row-cols-2 row-cols-md-4 g-3 mb-5">
        <div v-for="card in cards" :key="card.id" class="col">
          <div class="card h-100 shadow-sm card-hover"
               @click="$router.push({ name: 'CardDetail', params: { id: card.id } })">
            <img v-if="card.image_url" :src="card.image_url" :alt="card.name"
                 class="card-img-top" style="height:140px;object-fit:contain;padding:6px" />
            <div class="card-body p-2">
              <p class="mb-0 small fw-bold">{{ card.name }}</p>
            </div>
          </div>
        </div>
      </div> -->

      
      <h4 class="fw-bold mb-3">Collection ({{ collection.length }})</h4>
      <div v-if="collection.length === 0" class="text-muted">Nothing saved yet.</div>
      <div v-else class="row row-cols-2 row-cols-md-4 g-3">
        <div v-for="card in collection" :key="card.id" class="col">
          <div class="card h-100 shadow-sm card-hover"
               @click="$router.push({ name: 'CardDetail', params: { id: card.id } })">
            <img v-if="card.image_url" :src="card.image_url" :alt="card.name"
                 class="card-img-top" style="height:140px;object-fit:contain;padding:6px" />
            <div class="card-body p-2">
              <p class="mb-0 small fw-bold">{{ card.name }}</p>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { getProfile, getUserCards, getUserCollection } from '../api'
import { getCards } from '../composables/cards'

const route = useRoute()
const auth = useAuthStore()
const loading = ref(true)
const profile = ref(null)
const cards = ref([])
const collection = ref([])

async function fetchProfile() {
  try {
    const [
  { data: profileData },
  // { data: cardsData },
  { data: collectionData }
] = await Promise.all([
  getProfile(route.params.id),
  // getUserCards(route.params.id),
  getUserCollection(route.params.id)
])
    profile.value = profileData
    // cards.value = cardsData
    console.log('Profile data:', profileData)
    console.log('Collection data:', collectionData)
    const cardIds = collectionData.map(item => item.item_id);
    console.log(cardIds);
    collection.value = getCards(cardIds);
    console.log(collection.value);
    // collection.value = collectionData
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
}

function formatDate(d) {
  return new Date(d).toLocaleDateString('en-AU', { month: 'long', year: 'numeric' })
}

onMounted(fetchProfile)
</script>

<style scoped>
.profile-header { display: flex; align-items: center; gap: 1.5rem; flex-wrap: wrap; }
.profile-avatar { width: 72px; height: 72px; border-radius: 50%; background: #6c63ff; color: #fff; font-size: 2rem; font-weight: 700; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.card-hover { cursor: pointer; transition: transform 0.2s; }
.card-hover:hover { transform: translateY(-3px); }
</style>
