<script setup>
    import {supabase } from '@/supabase';
    import { onMounted, ref } from 'vue';
    import NewsStory from '@/components/News_components/NewsStory.vue';
    import { useRoute } from 'vue-router';
    const route = useRoute();
    const newsItem = ref("");
    onMounted(async () => {
        const { data, error } = await supabase
            .from('news')
            .select('title, image_url, slug, content, created_at, tags, author_id, public_users!author_id (username, first_name, role)')
            .eq('slug', route.params.slug)
            .single();
        if (error) {
            console.error('Error fetching news:', error);
        } else {
            console.log('News data:', data);
        }
        newsItem.value = data;
    });
</script>
<template>
  <main class="container py-4">
    <NewsStory :newsItem="newsItem" class="mb-4"/>
  </main>
</template>