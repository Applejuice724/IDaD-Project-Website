<script setup>
import { useRouter } from 'vue-router'

const props = defineProps({
    article: {
        type: Object,
        required: true
    }
})

const router = useRouter()

const goToDetail = () => {
    router.push(`/events/${props.article.id}`)
}
</script>

<template>
    <div class="event-card" @click="goToDetail">
        <img :src="article.image" alt="Event Image" class="event-image" />
        <div class="event-content">
            <h3 class="event-title">{{ article.title }}</h3>
            <span class="event-category">{{ article.category }}</span>
            <p class="event-date">{{ article.date }}</p>
            <p class="event-description">{{ article.excerpt }}</p>
        </div>
    </div>
</template>

<style scoped>
.event-card {
    background: #1e293b;
    border-radius: 12px;
    overflow: hidden;
    transition: transform 0.2s;
    cursor: pointer;
}

.event-card:hover {
    transform: translateY(-4px);
}

.event-image {
    width: 100%;
    height: 200px;
    object-fit: cover;
    display: block;
}

.event-content {
    padding: 20px;
    text-align: left;
}

.event-title {
    margin: 0 0 6px;
    font-size: 18px;
    color: #f1f5f9;
}

.event-category {
    display: inline-block;
    font-size: 12px;
    color: #94a3b8;
    background: #334155;
    padding: 3px 10px;
    border-radius: 20px;
    margin-bottom: 8px;
}

.event-date {
    margin: 0 0 10px;
    font-size: 13px;
    color: #64748b;
}

.event-description {
    margin: 0;
    font-size: 14px;
    color: #cbd5e1;
    line-height: 1.5;
}
</style>
