<script setup>
import DeckZone from './Deck_Builder_components/DeckZone.vue'
import DeckStats from './Deck_Builder_components/DeckStats.vue'
import CardSearch from './Deck_Builder_components/card-search/CardSearch.vue'

import { useDeck } from '@/composables/Deck_builder/useDeck'

const {
  deck,
  totalCards,
  addCard,
  removeCard,
  game,
  setGame
} = useDeck('yugioh')
</script>

<template>

  <div class="deck-builder-container">

    <div class="deck-builder-header">
      <h1>{{ deck.name }}</h1>
      <label>
        Game:
        <select :value="game" @change="setGame($event.target.value)">
          <option value="yugioh">Yu-Gi-Oh!</option>
          <option value="pokemon">Pokemon</option>
          <option value="mtg">MTG</option>
          <option value="onepiece">One Piece</option>
        </select>
      </label>
    </div>

    <div class="row g-3">

      <div class="col-12 col-md-8">
        <DeckStats :total-cards="totalCards" />
        <div class="zones d-flex flex-column gap-3">
          <DeckZone
            v-for="zone in deck.zones"
            :key="zone.name"
            :zone="zone"
            @remove-card="removeCard"
          />
        </div>
      </div>

      <div class="col-12 col-md-4">
        <CardSearch
          :game="game"
          :zones="deck.zones"
          @add-card="addCard($event.card, $event.zone)"
        />
      </div>

    </div>

  </div>

</template>

<style scoped>
.deck-builder-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.zones {
  margin-top: 1rem;
}
</style>