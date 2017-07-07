import Vue from 'vue'
import Router from 'vue-router'

import Layout from '@/Layout'
import InicioSesion from '@/components/InicioSesion'
import Registro from '@/components/Registro'
import PerfilCreacion from '@/components/PerfilCreacion'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', component: Layout },
    { path: '/inicio-sesion', component: InicioSesion },
    { path: '/registro', component: Registro },
    { path: '/perfil-creacion', component: PerfilCreacion }
  ]
})

