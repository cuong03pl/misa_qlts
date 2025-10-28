import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '@/assets/style/common.css'
import '@/assets/style/control.css'
import '@/assets/style/style.css'
import '@/assets/icon/icon.css'
import './assets/style/font.css'
const app = createApp(App)

app.use(router)

app.mount('#app')
