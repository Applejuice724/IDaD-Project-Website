<script setup>
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { get_hottest_cards } from '../../composables/get_hottest_cards.js'

const { hottestCards } = get_hottest_cards()
const searchQuery = ref('')
const router = useRouter()
const currentPage = ref(1)
const perPage = ref(4)
const perPageOptions = [4, 8, 12, 16]

const filteredCards = computed(() => {
    if (!searchQuery.value) return hottestCards.value
    const query = searchQuery.value.toLowerCase()
    return hottestCards.value.filter(card =>
        card.name.toLowerCase().includes(query) ||
        card.type.toLowerCase().includes(query) ||
        (card.stats?.race && card.stats.race.toLowerCase().includes(query)) ||
        (card.stats?.attribute && card.stats.attribute.toLowerCase().includes(query))
    )
})

const totalPages = computed(() => {
    return Math.ceil(filteredCards.value.length / perPage.value)
})

const paginatedCards = computed(() => {
    const start = (currentPage.value - 1) * perPage.value
    const end = start + perPage.value
    return filteredCards.value.slice(start, end)
})

const goToPage = (page) => {
    if (page < 1 || page > totalPages.value) return
    currentPage.value = page
}

const setFallbackImage = (event) => {
    event.target.src = '../../src/assets/image-not-found.jpg'
}

const goToCard = (route) => {
    router.push(route)
}

watch(searchQuery, () => {
    currentPage.value = 1
})

watch(perPage, () => {
    currentPage.value = 1
})
</script>
<template>
  <div class="container mt-4">
    <h1>Hottest popular singles</h1>
    <div class="mb-3 d-flex gap-3  justify-content-end">
      <select class="form-select" v-model="perPage" style="max-width: 150px;">
        <option v-for="option in perPageOptions" :key="option" :value="option">
          {{ option }} per page
        </option>
      </select>
    </div>
    <div class="row g-3">
      <div v-for="card in paginatedCards" :key="card.id" class="col-12 col-sm-6 col-md-4 col-lg-3">
        <div class="card h-100" @click="goToCard(card.route)" style="cursor: pointer;">
          <img :src="card.image" class="card-img-top" :alt="card.name" style="height: 200px; object-fit: cover; " @error="setFallbackImage">
          <div class="card-body">
            <h5 class="card-title">{{ card.name }}</h5>
            <p class="card-text">
              <small class="text-muted">{{ card.type }} - {{ card.stats?.race || '' }}</small>
            </p>
            <p class="card-text">{{ card.description }}</p>
            <ul class="list-unstyled">
              <li><strong>Popularity:</strong> {{ card.metadata?.popularity }}%</li>
            </ul>
          </div>
          <div class="card-footer text-muted">
            Added: {{ card.metadata?.dateAdded }}
          </div>
        </div>
      </div>
    </div>
    <nav v-if="totalPages > 1" class="mt-3">
      <ul class="pagination justify-content-center">
        <li class="page-item" :class="{ disabled: currentPage === 1 }">
          <a class="page-link" href="#" @click.prevent="goToPage(currentPage - 1)">Previous</a>
        </li>
        <li class="page-item" v-for="page in totalPages" :key="page" :class="{ active: currentPage === page }">
          <a class="page-link" href="#" @click.prevent="goToPage(page)">{{ page }}</a>
        </li>
        <li class="page-item" :class="{ disabled: currentPage === totalPages }">
          <a class="page-link" href="#" @click.prevent="goToPage(currentPage + 1)">Next</a>
        </li>
      </ul>
    </nav>
    <p v-if="filteredCards.length === 0" class="text-center mt-3">
      No cards found.
    </p>
  </div>
</template>
