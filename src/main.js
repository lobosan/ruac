// Polyfills for IE Support
import 'babel-polyfill'
import 'event-source-polyfill'

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'

import Layout from './components/Layout'
import { createRouter } from './router/index'

Vue.use(Vuetify)
Vue.config.productionTip = false

const router = createRouter()

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<Layout/>',
  components: { Layout }
})
