import Vue from 'vue'
import Router from 'vue-router'
import App from '@/App'
import InicioSesion from '@/components/InicioSesion'
import Registro from '@/components/Registro'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', component: App },
    { path: '/inicio-sesion', component: InicioSesion },
    { path: '/registro', component: Registro }
  ]
})

