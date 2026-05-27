<script setup>
import {ref, onMounted, watch} from 'vue';
import { uploadNewsStory } from '@/api';
const newsItem = ref({
    title: "Title",
    short_description: "Short Description",
    image_url: "https://cdn-icons-png.flaticon.com/512/46/46499.png",
    content: "This is the content",
    tags: ["tag1", "tag2", "tag3"]
});
const slug = ref("");

async function handleUpload() {
    console.log('Uploading news story:', newsItem.value);
    try {
        if(!slug.value || slug.value.trim() === "") {
            slug.value = newsItem.value.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9\-]/g, '');
        }else{
            slug.value = slug.value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9\-]/g, '');
        }
        const concat = {...newsItem.value, slug: slug.value};
        const { data } = await uploadNewsStory(concat);
        console.log('News story uploaded:', data);
    } catch (error) {
        console.error('Error uploading news story:', error);
    }
}

import CreateNewsForm from '@/components/News_components/CreateNewsForm.vue';
import NewsCard from '@/components/News_components/NewsCard.vue';
import NewsStory from '@/components/News_components/NewsStory.vue';

</script>
<template>
    <main>
    <div class="container w-100">
        
        <div class="row mb-4 justify-content-center rounded text-wrap" style="overflow-wrap: break-word;">
            <div class="rounded bg-white col-lg-4 col-sm-12 border h-100 mb-2">
                <h2>Editor</h2>
                <CreateNewsForm :newsItem="newsItem" :slug="slug"/>
            </div>
            <div class="col-lg-4 col-sm-12 overflow-hidden border h-100 mb-2">
                <h2>Story View</h2>
                <NewsStory :newsItem="newsItem" class="h-100"/>
                
            </div>
            <div class="col-lg-4 col-sm-12 overflow-hidden border h-100 mb-2">
                <h2>Preview</h2>
                <NewsCard :newsItem="newsItem"/>
            </div>
            <button class="btn btn-primary" @click="handleUpload">Upload News Story</button>
        </div>
        
    </div>
    </main>
</template>