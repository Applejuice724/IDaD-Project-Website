<script setup>
defineProps({
    newsItem: {
        type: Object,
        required: true
    }
})
</script>

<template>
    <main class="row h-100">
        <router-link 
    :to="`/news/${newsItem.slug}`" 
    class="d-block text-decoration-none text-reset"
  >
    <div class="p-3 rounded shadow border h-100" role="button">
      <img :src="newsItem.image_url" alt="https://cdn-icons-png.flaticon.com/512/46/46499.png" class="object-fit-scale border rounded mw-100"/>
      <h3 >
        {{ newsItem.title }}
      </h3>
      <p>
        {{ newsItem.short_description }}
      </p>
      
    </div>
  </router-link>
    </main>
  
</template>