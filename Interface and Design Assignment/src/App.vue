<script setup>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
</script>

<template>
  <Header />
  <hr/>
  <main>
    <router-view />
  </main>
  <hr/>
  <Footer />
</template>
