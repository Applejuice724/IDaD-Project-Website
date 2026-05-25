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
                        <li><a href="/about" class="text-decoration-none text-muted">About Us</a></li>
                        <li><a href="/events" class="text-decoration-none text-muted">Events</a></li>
                        <li><a href="/contact" class="text-decoration-none text-muted">Contact</a></li>
                    </ul>
                </div>
                <div class="col-12 col-md-3 mb-3 mb-md-0">
                    <h5 class="mb-3">Community</h5>
                    <ul class="list-unstyled">
                        <li><a href="/profile" class="text-decoration-none text-muted">Profile</a></li>
                        <li><a href="/chat" class="text-decoration-none text-muted">Chat History</a></li>
                        <li><a href="/deckbuilder" class="text-decoration-none text-muted">Deck Builder</a></li>                        
                    </ul>
                </div>
                <div class="col-12 col-md-3 mb-3 mb-md-0">
                    <h5 class="mb-3">Resources</h5>
                    <ul class="list-unstyled">
                        <li><a href="/guide" class="text-decoration-none text-muted">Grading Guide</a></li>                        
                        <li><a href="/strategy-guides" class="text-decoration-none text-muted">Strategy Guides</a></li>
                        <li><a href="/news" class="text-decoration-none text-muted">News</a></li>
                        <li><a href="/faq" class="text-decoration-none text-muted">FAQ</a></li>
                    </ul>
                </div>
                <div class="col-12 col-md-3">
                    <h5 class="mb-3">Connect</h5>
                    <ul class="list-unstyled">
                        <li><a href="#" class="text-decoration-none text-muted">Twitter</a></li>
                        <li><a href="#" class="text-decoration-none text-muted">Discord</a></li>
                    </ul>
                </div>
            </div>
            <hr class="my-4">
            <p class="text-center text-muted mb-0">&copy; {{ new Date().getFullYear() }} {{ globals.websiteName }}. All rights reserved.</p>
        </div>
    </footer>
</template>