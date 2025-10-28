import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '@/assets/style/common.css'
import '@/assets/style/control.css'
import '@/assets/style/style.css'
import '@/assets/icon/icon.css'
import './assets/style/font.css'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura';
import MsButton from './components/ms-button/MsButton.vue'
import MsSearch from './components/ms-search/MsSearch.vue'
import MsSelect from './components/ms-form-field/MsSelect.vue'
import MsModal from './components/ms-modal/MsModal.vue'
import MsInput from './components/ms-form-field/MsInput.vue'
import { i18n } from './plugin/i18n'
const app = createApp(App)
app.use(PrimeVue, {
    theme: {
      preset: Aura,
    },
  })
app.use(router)
app.use(i18n)

// Khai báo component dùng chung trong toàn bộ ứng dụng
app.component('MsButton', MsButton)
app.component('MsSearch', MsSearch)
app.component('MsSelect', MsSelect)
app.component('MsModal', MsModal)
app.component('MsInput', MsInput)
app.mount('#app')
