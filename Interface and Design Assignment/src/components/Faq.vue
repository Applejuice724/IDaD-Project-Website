<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '../stores/auth'
import { supabase } from '../supabase'

const auth = useAuthStore()
const isAdmin = ref(false)
const currentPage = ref(1)
const perPage = 5
const editingId = ref(null)
const editQuestion = ref('')
const editAnswer = ref('')
const newQuestion = ref('')
const newAnswer = ref('')
const faq_storage = ref([])

const totalPages = computed(() => Math.ceil(faq_storage.value.length / perPage))
const paginatedFaqs = computed(() => {
  const start = (currentPage.value - 1) * perPage
  return faq_storage.value.slice(start, start + perPage)
})

async function fetchFaqs() {
  const { data } = await supabase.from('faq_storage').select('*').order('created_at')
  faq_storage.value = data || []
}

async function addFaq() {
  if (!newQuestion.value || !newAnswer.value) return
  await supabase.from('faq_storage').insert({ question: newQuestion.value, answer: newAnswer.value })
  newQuestion.value = ''
  newAnswer.value = ''
  await fetchFaqs()
}

async function saveEdit(id) {
  await supabase.from('faq_storage').update({ question: editQuestion.value, answer: editAnswer.value }).eq('id', id)
  editingId.value = null
  await fetchFaqs()
}

async function deleteFaq(id) {
  await supabase.from('faq_storage').delete().eq('id', id)
  await fetchFaqs()
}

function startEdit(faq) {
  editingId.value = faq.id
  editQuestion.value = faq.question
  editAnswer.value = faq.answer
}

onMounted(async () => {
  await fetchFaqs()
  if (auth.isLoggedIn) {
    const userRole = await auth.role()
    isAdmin.value = userRole === 'admin'
  }
})
</script>
<template>
    <div class="container py-5">
    <h1 class="fw-bold mb-4"> <img src="/Toothless.jpg" alt="Cheeky dragon" class="dragon" height="20" width="20"> Frequently asked questions <img src="/Toothless.jpg" alt="Cheeky dragon" class="dragon" height="20" width="20"></h1>
    <br>

    <div v-if="isAdmin" class="card mb-4 p-3 shadow-sm">
      <h5 class="fw-bold mb-3">Add New FAQ</h5>
      <input v-model="newQuestion" class="form-control mb-2" placeholder="Question" />
      <textarea v-model="newAnswer" class="form-control mb-2" rows="2" placeholder="Answer"></textarea>
      <button class="btn btn-primary btn-sm" @click="addFaq" :disabled="!newQuestion || !newAnswer">
        Add FAQ
      </button>
    </div>

    
    <div class="accordion mb-4" id="faqAccordion">
      <div v-for="(faq, index) in paginatedFaqs" :key="faq.id" class="accordion-item">
        <h2 class="accordion-header">
          <button class="accordion-button collapsed fw-bold" type="button"
            data-bs-toggle="collapse" :data-bs-target="`#faq-${faq.id}`">
            {{ faq.question }}
          </button>
        </h2>
        <div :id="`faq-${faq.id}`" class="accordion-collapse collapse">
          <div class="accordion-body">
            <div v-if="editingId === faq.id">
              <input v-model="editQuestion" class="form-control mb-2" />
              <textarea v-model="editAnswer" class="form-control mb-2" rows="2"></textarea>
              <button class="btn btn-success btn-sm me-2" @click="saveEdit(faq.id)">Save</button>
              <button class="btn btn-outline-secondary btn-sm" @click="editingId = null">Cancel</button>
            </div>
            <div v-else>
              <p>{{ faq.answer }}</p>
              <template v-if="isAdmin">
                <button class="btn btn-outline-primary btn-sm me-2" @click="startEdit(faq)">Edit</button>
                <button class="btn btn-outline-danger btn-sm" @click="deleteFaq(faq.id)">Delete</button>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>

    
    <nav v-if="totalPages > 1" class="d-flex justify-content-center">
      <ul class="pagination">
        <li class="page-item" :class="{ disabled: currentPage === 1 }">
          <button class="page-link" @click="currentPage--">‹ Prev</button>
        </li>
        <li v-for="p in totalPages" :key="p" class="page-item" :class="{ active: p === currentPage }">
          <button class="page-link" @click="currentPage = p">{{ p }}</button>
        </li>
        <li class="page-item" :class="{ disabled: currentPage === totalPages }">
          <button class="page-link" @click="currentPage++">Next ›</button>
        </li>
      </ul>
    </nav>

    <p class="text-muted mt-3">
      Still have questions? Visit our <router-link to="/contact">Contact</router-link> page.
    </p>
  </div>

</template>
<style>
.question{
    font-weight: bold;
}
.answer{
    font-style: italic;
}
.dragon{
    opacity: 0.8;
}
</style>