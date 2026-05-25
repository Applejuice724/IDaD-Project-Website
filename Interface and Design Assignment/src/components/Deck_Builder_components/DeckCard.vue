<script setup>
defineProps({
  entry: {
    type: Object,
    required: true
  }
})

defineEmits([
  'remove'
])
</script>

<template>

  <div class="deck-card">

    <img
      :src="entry.card.image"
      :alt="entry.card.name"
    />
    <div class="card-info">

      <span class="card-name">
        {{ entry.card.name }}
      </span>

      <span class="card-qty">
        x{{ entry.quantity }}
      </span>

    </div>

    <button @click="$emit('remove')">
      &times;
    </button>

  </div>

</template>

<style scoped>
.deck-card {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.35rem 0.5rem;
  border: 1px solid #eee;
  border-radius: 6px;
  background: #fff;
}

.deck-card img {
  width: 32px;
  height: 48px;
  object-fit: cover;
  border-radius: 3px;
}

.card-info {
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
}

.card-qty {
  color: #888;
  white-space: nowrap;
}

.deck-card button {
  padding: 0.15rem 0.5rem;
  font-size: 0.85rem;
  cursor: pointer;
}
</style>