<script setup>
    import {supabase } from '@/supabase';
    import { onMounted, ref } from 'vue';
    import NewsStory from '@/components/News_components/NewsStory.vue';
    import { useRoute, useRouter } from 'vue-router';
    import ConditionalButton from '@/components/News_components/ConditionalButton.vue';
    const route = useRoute();
    const router = useRouter();
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
    async function handleDelete() {
        try {
            const { error } = await supabase
                .from('news')
                .delete()
                .eq('slug', newsItem.value.slug);
            if (error) {
                console.error('Error deleting news story:', error);
            } else {
                console.log('News story deleted successfully');
                router.push('/news'); 
            }
        } catch (error) {
            console.error('Error deleting news story:', error);
        }
    }
    async function backToNewsList() {
        router.push('/news');
    }
</script>
<template>
  <main class="container py-4">
    <NewsStory :newsItem="newsItem" class="mb-4"/>
    <div class="row justify-content-center">
      <div class="col">
        <ConditionalButton :buttonText="'Edit Story'" :buttonRoute="`/news/${newsItem.slug}/edit`" />
      </div>
      <div class="col">
        <ConditionalButton :buttonText="'Delete Story'" @click="handleDelete" :buttonRoute="`/news/${newsItem.slug}/delete`" bg="bg-danger" />
      </div>
      <div class="col">
        <button @click="backToNewsList" class="btn btn-secondary">Back to News List</button>
      </div>
    </div>
  </main>
</template>