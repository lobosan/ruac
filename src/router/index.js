import Vue from 'vue'
import Router from 'vue-router'

import meta from './meta.json'
import AuthGuard from './auth-guard'
import store from '../store'

// Route helper function for lazy loading
function route (name, path, view, beforeEnter) {
  return {
    name,
    path,
    meta: meta[path],
    beforeEnter,
    component: () => import(`../components/${view}`)
  }
}

Vue.use(Router)

export function createRouter () {
  const router = new Router({
    mode: 'history',
    scrollBehavior: () => ({ y: 0 }),
    routes: [
      route('home', '/', 'Home'),
      route('inicioSesion', '/inicio-sesion', 'InicioSesion'),
      route('registro', '/registro', 'Registro'),
      route('solitarCambioContrasena', '/solicitar-cambio-contrasena', 'SolicitarCambioContrasena'),
      route('cambiarContrasena', '/cambiar-contrasena', 'CambiarContrasena'),
      route('perfil', '/perfil', 'Perfil', AuthGuard),
      { path: '*', redirect: '/' }
    ]
  })

  router.beforeEach(async (to, from, next) => {
    store.commit('setTitle', to.meta.title)
    const token = localStorage.getItem('token')
    const refreshToken = localStorage.getItem('refresh-token')
    if (token && refreshToken) {
      store.commit('setUserIsAuthenticated', true)
      store.commit('setMenuItems', [
        { title: 'Mi Perfil', icon: 'account_circle', route: '/perfil' }
      ])
    }
    next()
  })

  router.afterEach(route => {
    document.title = route.meta.title
    document.querySelector('meta[name="description"]').setAttribute('content', route.meta.description)
    document.querySelector('meta[name="keywords"]').setAttribute('content', route.meta.keywords)
  })

  return router
}
