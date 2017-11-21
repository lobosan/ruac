import Vue from 'vue'
import Vuetify from 'vuetify'
import * as VueGoogleMaps from 'vue2-google-maps'
import VeeValidate, { Validator } from 'vee-validate'
import es from 'vee-validate/dist/locale/es'

import 'vuetify/dist/vuetify.css'
import './styles/global.css'
import App from './App'
import Dialog from './components/shared/Dialog'
import store from './store'
import { createRouter } from './router'

Vue.use(Vuetify, { theme: {
  primary: '#673AB7',
  secondary: '#7C4DFF',
  accent: '#4CAF50',
  error: '#F44336',
  info: '#DA8722',
  success: '#4CAF50',
  warning: '#FFA000'
}})

Validator.addLocale(es)

Vue.use(VeeValidate, {
  locale: 'es',
  events: 'input|blur',
  dictionary: {
    es: {
      attributes: {
        contrasena: 'Contraseña'
      },
      custom: {
        telefonoFijo: {
          regex: 'El formato no corresponde al Ej. 022585623 ext 123456'
        },
        telefonoCelular: {
          regex: 'El formato no corresponde al Ej. 0983507946'
        }
      }
    }
  }
})

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyBjkOESteDGfqatHkRHYXrTHlcMrMkjBL0'
  }
})

Vue.component('app-dialog', Dialog)

Vue.config.productionTip = false

const router = createRouter()

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
