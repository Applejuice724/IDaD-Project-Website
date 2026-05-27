<script setup>
defineProps({
    buttonText: String,
    buttonRoute: String,
    bg: {
        type: String,
        default: 'bg-primary'
    }
})
import { useAuthStore } from '@/stores/auth';
import { ref, onMounted } from 'vue';
const authStore = useAuthStore();

const role = ref("");
onMounted(async () => {
    role.value = await authStore.role();

});

</script>
<template>
    <div v-if="role === 'admin'">
        <router-link :to="buttonRoute" :class="`btn text-light ${bg}`">{{ buttonText }}</router-link>
    </div>
</template>