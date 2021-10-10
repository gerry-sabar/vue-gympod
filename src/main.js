import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import store from '@/store/store'
import ApiService from '@/services/api.service'

// import global css
import '@/assets/plugins/fontawesome-free/css/all.min.css'
import '@/assets/plugins/tempusdominus-bootstrap-4/css/tempusdominus-bootstrap-4.min.css'
import '@/assets/dist/css/adminlte.min.css'

//need to set environment later
//ApiService.init(process.env.BASE_URL)
ApiService.init('http://localhost:8000/api/');
Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
