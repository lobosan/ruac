// Polyfills for IE Support
import 'babel-polyfill'
import 'event-source-polyfill'

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import * as VueGoogleMaps from 'vue2-google-maps'
import es from 'vee-validate/dist/locale/es'
import VeeValidate, { Validator } from 'vee-validate'

import Layout from './Layout'
import Alert from './components/shared/Alert'
import store from './store'
import { createRouter } from './router'

Vue.use(Vuetify)

Validator.addLocale(es)

Vue.use(VeeValidate, {
  errorBagName: 'veeErrors',
  locale: 'es',
  events: 'input|blur'
})

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyBjkOESteDGfqatHkRHYXrTHlcMrMkjBL0'
  }
})

Vue.component('app-alert', Alert)

Vue.config.productionTip = false

const router = createRouter()

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  ...Layout
})
