<script setup>
    import {ref, onMounted, watch} from 'vue';
    const props = defineProps({
        newsItem: {
            type: Object,
            required: true
        }
    })

    props.newsItem.slug = props.newsItem.slug || "";

    const tagsInput = ref(
    props.newsItem.tags?.join(", ") || "");

    watch(tagsInput, (newValue) => {
        props.newsItem.tags = newValue.split(",").map(tag => tag.trim());
    });


    
</script>

<template>
    <main>
        <input type="text" v-model="props.newsItem.title" class="form-control mb-3" placeholder="Title"/>
        <input type="text" v-model="props.newsItem.short_description" class="form-control mb-3" placeholder="Short Description"/>
        <input type="text" v-model="props.newsItem.image_url" class="form-control mb-3" placeholder="Image URL"/>
        <textarea v-model="props.newsItem.content" class="form-control mb-3" placeholder="Content" rows="10"></textarea>
        <input type="text" v-model="tagsInput" class="form-control mb-3" placeholder="Tags (comma separated)"/>
        <input type="text" v-model="props.newsItem.slug" class="form-control mb-3" placeholder="Slug"/>
    </main>
</template>