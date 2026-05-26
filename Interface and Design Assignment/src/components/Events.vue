<template>
  <div class="container py-5">
    <h2 class="fw-bold mb-1">Events & Tournaments</h2>
    <p class="text-muted mb-4">Upcoming TCG events, tournaments, and community meetups.</p>

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

    <TransitionGroup name="event-list" tag="div" class="row g-4">
      <div v-for="event in filteredEvents" :key="event.id" class="col-12 col-md-6 col-lg-4">
        <div class="card h-100 shadow-sm event-card" @click="openEvent(event)">
          <img :src="event.image" :alt="event.title" class="card-img-top event-img" />
          <div class="card-body">
            <span class="badge mb-2" :class="categoryBadge(event.category)">{{ event.category }}</span>
            <h5 class="card-title">{{ event.title }}</h5>
            <p class="card-text text-muted small">{{ event.excerpt }}</p>
          </div>
          <div class="card-footer d-flex justify-content-between align-items-center">
            <small class="text-muted"><span class="fw-medium">Starts</span> {{ event.date }}</small>
            <small class="text-muted">{{ event.location }}</small>
          </div>
        </div>
      </div>
    </TransitionGroup>

    <div v-if="selectedEvent" class="modal-overlay" @click.self="selectedEvent = null">
      <div class="modal-box">
        <button class="btn-close float-end" @click="selectedEvent = null"></button>
        <img :src="selectedEvent.image" :alt="selectedEvent.title" class="modal-img mb-3" />
        <span class="badge mb-2" :class="categoryBadge(selectedEvent.category)">{{ selectedEvent.category }}</span>
        <h3 class="fw-bold">{{ selectedEvent.title }}</h3>
        <p class="text-muted small mb-2">
          <span class="fw-medium">Starts</span> {{ selectedEvent.date }} &middot;
          <span class="fw-medium">Published</span> {{ selectedEvent.published }} &middot;
          {{ selectedEvent.location }}
        </p>
        <div class="event-content">{{ selectedEvent.content }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { events } from '../data/events'

const activeCategory = ref('All')
const selectedEvent = ref(null)

const categories = computed(() => ['All', ...new Set(events.map(e => e.category))])

const filteredEvents = computed(() =>
  activeCategory.value === 'All'
    ? events
    : events.filter(e => e.category === activeCategory.value)
)

function openEvent(event) {
  selectedEvent.value = event
}

function categoryBadge(cat) {
  return {
    'bg-primary':    cat === 'Tournament',
    'bg-success':    cat === 'Meetup',
    'bg-warning text-dark':  cat === 'Workshop',
    'bg-info text-dark':     cat === 'Online',
  }
}
</script>

<style scoped>
.event-card { cursor: pointer; transition: transform 0.2s, box-shadow 0.2s; }
.event-card:hover { transform: translateY(-4px); box-shadow: 0 8px 24px rgba(0,0,0,0.12) !important; }
.event-img { height: 180px; object-fit: cover; }

.event-list-enter-active { transition: all 0.3s ease; }
.event-list-leave-active { transition: all 0.2s ease; }
.event-list-enter-from   { opacity: 0; transform: translateY(12px); }
.event-list-leave-to     { opacity: 0; }

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
.event-content { white-space: pre-line; font-size: 0.95rem; line-height: 1.7; color: #444; }
</style>
