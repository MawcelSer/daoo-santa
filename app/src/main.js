import { createApp } from 'vue'
import App from './App.vue'
// CSS.
import './main.css'
import 'solana-wallets-vue/styles.css'

// Routing.
import { createRouter, createWebHashHistory } from 'vue-router'
import routes from './routes'
const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

createApp(App).use(router).mount('#app')
