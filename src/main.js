import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '@/assets/style/common.css'
import '@/assets/style/control.css'
import '@/assets/style/style.css'
import '@/assets/icon/icon.css'
import './assets/style/font.css'

import MsButton from './components/ms-button/MsButton.vue'
import { i18n } from './plugin/i18n'
const app = createApp(App)

app.use(router)
app.use(i18n)

// Khai báo component dùng chung trong toàn bộ ứng dụng
app.component('MsButton', MsButton)
app.mount('#app')
