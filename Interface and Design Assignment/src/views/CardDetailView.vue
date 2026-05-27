<template>
  <div class="container py-5">
    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border text-primary"></div>
    </div>
    <div v-else-if="error" class="alert alert-danger">
      {{ error }} — <router-link :to="{ name: 'Catalogue' }">Back to catalogue</router-link>
    </div>
    <template v-else-if="card">
      <button class="btn btn-outline-secondary btn-sm mb-4" @click="$router.back()">← Back</button>
      <div class="row g-5">
        <div class="col-12 col-md-4 d-flex flex-column align-items-center gap-3">
          <!-- HD FEATURE: 3D Card Flip using Vue reactive state -->
          <div class="card-flip-scene" @click="flipped = !flipped">
            <div class="card-flip-inner" :class="{ flipped }">
              <div class="card-flip-face front">
                <img v-if="card.image_url" :src="card.image_url" :alt="card.name" class="flip-img" />
                <div v-else class="flip-placeholder">🃏</div>
              </div>
              <div class="card-flip-face back">
                <div class="back-content">
                  <h5>{{ card.name }}</h5>
                  <hr style="border-color:rgba(255,255,255,0.3)" />
                  <p v-if="card.hp"><strong>HP:</strong> {{ card.hp }}</p>
                  <p v-if="card.attack"><strong>ATK:</strong> {{ card.attack }}</p>
                  <p><strong>Type:</strong> {{ card.card_type || '—' }}</p>
                  <p><strong>Rarity:</strong> {{ card.rarity || '—' }}</p>
                </div>
              </div>
            </div>
          </div>
          <small class="text-muted">Click card to flip</small>
        </div>
        <div class="col-12 col-md-8">
          <span class="badge bg-primary mb-2">{{ card.category_name }}</span>
          <h1 class="fw-bold mb-1">{{ card.name }}</h1>
          <p class="text-muted mb-3">Added by <strong>{{ card.creator || 'Unknown' }}</strong></p>
          <p class="mb-4">{{ card.description }}</p>
          <div class="d-flex gap-2 flex-wrap mb-4">
            <span v-if="card.rarity" class="badge-chip">✦ {{ card.rarity }}</span>
            <span v-if="card.card_type" class="badge-chip">⚡ {{ card.card_type }}</span>
            <span v-if="card.hp" class="badge-chip">❤️ HP {{ card.hp }}</span>
            <span v-if="card.attack" class="badge-chip">⚔️ ATK {{ card.attack }}</span>
          </div>
          <div class="d-flex gap-2 mb-5 flex-wrap">
            <button v-if="auth.isLoggedIn" class="btn btn-like" :class="{ liked: card.liked }" @click="handleLike">
              {{ card.liked ? '❤️' : '🤍' }} {{ card.like_count || 0 }} Likes
            </button>
            <span v-else class="text-muted small align-self-center">
              <router-link :to="{ name: 'Login' }">Log in</router-link> to like
            </span>
            <!-- <button v-if="auth.isLoggedIn" class="btn btn-outline-secondary" @click="handleSave">
              {{ saved ? '📂 Saved' : '+ Save' }}
            </button> -->
            <template v-if="auth.isLoggedIn && auth.user?.id === card.created_by">
              <router-link class="btn btn-outline-primary" :to="{ name: 'Catalogue' }">✏️ Edit</router-link>
              <button class="btn btn-outline-danger" @click="handleDelete">🗑 Delete</button>
            </template>
          </div>
          <h4 class="fw-bold mb-3">Comments ({{ card.comments?.length || 0 }})</h4>
          <div v-if="auth.isLoggedIn" class="mb-4">
            <textarea v-model="newComment" class="form-control mb-2" rows="2"
              placeholder="Share your thoughts..." maxlength="500"></textarea>
            <button class="btn btn-primary btn-sm" @click="submitComment" :disabled="!newComment.trim()">
              Post Comment
            </button>
          </div>
          <p v-else class="text-muted small mb-4">
            <router-link :to="{ name: 'Login' }">Log in</router-link> to comment.
          </p>
          <!-- HD FEATURE: TransitionGroup animates comments in/out -->
          <TransitionGroup name="comment-list" tag="div">
            <div v-for="comment in card.comments" :key="comment.id" class="comment-item">
              <div class="d-flex justify-content-between">
                <div>
                  <strong>{{ comment.username }}</strong>
                  <span class="text-muted small ms-2">{{ formatDate(comment.created_at) }}</span>
                </div>
                <button v-if="auth.isLoggedIn && auth.user?.id === comment.user_id"
                  class="btn btn-link btn-sm text-danger p-0" @click="removeComment(comment.id)">✕</button>
              </div>
              <p class="mb-0 mt-1">{{ comment.content }}</p>
            </div>
          </TransitionGroup>
          <p v-if="!card.comments?.length" class="text-muted fst-italic">No comments yet!</p>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { getCard, toggleLike, postComment, deleteComment, deleteCard, toggleCollection, getCardInteractions } from '../api'
import { cards } from '../data/cards'

const route = useRoute()
const router = useRouter()
const auth = useAuthStore()
const card = ref(null)
const loading = ref(true)
const error = ref(null)
const flipped = ref(false)
const newComment = ref('')
const saved = ref(false)

async function fetchCard() {
  try {
    const { data } = await getCard(route.params.id)
    card.value = data
  } catch {
    // Fallback to local data if Supabase fails 
    // // we are only using local cards now
    const localCard = cards.find(c => String(c.id) === String(route.params.id))
    if (localCard) {
      card.value = {
        ...localCard,
        image_url: localCard.image,
        card_type: localCard.type,
        attack: localCard.atk,
        comments: [],
        like_count: localCard.popularity || 0,
        liked: false
      }
      // I know it's inefficient but don't worry
      const interactions = await getCardInteractions(localCard.id)
      console.log('Card interactions:', interactions)
      card.value.comments = interactions.comments;
      card.value.like_count = interactions.likeCount;
      console.log(interactions.comments)
      console.log(card.value.comments);
      console.log("NEXT")
    } else {
      error.value = 'Card not found.'
    }
  }
  finally { loading.value = false }
}
async function handleLike() {
  const { data } = await toggleLike(card.value.id)
  card.value.liked = data.liked
  card.value.like_count += data.liked ? 1 : -1
}
async function submitComment() {
  if (!newComment.value.trim()) return
  await auth.init()
  if (!auth.isLoggedIn) {
    router.push({ name: 'Login' })
    return
  }
  
  const { data } = await postComment(card.value.id, auth.user.id, newComment.value)
  const username = await auth.username() || 'Unknown';
  const commentData = {id: data.id, content: newComment.value, created_at: data.created_at, username: username}
  console.log(commentData);
  card.value.comments.unshift(commentData)
  newComment.value = ''
}
async function removeComment(commentId) {
  await deleteComment(card.value.id, commentId)
  card.value.comments = card.value.comments.filter(c => c.id !== commentId)
}
async function handleDelete() {
  if (!confirm('Delete this card?')) return
  await deleteCard(card.value.id)
  router.push({ name: 'Catalogue' })
}
async function handleSave() {
  const { data } = await toggleCollection(card.value.id)
  saved.value = data.saved
}
function formatDate(d) {
  return new Date(d).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' })
}
onMounted(fetchCard)
</script>

<style scoped>
.card-flip-scene { width: 240px; height: 340px; perspective: 1000px; cursor: pointer; }
.card-flip-inner { width: 100%; height: 100%; position: relative; transform-style: preserve-3d; transition: transform 0.65s cubic-bezier(0.4,0,0.2,1); }
.card-flip-inner.flipped { transform: rotateY(180deg); }
.card-flip-face { position: absolute; width: 100%; height: 100%; backface-visibility: hidden; border-radius: 14px; overflow: hidden; box-shadow: 0 8px 32px rgba(0,0,0,0.18); }
.front { background: #f7f8fa; display: flex; align-items: center; justify-content: center; }
.back { background: linear-gradient(135deg, #6c63ff, #8b5cf6); transform: rotateY(180deg); color: #fff; display: flex; align-items: center; justify-content: center; }
.flip-img { width: 100%; height: 100%; object-fit: contain; padding: 12px; }
.flip-placeholder { font-size: 5rem; }
.back-content { padding: 1.5rem; width: 100%; }
.back-content p { margin-bottom: 6px; font-size: 0.9rem; opacity: 0.9; }
.badge-chip { background: #f0f2f5; padding: 5px 12px; border-radius: 20px; font-size: 0.85rem; font-weight: 500; }
.btn-like { border: 2px solid #e2e8f0; background: #fff; font-weight: 600; }
.btn-like.liked { border-color: #fc8181; background: #fff5f5; color: #e53e3e; }
.comment-item { padding: 0.75rem 1rem; background: #f7f8fa; border-radius: 8px; margin-bottom: 0.75rem; }
.comment-list-enter-active { transition: all 0.3s ease; }
.comment-list-leave-active { transition: all 0.2s ease; }
.comment-list-enter-from { opacity: 0; transform: translateY(-8px); }
.comment-list-leave-to { opacity: 0; transform: translateX(10px); }
</style>
