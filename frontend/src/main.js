import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuelidate from 'vuelidate'

Vue.config.productionTip = false
Vue.use(Vuelidate)

import VuePromiseBtn from 'vue-promise-btn'
 
// not required. Styles for built-in spinner
import 'vue-promise-btn/dist/vue-promise-btn.css'
 
Vue.use(VuePromiseBtn) // or with global options Vue.use(VuePromiseBtn, {})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

