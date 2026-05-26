<script setup>
import { ref, computed, watch, toRef } from 'vue'

import { useCardSearch }
from '@/composables/Deck_builder/useCardSearch'

import CardGrid from './CardGrid.vue'

import { cards }
from '@/data/cards'

const PAGE_SIZE = 6

const props = defineProps({
  game: {
    type: String,
    required: true
  },
  zones: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits([
  'add-card'
])

const selectedZone = ref('')

const page = ref(1)

function handleAddCard(card) {
  emit('add-card', {
    card,
    zone: selectedZone.value || undefined
  })
}

const {
  search,
  selectedType,
  schema,
  filteredCards
} = useCardSearch(cards, toRef(props, 'game'))

const totalPages = computed(() =>
  Math.max(1, Math.ceil(filteredCards.value.length / PAGE_SIZE))
)

const pagedCards = computed(() => {
  const start = (page.value - 1) * PAGE_SIZE
  return filteredCards.value.slice(start, start + PAGE_SIZE)
})

watch(filteredCards, () => {
  page.value = 1
})

function goToPage(p) {
  page.value = Math.max(1, Math.min(p, totalPages.value))
}
</script>

<template>

  <div class="card-search">

    <div class="card-search-controls">
      <input
        v-model="search"
        placeholder="Search cards..."
      />
      <select v-model="selectedType">
        <option
          v-for="opt in schema.typeOptions"
          :key="opt.value"
          :value="opt.value"
        >
          {{ opt.label }}
        </option>
      </select>
    </div>

    <div class="card-search-zones">
      <select v-model="selectedZone">
        <option value="">Auto</option>
        <option
          v-for="z in zones"
          :key="z.name"
          :value="z.name"
        >
          {{ z.name }}
        </option>
      </select>
    </div>

    <CardGrid
      :cards="pagedCards"
      @add-card="handleAddCard"
    />

    <div class="card-search-pages">
      <button
        :disabled="page <= 1"
        @click="goToPage(page - 1)"
      >
        &laquo;
      </button>
      <span>{{ page }} / {{ totalPages }}</span>
      <button
        :disabled="page >= totalPages"
        @click="goToPage(page + 1)"
      >
        &raquo;
      </button>
    </div>
  </div>

</template>

<style scoped>
.card-search {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  height: 100%;
}

.card-search-controls {
  display: flex;
  gap: 0.5rem;
}

.card-search-controls input,
.card-search-controls select {
  flex: 1;
  padding: 0.35rem 0.5rem;
}

.card-search-zones select {
  width: 100%;
  padding: 0.35rem 0.5rem;
}

.card-search-pages {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding-top: 0.25rem;
}

.card-search-pages button {
  padding: 0.25rem 0.6rem;
  cursor: pointer;
}

.card-search-pages button:disabled {
  opacity: 0.4;
  cursor: default;
}

.card-search-pages span {
  font-size: 0.85rem;
  white-space: nowrap;
}
</style>