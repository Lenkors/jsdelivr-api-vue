import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Search from './components/search'
import Result from './components/search/components/result'

const app = createApp(App)
app.use(store)
app.component('header-search', Search)
app.component('search-result', Result)
app.use(VueAxios, axios)
app.mount('#app')
