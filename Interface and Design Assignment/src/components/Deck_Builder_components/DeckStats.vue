<script setup>
defineProps({
  totalCards: {
    type: Number,
    required: true
  }
})
</script>

<template>
  <div class="deck-stats">
    <div>
      Total Cards:
      {{ totalCards }}
    </div>
  </div>
</template>