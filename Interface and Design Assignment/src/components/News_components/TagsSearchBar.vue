<script setup>
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const router = useRouter()

const props = defineProps({
  initialQuery: {
    type: String,
    default: ''
  }
})

const searchQuery = ref(props.initialQuery)
</script>
<template>
<div class="row">
    <div class="col-8">
        <input 
      v-model="searchQuery" 
      @keyup.enter="router.push({ path: '/news', query: { tags: searchQuery } })" 
      type="text" 
      class="form-control" 
      placeholder="Search by tag"
    />
    </div>
    <div class="col-2">
        <button 
      class="btn btn-primary col-12" 
      @click="router.push({ path: '/news', query: { tags: searchQuery } })"
    >Search</button>
    </div>
    <div class="col-2">
        <button 
      class="btn bg-danger text-light col-12" 
      @click="searchQuery = ''; router.push('/news')" 
    >Clear</button>
    </div>
    </div>
    
    
  
</template>