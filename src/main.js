import './assets/main.css'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import vClickOutside from 'v-click-outside'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const app = createApp(App)
if (process.env.NODE_ENV === 'development') {
    // Disable Vue DevTools
    window.__VUE_DEVTOOLS_GLOBAL_HOOK__.enabled = false;
}
app.use(vClickOutside)
app.use(pinia)
app.use(router)

app.mount('#app')
