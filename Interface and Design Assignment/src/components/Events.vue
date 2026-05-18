<script setup>
import { ref, computed } from 'vue'
import ArticleCard from './Event_Components/EventCard.vue'
import { articles as allArticles } from '../data/articles.js'

const search = ref('')
const selectedCategory = ref('All')

const categories = [
  'All',
  'News',
  'Guides',
  'Deck Tech',
  'Community'
]

const articles = ref(allArticles)

const filteredArticles = computed(() => {
  return articles.value.filter(article => {
    const matchesSearch =
      article.title.toLowerCase().includes(search.value.toLowerCase())

    const matchesCategory =
      selectedCategory.value === 'All' ||
      article.category === selectedCategory.value

    return matchesSearch && matchesCategory
  })
})
</script>

<template>
  <div class="article-search">

    <!-- Search Header -->
    <div class="search-header">
      <input
        v-model="search"
        type="text"
        placeholder="Search articles..."
        class="search-input"
      />

      <select v-model="selectedCategory" class="category-select">
        <option
          v-for="category in categories"
          :key="category"
          :value="category"
        >
          {{ category }}
        </option>
      </select>
    </div>

    <!-- Results -->
    <div class="results-grid">
      <ArticleCard
        v-for="article in filteredArticles"
        :key="article.id"
        :article="article"
      />
    </div>

  </div>
</template>

<style scoped>
.article-search {
  min-height: 100vh;
  padding: 32px;
}

.search-header {
  display: flex;
  gap: 16px;
  margin-bottom: 28px;
}

.search-input {
  flex: 1;
  padding: 14px 18px;
  border: none;
  border-radius: 10px;
  font-size: 15px;
}

.category-select {
  width: 180px;
  padding: 14px;
  border: none;
  border-radius: 10px;
}

.results-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 22px;
}

@media (max-width: 700px) {
  .search-header {
    flex-direction: column;
  }

  .category-select {
    width: 100%;
  }
}
</style>