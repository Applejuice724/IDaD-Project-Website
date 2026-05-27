<script setup>
defineProps({
    buttonText: String,
    buttonRoute: String
})
import { useAuthStore } from '@/stores/auth';
import { ref, onMounted } from 'vue';
const authStore = useAuthStore();

const role = ref("");
onMounted(async () => {
    await authStore.init();
    role.value = await authStore.role();
    console.log(authStore.isLoggedIn);
    console.log("HELLO WORLD");
    console.log('Fetched user role:', role.value);
});

</script>
<template>
    <div v-if="role === 'admin'">
        <router-link :to="buttonRoute" class="btn btn-primary">{{ buttonText }}</router-link>
    </div>
</template>