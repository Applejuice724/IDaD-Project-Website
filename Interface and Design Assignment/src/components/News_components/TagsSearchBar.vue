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
  <div class="row align-items-center">

    <div class="col-12 col-lg-8">
      <input
        v-model="searchQuery"
        @keyup.enter="router.push({ path: '/news', query: { tags: searchQuery } })"
        type="text"
        class="form-control"
        placeholder="Search by tag"
      />
    </div>

    <div class="col-12 col-lg-4">
      <div class="d-flex gap-2 justify-content-center">

        <button
          class="btn bg-primary text-light flex-fill"
          @click="router.push({ path: '/news', query: { tags: searchQuery } })"
        >
          Search
        </button>

        <button
          class="btn bg-danger text-light flex-fill"
          @click="searchQuery = ''; router.push('/news')"
        >
          Clear
        </button>

      </div>
    </div>

  </div>
</template>