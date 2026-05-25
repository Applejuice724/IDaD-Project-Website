<script setup>
import CardPreview from './CardPreview.vue'

defineProps({
  cards: {
    type: Array,
    required: true
  }
})

defineEmits([
  'add-card'
])
</script>

<template>

  <div class="card-grid">

    <CardPreview
      v-for="card in cards"
      :key="card.id"

      :card="card"

      @add="
        $emit('add-card', card)
      "
    />

  </div>

</template>

<style scoped>
.card-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
  padding: 0.5rem 0;
}
</style>