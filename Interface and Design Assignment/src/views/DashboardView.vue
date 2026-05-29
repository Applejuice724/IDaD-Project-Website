<template>
  <div class="container py-5">
    <div class="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
      <div>
        <h2 class="fw-bold mb-0">My Dashboard</h2>
        <p class="text-muted mb-0">Welcome back, {{ profile?.username }} 👋</p>
      </div>
      <router-link :to="{ name: 'Catalogue' }" class="btn btn-primary">+ Add New Card</router-link>
    </div>
    <div>
      <textarea class="form-control mb-3" rows="3" placeholder="" v-model="profile.bio">
      </textarea>
      <button v-if="profile.bio !== lastSavedBio" class="btn btn-success mb-4" @click="saveBio" :disabled="!profileTextAreaActive">Save Changes</button>
    </div>

    <ProfileStats v-if="!loading" :cards="myCards" :collection="collection" />

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
          <img v-if="card.image" :src="card.image" :alt="card.name"
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
import { getProfile, updateProfile, getUserCollection } from '../api'
import { getCards } from '../composables/cards';
import ProfileStats from '@/components/ProfileStats.vue'
const profile = ref(null);
const lastSavedBio = ref('');
const profileTextAreaActive = ref(true);
const auth = useAuthStore()
auth.init();
const router = useRouter()
const loading = ref(true)
const myCards = ref([])
const collection = ref([])

const totalLikes = computed(() => myCards.value.reduce((s, c) => s + (c.like_count || 0), 0))
const totalComments = computed(() => myCards.value.reduce((s, c) => s + (c.comment_count || 0), 0))

async function fetchProfile() {
  try {
    const [{data:profileData}, {data:myCardsData}] = await Promise.all([
      getProfile(auth.user.id),
      getUserCollection(auth.user.id)
    ])
    const ids = myCardsData.map(item => item.item_id);
    console.log(ids);
    console.log('Profile data:', profileData)
    console.log('My cards data:', myCardsData)
    profile.value = profileData;
    myCards.value = getCards(ids);
    console.log('My cards:', myCards.value);
    console.log(myCards.value);
    lastSavedBio.value = profileData.bio;
    console.log('Profile data:', profileData)
    collection.value = []

  } catch (e) {
    console.error('Failed to load profile', e)
  } finally {
    console.log('collection before loading false:', collection.value)
    loading.value = false
  }
}
async function saveBio(){
  profileTextAreaActive.value = false;
  await updateProfile(profile.value.id, { bio: profile.value.bio })
  lastSavedBio.value = profile.value.bio;
  profileTextAreaActive.value = true;
}
function handleLogout() {
  auth.logout()
  router.push({ name: 'Home' })
}

fetchProfile()
</script>

<style scoped>
.stat-card { background: #fff; border-radius: 12px; box-shadow: 0 2px 12px rgba(0,0,0,0.06); padding: 1.5rem; text-align: center; }
.stat-num { font-size: 2rem; font-weight: 800; color: #6c63ff; }
.stat-label { color: #718096; font-size: 0.85rem; }
.card-hover { cursor: pointer; transition: transform 0.2s; }
.card-hover:hover { transform: translateY(-3px); }
</style>
