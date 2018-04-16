// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Buefy from 'buefy'
import 'buefy/lib/buefy.css'
import Notifications from 'vue-notification'
import store from './store/index'
import '../node_modules/@mdi/font/css/materialdesignicons.min.css'

Vue.config.productionTip = false
Vue.use(Buefy)
Vue.use(Notifications)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
