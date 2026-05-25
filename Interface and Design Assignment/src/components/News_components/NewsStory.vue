<script setup>
defineProps({
    newsItem: {
        type: Object,
        required: true
    }
})

</script>

<template>
  <div class="p-3">
    <img :src="newsItem.image_url" alt="News Image" class="mw-100 object-fit-contain col-md-4"/>
    <div class="row">
        <div>
            <h2 class="col-md-12">{{ newsItem.title }}</h2>
            <router-link :to="newsItem?.author_id ? `/profile/${newsItem.author_id}/` : undefined" class="text-decoration-none text-muted mb-2 d-block" >
                Written by {{ newsItem?.public_users?.first_name }} "{{ newsItem?.public_users?.username ?? "Unknown Author" }}", {{ newsItem?.public_users?.role }}
            </router-link>
            <div>
                <router-link v-for="tag in newsItem.tags" :key="tag" :to="`/news/?tags=${tag}`" class=" bg-primary text-decoration-none mb-1 rounded p-1 text-light me-2">{{ tag }}</router-link>
            </div>
        </div>
        
        
    </div>
    
    
    <br>
    <p>{{ newsItem.content }}</p>
  </div>
</template>