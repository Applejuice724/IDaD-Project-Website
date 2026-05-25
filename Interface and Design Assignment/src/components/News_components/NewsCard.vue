<script setup>
defineProps({
    newsItem: {
        type: Object,
        required: true
    }
})
</script>

<template>
  <router-link 
    :to="`/news/${newsItem.slug}`" 
    class="d-block text-decoration-none text-reset"
  >
    <div class="p-3 rounded shadow border" role="button">
      <img :src="newsItem.image_url" alt="News Image" class="object-fit-scale border rounded mw-100"/>
      <h2>{{ newsItem.title }}</h2>
      <p class="card-text" style="max-height: 100px; min-height: 100px; overflow: hidden;">
        {{ newsItem.short_description }}
      </p>
    </div>
  </router-link>
</template>