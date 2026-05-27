<script setup lang="ts">
    import { globals } from '@/composables/globals'
</script>

<template>
    <footer class="bg-light mt-5 py-4">
        <div class="container">
            <div class="row">
                <div class="col-12 col-md-3 mb-3 mb-md-0">
                    <h5 class="mb-3">{{ globals.websiteName }}</h5>
                    <ul class="list-unstyled">
                        <li><router-link to="/about" class="text-decoration-none text-muted" >About Us</router-link></li>
                        <li><router-link to="/events" class="text-decoration-none text-muted">Events</router-link></li>
                        <li><router-link to="/contact" class="text-decoration-none text-muted">Contact</router-link></li>
                    </ul>
                </div>
                <div class="col-12 col-md-3 mb-3 mb-md-0">
                    <h5 class="mb-3">Community</h5>
                    <ul class="list-unstyled">
                        <li><router-link to="/news" class="text-decoration-none text-muted">News</router-link></li>
                        <li><router-link to="/deckbuilder" class="text-decoration-none text-muted">Deck Builder</router-link></li>                        
                    </ul>
                </div>
                <div class="col-12 col-md-3 mb-3 mb-md-0">
                    <h5 class="mb-3">Resources</h5>
                    <ul class="list-unstyled">                        
                        <li><router-link to="/guides" class="text-decoration-none text-muted">Strategy Guides</router-link></li>

                        <li><router-link to="/faq" class="text-decoration-none text-muted">FAQ</router-link></li>
                    </ul>
                </div>
                <div class="col-12 col-md-3">
                    <h5 class="mb-3">Connect</h5>
                    <ul class="list-unstyled">
                        <li><router-link to="#" class="text-decoration-none text-muted">Twitter</router-link></li>
                        <li><router-link to="#" class="text-decoration-none text-muted">Discord</router-link></li>
                    </ul>
                </div>
            </div>
            <hr class="my-4">
            <p class="text-center text-muted mb-0">&copy; {{ new Date().getFullYear() }} {{ globals.websiteName }}. All rights reserved.</p>
        </div>
    </footer>
</template>