// Polyfills for IE Support
import 'babel-polyfill'
import 'event-source-polyfill'

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'

import Layout from './components/Layout'
import { createRouter } from './router/index'

import * as VueGoogleMaps from 'vue2-google-maps'

Vue.use(Vuetify)
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyBjkOESteDGfqatHkRHYXrTHlcMrMkjBL0'
  }
})

Vue.config.productionTip = false

const router = createRouter()

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<Layout/>',
  components: { Layout }
})
