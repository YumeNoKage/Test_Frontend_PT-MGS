import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// Global Components
import Notification from './components/Notification/Notification.vue'
import Pagination from './components/Pagination/Pagination.vue'

// Style Bootstrap
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

const app = createApp(App)

app.component('Notification', Notification)
app.component('Pagination', Pagination)

app.use(store)
app.use(router)
app.mount('#app')
