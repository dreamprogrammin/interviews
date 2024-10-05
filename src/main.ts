import './assets/main.css'
import 'primeflex/primeflex.css'
import 'primeicons/primeicons.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import ToastService from 'primevue/toastservice'

import Menubar from 'primevue/menubar'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Toast from 'primevue/toast'
import ProgressSpinner from 'primevue/progressspinner'

import App from './App.vue'
import router from './router'
import { initializeApp } from 'firebase/app'
const firebaseConfig = {
  apiKey: 'AIzaSyCE9w2dm0oy1c-B3zHQcqDrZrBXzzMs_1I',
  authDomain: 'interviews-59bb4.firebaseapp.com',
  projectId: 'interviews-59bb4',
  storageBucket: 'interviews-59bb4.appspot.com',
  messagingSenderId: '468473670578',
  appId: '1:468473670578:web:bd847970e0686550f152ab'
}

initializeApp(firebaseConfig)

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue, {
  theme: {
    preset: Aura
  }
})
app.use(ToastService)

app.component('app-menubar', Menubar)
app.component('app-button', Button)
app.component('app-input-text', InputText)
app.component('app-toast', Toast)
app.component('app-spinner', ProgressSpinner)
app.mount('#app')
