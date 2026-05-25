<script setup>
import DeckCard from './DeckCard.vue'

defineProps({
  zone: {
    type: Object,
    required: true
  }
})

defineEmits([
  'remove-card'
])
</script>

<template>

  <div class="deck-zone">

    <div class="zone-header">

      <h2>
        {{ zone.name }}
      </h2>

      <span class="zone-count">
        {{
          zone.cards.reduce(
            (total, card) =>
              total + card.quantity,
            0
          )
        }}
      </span>
    </div>

    <div class="zone-cards">
      <DeckCard
        v-for="entry in zone.cards"
        :key="entry.card.id"

        :entry="entry"

        @remove="
          $emit(
            'remove-card',
            entry.card.id,
            zone.name
          )
        "
      />
    </div>
  </div>
</template>

<style scoped>
.deck-zone {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 0.75rem;
  background: #fafafa;
}

.zone-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.75rem;
}

.zone-header h2 {
  margin: 0;
  font-size: 1.1rem;
}

.zone-count {
  font-size: 0.9rem;
  color: #666;
}

.zone-cards {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
</style>