<template>
  <div class="container py-4">
    <h2 class="fw-bold mb-4">Card Catalogue</h2>

    <!-- Search & Filters -->
    <div class="row g-2 mb-4">
      <div class="col-12 col-md-5">
        <input v-model="search" type="text" class="form-control" placeholder="Search cards..." />
      </div>
      <div class="col-6 col-md-2">
        <select v-model="filterGame" class="form-select">
          <option value="">All Games</option>
          <option v-for="g in games" :key="g" :value="g">{{ g }}</option>
        </select>
      </div>
      <div class="col-6 col-md-2">
        <select v-model="filterType" class="form-select">
          <option value="">All Types</option>
          <option v-for="t in types" :key="t" :value="t">{{ t }}</option>
        </select>
      </div>
      <div class="col-6 col-md-1">
        <select v-model="sortBy" class="form-select">
          <option value="name">Name A–Z</option>
          <option value="name_desc">Name Z–A</option>
          <option value="popularity">Most Popular</option>
          <option value="newest">Newest</option>
        </select>
      </div>
      <div class="col-12 col-md-2 text-muted small d-flex align-items-center">
        {{ filteredCards.length }} cards found
      </div>
    </div>

    <!-- HD FEATURE: TransitionGroup animates cards when filter changes -->
    <TransitionGroup name="card-list" tag="div" class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3">
      <div v-for="card in paginatedCards" :key="card.id" class="col">
        <div class="card h-100 shadow-sm card-hover" @click="goToCard(card)">
          <img :src="card.image" :alt="card.name" class="card-img-top card-img-fixed"
               @error="handleImgError" />
          <div class="card-body">
            <h6 class="card-title mb-1">{{ card.name }}</h6>
            <small class="text-muted d-block">{{ card.type }} — {{ card.stats?.race || '' }}</small>
            <small class="text-muted d-block">{{ card.description?.slice(0, 60) }}...</small>
          </div>
          <div class="card-footer d-flex justify-content-between align-items-center">
            <small class="text-muted">ATK: {{ card.stats?.atk ?? '—' }}</small>
            <span class="badge bg-primary">{{ card.stats?.attribute || '' }}</span>
          </div>
        </div>
      </div>
    </TransitionGroup>

    <!-- Empty state -->
    <div v-if="filteredCards.length === 0" class="text-center py-5 text-muted">
      <p class="fs-5">No cards found for "{{ search }}"</p>
      <button class="btn btn-outline-primary" @click="search = ''; filterType = ''; filterGame = ''">Clear filters</button>
    </div>

    <!-- Pagination -->
    <nav v-if="totalPages > 1" class="mt-4 d-flex justify-content-center">
      <ul class="pagination">
        <li class="page-item" :class="{ disabled: currentPage === 1 }">
          <button class="page-link" @click="goToPage(currentPage - 1)">‹ Prev</button>
        </li>
        <li v-for="p in totalPages" :key="p" class="page-item" :class="{ active: p === currentPage }">
          <button class="page-link" @click="goToPage(p)">{{ p }}</button>
        </li>
        <li class="page-item" :class="{ disabled: currentPage === totalPages }">
          <button class="page-link" @click="goToPage(currentPage + 1)">Next ›</button>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { cards } from '../data/cards'

const router = useRouter()
const route = useRoute()
const search = ref('')
const filterGame = ref('')
const filterType = ref('')
const sortBy = ref('name')
const currentPage = ref(1)
const perPage = 8

// Sync game query param from homepage carousel clicks
watch(() => route.query.game, (game) => {
  if (game) filterGame.value = game
}, { immediate: true })

// All unique values for filter dropdowns
const games = computed(() => [...new Set(cards.map(c => c.game))])
const types = computed(() => [...new Set(cards.map(c => c.type))])

// Filtered + sorted cards using computed property (key Vue feature)
const filteredCards = computed(() => {
  let result = cards.filter(card => {
    const matchSearch = card.name.toLowerCase().includes(search.value.toLowerCase()) ||
                        card.description?.toLowerCase().includes(search.value.toLowerCase())
    const matchGame = filterGame.value === '' || card.game === filterGame.value
    const matchType = filterType.value === '' || card.type === filterType.value
    return matchSearch && matchGame && matchType
  })

  if (sortBy.value === 'name')        result = [...result].sort((a,b) => a.name.localeCompare(b.name))
  if (sortBy.value === 'name_desc')   result = [...result].sort((a,b) => b.name.localeCompare(a.name))
  if (sortBy.value === 'popularity')  result = [...result].sort((a,b) => (b.metadata?.popularity||0) - (a.metadata?.popularity||0))
  if (sortBy.value === 'newest')      result = [...result].sort((a,b) => new Date(b.metadata?.dateAdded) - new Date(a.metadata?.dateAdded))

  currentPage.value = 1
  return result
})

// Pagination computed
const totalPages = computed(() => Math.ceil(filteredCards.value.length / perPage))
const paginatedCards = computed(() => {
  const start = (currentPage.value - 1) * perPage
  return filteredCards.value.slice(start, start + perPage)
})

function goToPage(p) {
  if (p < 1 || p > totalPages.value) return
  currentPage.value = p
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function goToCard(card) {
  router.push({ name: 'CardDetail', params: { id: card.id } })
}

function handleImgError(e) {
  e.target.src = '/src/assets/image-not-found.jpg'
}
</script>

<style scoped>
.card-img-fixed { height: 200px; object-fit: contain; padding: 8px; background: #f8f9fa; }
.card-hover { cursor: pointer; transition: transform 0.2s, box-shadow 0.2s; }
.card-hover:hover { transform: translateY(-4px); box-shadow: 0 8px 24px rgba(0,0,0,0.12) !important; }

/* HD FEATURE: TransitionGroup animations */
.card-list-enter-active { transition: all 0.35s ease; }
.card-list-leave-active { transition: all 0.25s ease; position: absolute; }
.card-list-enter-from   { opacity: 0; transform: translateY(16px) scale(0.97); }
.card-list-leave-to     { opacity: 0; transform: scale(0.95); }
.card-list-move         { transition: transform 0.35s ease; }
</style>
