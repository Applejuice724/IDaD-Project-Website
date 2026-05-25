<template>
  <div class="container py-5">
    <h2 class="fw-bold mb-1">Card Playing Guides</h2>
    <p class="text-muted mb-4">Learn strategies, deck building tips and stay up to date with the community.</p>

    <!-- Filter tabs -->
    <div class="d-flex gap-2 flex-wrap mb-4">
      <button
        v-for="cat in categories"
        :key="cat"
        class="btn btn-sm"
        :class="activeCategory === cat ? 'btn-primary' : 'btn-outline-secondary'"
        @click="activeCategory = cat"
      >
        {{ cat }}
      </button>
    </div>

    <!-- Articles grid with TransitionGroup -->
    <TransitionGroup name="guide-list" tag="div" class="row g-4">
      <div v-for="article in filteredArticles" :key="article.id" class="col-12 col-md-6 col-lg-4">
        <div class="card h-100 shadow-sm guide-card" @click="openArticle(article)">
          <img :src="article.image" :alt="article.title" class="card-img-top guide-img" />
          <div class="card-body">
            <span class="badge mb-2" :class="categoryBadge(article.category)">{{ article.category }}</span>
            <h5 class="card-title">{{ article.title }}</h5>
            <p class="card-text text-muted small">{{ article.excerpt }}</p>
          </div>
          <div class="card-footer d-flex justify-content-between align-items-center">
            <small class="text-muted">By {{ article.author }}</small>
            <small class="text-muted">{{ article.date }}</small>
          </div>
        </div>
      </div>
    </TransitionGroup>

    <!-- Article Modal -->
    <div v-if="selectedArticle" class="modal-overlay" @click.self="selectedArticle = null">
      <div class="modal-box">
        <button class="btn-close float-end" @click="selectedArticle = null"></button>
        <img :src="selectedArticle.image" :alt="selectedArticle.title" class="modal-img mb-3" />
        <span class="badge mb-2" :class="categoryBadge(selectedArticle.category)">{{ selectedArticle.category }}</span>
        <h3 class="fw-bold">{{ selectedArticle.title }}</h3>
        <p class="text-muted small mb-3">By {{ selectedArticle.author }} · {{ selectedArticle.date }}</p>
        <div class="article-content">{{ selectedArticle.content }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { articles } from '../data/guides'

const activeCategory = ref('All')
const selectedArticle = ref(null)

const categories = computed(() => ['All', ...new Set(articles.map(a => a.category))])

const filteredArticles = computed(() =>
  activeCategory.value === 'All'
    ? articles
    : articles.filter(a => a.category === activeCategory.value)
)

function openArticle(article) {
  selectedArticle.value = article
}

function categoryBadge(cat) {
  return {
    'bg-primary':   cat === 'Guides',
    'bg-success':   cat === 'News',
    'bg-warning text-dark': cat === 'Deck Tech',
    'bg-info text-dark':    cat === 'Community',
  }
}
</script>

<style scoped>
.guide-card { cursor: pointer; transition: transform 0.2s, box-shadow 0.2s; }
.guide-card:hover { transform: translateY(-4px); box-shadow: 0 8px 24px rgba(0,0,0,0.12) !important; }
.guide-img { height: 180px; object-fit: cover; }

.guide-list-enter-active { transition: all 0.3s ease; }
.guide-list-leave-active { transition: all 0.2s ease; }
.guide-list-enter-from   { opacity: 0; transform: translateY(12px); }
.guide-list-leave-to     { opacity: 0; }

.modal-overlay {
  position: fixed; inset: 0;
  background: rgba(0,0,0,0.6);
  display: flex; align-items: center; justify-content: center;
  z-index: 1000; padding: 1rem;
}
.modal-box {
  background: #fff; border-radius: 12px;
  padding: 2rem; max-width: 680px; width: 100%;
  max-height: 85vh; overflow-y: auto;
}
.modal-img { width: 100%; height: 200px; object-fit: cover; border-radius: 8px; }
.article-content { white-space: pre-line; font-size: 0.95rem; line-height: 1.7; color: #444; }
</style>
