<template>
<<<<<<< HEAD
  <div class="container py-5" style="max-width: 680px">
    <h2 class="fw-bold mb-1">Contact Us</h2>
    <p class="text-muted mb-4">Have a question or feedback? We'd love to hear from you.</p>

    <!-- Success message (v-if shows after submit) -->
    <div v-if="submitted" class="alert alert-success">
      ✅ Thanks for reaching out! We'll get back to you soon.
    </div>

    <form v-else @submit.prevent="handleSubmit" novalidate>
      <div class="mb-3">
        <label class="form-label">Your Name *</label>
        <input v-model="form.name" type="text" class="form-control"
          :class="{ 'is-invalid': v.name }" placeholder="John Smith" />
        <div class="invalid-feedback">{{ v.name }}</div>
      </div>

      <div class="mb-3">
        <label class="form-label">Email Address *</label>
        <input v-model="form.email" type="email" class="form-control"
          :class="{ 'is-invalid': v.email }" placeholder="you@example.com" />
        <div class="invalid-feedback">{{ v.email }}</div>
      </div>

      <div class="mb-3">
        <label class="form-label">Subject *</label>
        <select v-model="form.subject" class="form-select" :class="{ 'is-invalid': v.subject }">
          <option value="">Select a subject</option>
          <option>General Enquiry</option>
          <option>Report a Bug</option>
          <option>Card Submission</option>
          <option>Partnership</option>
          <option>Other</option>
        </select>
        <div class="invalid-feedback">{{ v.subject }}</div>
      </div>

      <div class="mb-4">
        <label class="form-label">Message *</label>
        <textarea v-model="form.message" class="form-control" rows="5"
          :class="{ 'is-invalid': v.message }"
          placeholder="Tell us what's on your mind..."></textarea>
        <div class="invalid-feedback">{{ v.message }}</div>
        <small class="text-muted">{{ form.message.length }}/500</small>
      </div>

      <button type="submit" class="btn btn-primary px-4" :disabled="loading">
        <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
        {{ loading ? 'Sending...' : 'Send Message' }}
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const submitted = ref(false)
const loading   = ref(false)
const form      = reactive({ name: '', email: '', subject: '', message: '' })
const v         = reactive({ name: '', email: '', subject: '', message: '' })

function validate() {
  v.name    = form.name.trim().length >= 2       ? '' : 'Name must be at least 2 characters'
  v.email   = /\S+@\S+\.\S+/.test(form.email)   ? '' : 'Please enter a valid email'
  v.subject = form.subject                        ? '' : 'Please select a subject'
  v.message = form.message.trim().length >= 10   ? '' : 'Message must be at least 10 characters'
  return !v.name && !v.email && !v.subject && !v.message
}

async function handleSubmit() {
  if (!validate()) return
  loading.value = true
  // Simulate sending (no real backend needed for contact form)
  await new Promise(r => setTimeout(r, 1000))
  loading.value = false
  submitted.value = true
}
</script>
=======
    <p> Contact template</p>

    <fieldset>
        <label for="name">Your Name:</label>
        <input type="text" id="name" name="name" pattern="[A-Za-z]+" required>
        <br>
        <label for="email"> Your Email:</label>
        <input type="text" id="email" name="email" pattern="[\w\.]+@[A-Za-z.]+" required>
        <br>
        <label for="subject"> Email Subject:</label>
        <input type="text" id="subject" name="subject" required>
        <br>
        <p><label for="message">Your message:</label></p>
        <textarea id="message" name="message" rows="4" cols="50"required></textarea>
    </fieldset>
    <button type="button" onclick="alert('Email sent successfully')">Send email</button>

</template>
<style>
input{
    margin: 10px;
}
</style>
>>>>>>> origin/Alexi-Branch
