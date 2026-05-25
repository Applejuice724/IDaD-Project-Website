<script setup>
defineProps({
  card: {
    type: Object,
    required: true
  }
})

defineEmits([
  'add'
])
</script>

<template>

  <div class="card-preview">

    <img
      :src="card.image"
      :alt="card.name"
    />

    <div class="card-name">
      {{ card.name }}
    </div>

    <button @click="$emit('add')">
      Add
    </button>

  </div>

</template>

<style scoped>
.card-preview {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 0.5rem;
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.card-preview img {
  width: 100%;
  aspect-ratio: 2 / 3;
  object-fit: cover;
  border-radius: 4px;
}

.card-name {
  font-size: 0.85rem;
  text-align: center;
  font-weight: 600;
}

.card-preview button {
  width: 100%;
  padding: 0.35rem;
  cursor: pointer;
}
</style>