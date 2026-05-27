<script setup>
    import {supabase } from '@/supabase';
       
    import TagsSearchBar from '@/components/News_components/TagsSearchBar.vue';
    import NewsCard from '@/components/News_components/NewsCard.vue';
    import { watch, ref } from 'vue';
    import { useRoute } from 'vue-router';
    import ConditionalButton from '@/components/News_components/ConditionalButton.vue';
    const route = useRoute();

    
    const newsItems = ref([]);
    watch(() => route.query.tags, async (tags) => {
        let query = supabase
            .from('news')
            .select('title, short_description, image_url, slug')
            .order('created_at', { ascending: false });
        if(tags?.length > 0) {
            query = query.overlaps('tags', [tags.toLowerCase()]);
        }
        const {data, error} = await query;
        if (error) {
            console.error('Error fetching news:', error);
        } else {
            console.log('News data:', data);
        }
        newsItems.value = data;
    }, { immediate: true });
</script>
<template>
<main>
    <div class="container">
        
        <div class="row justify-content-center align-items-center border rounded">
            <h1 class="col-lg-3 col-md-6 col-sm-12">Latest News</h1>
            <TagsSearchBar class="col-lg-9 col-md-6 col-sm-12" :initialQuery="route.query.tags"/>
        </div>
        <div class="row justify-content-left mt-2">
                <ConditionalButton buttonText="Create News Story" buttonRoute="/news/create"/>
            </div>
        <div class="row justify-content-center mt-2">
            <div class="col-md-3 col-md-6 col-sm-12" v-for="newsItem in newsItems" :key="newsItem.slug">
                <div class="card h-100">
                    <div class="card-body">
                        <NewsCard :newsItem="newsItem"/>
                    </div>
                </div>
            </div>
        </div>
            
    </div>
</main>



</template>