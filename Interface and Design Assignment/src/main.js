import { createApp } from 'vue'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './styles/main.scss'
import App from './App.vue'
import router from './router.js'

createApp(App).use(router).mount('#app')
