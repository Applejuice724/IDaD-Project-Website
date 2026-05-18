<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { articles } from '../../data/articles.js'

const route = useRoute()
const router = useRouter()

const article = computed(() => {
  return articles.find(a => a.id === Number(route.params.id))
})

const goBack = () => {
  router.push('/events')
}
</script>

<template>
  <div class="detail-page" v-if="article">
    <button class="back-btn" @click="goBack">&larr; Back to Events</button>

    <div class="detail-card">
      <img :src="article.image" :alt="article.title" class="detail-image" />

      <div class="detail-body">
        <div class="detail-meta">
          <span class="detail-category">{{ article.category }}</span>
          <span class="detail-date">{{ article.date }}</span>
        </div>

        <h1 class="detail-title">{{ article.title }}</h1>
        <p class="detail-author">By {{ article.author }}</p>

        <div class="detail-content">{{ article.content }}</div>
      </div>
    </div>
  </div>

  <div class="detail-page detail-page--empty" v-else>
    <p>Article not found.</p>
    <button class="back-btn" @click="goBack">&larr; Back to Events</button>
  </div>
</template>

<style scoped>
.detail-page {
  min-height: 100vh;
  padding: 32px;
  color: white;
}

.detail-page--empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
}

.back-btn {
  background: #1e293b;
  color: #94a3b8;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  margin-bottom: 24px;
  transition: background 0.2s;
}

.back-btn:hover {
  background: #334155;
  color: white;
}

.detail-card {
  max-width: 800px;
  margin: 0 auto;
  background: #1e293b;
  border-radius: 16px;
  overflow: hidden;
}

.detail-image {
  width: 100%;
  height: 400px;
  object-fit: cover;
  display: block;
}

.detail-body {
  padding: 32px;
  text-align: left;
}

.detail-meta {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 12px;
}

.detail-category {
  font-size: 12px;
  color: #94a3b8;
  background: #334155;
  padding: 4px 12px;
  border-radius: 20px;
}

.detail-date {
  font-size: 13px;
  color: #64748b;
}

.detail-title {
  margin: 0 0 8px;
  font-size: 32px;
  color: #f1f5f9;
}

.detail-author {
  margin: 0 0 24px;
  font-size: 14px;
  color: #64748b;
}

.detail-content {
  font-size: 16px;
  line-height: 1.8;
  color: #cbd5e1;
  white-space: pre-line;
}
</style>
