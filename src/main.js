import Vue from 'vue'
import Vuetify from 'vuetify'
import * as VueGoogleMaps from 'vue2-google-maps'
import VeeValidate, { Validator } from 'vee-validate'
import es from 'vee-validate/dist/locale/es'

import './stylus/main.styl'
import App from './App'
import Alert from './components/shared/Alert'
import store from './store'
import { createRouter } from './router'

Vue.use(Vuetify)

Validator.addLocale(es)

Vue.use(VeeValidate, {
  locale: 'es',
  events: 'input|blur',
  dictionary: {
    es: {
      attributes: {
        contrasena: 'Contraseña'
      }
    }
  }
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
  render: h => h(App)
})
