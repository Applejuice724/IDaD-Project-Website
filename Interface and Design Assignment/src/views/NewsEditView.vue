<script setup>

    import {useRoute, useRouter} from 'vue-router';
    import {useAuthStore} from '@/stores/auth';
    import CreateNewsForm from '@/components/News_components/CreateNewsForm.vue';
    import {supabase} from '@/supabase';
    import {ref, watch} from 'vue';
    const route = useRoute();
    const router = useRouter();
    const slug = route.params.slug;
    const newsItem = ref("");
    watch(() => route.query.tags, async (tags) => {
        const {data, error} = await supabase
            .from('news')
            .select('*')
            .order('created_at', { ascending: false })
            .eq('slug', slug)
            .single();
        if (error) {
            console.error('Error fetching news:', error);
        } else {
            console.log('News data:', data);
        }
        newsItem.value = data;
    }, { immediate: true });

    async function handleSubmit(){
        const authStore = useAuthStore();
        await authStore.init();
        await supabase
            .from('news')
            .update(newsItem.value)
            .eq('slug', slug);
        router.push(`/news/${slug}`);
    }
</script>
<template>
    <main>
        <h1>Edit News</h1>
        <CreateNewsForm :newsItem="newsItem"/>
        <button class="btn btn-primary" @click="handleSubmit">Edit</button>
    </main>
</template>