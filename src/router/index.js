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
    component: () => import(`../components/${view}`),
    beforeEnter
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
      route('perfil', '/perfil', 'Perfil', AuthGuard),
      { path: '*', redirect: '/' }
    ]
  })

  router.beforeEach(async (to, from, next) => {
    store.commit('setAlert', { alertColor: null, alertIcon: null, alertMessage: null, alertDisplay: false })
    const token = localStorage.getItem('token')
    let menuItems = []
    if (token) {
      store.commit('setUserIsAuthenticated', true)
      menuItems.push({ title: 'Mi Perfil', icon: 'account_circle', route: '/perfil' })
    } else {
      store.commit('setUserIsAuthenticated', false)
      menuItems.push(
        { title: 'Inicio de sesión', icon: 'face', route: '/inicio-sesion' },
        { title: 'Registro de cuenta', icon: 'fingerprint', route: '/registro' }
      )
    }
    store.commit('setTitle', to.meta.title)
    store.commit('setMenuItems', menuItems)
    next()
  })

  router.afterEach(route => {
    document.title = route.meta.title
    document.querySelector('meta[name="description"]').setAttribute('content', route.meta.description)
    document.querySelector('meta[name="keywords"]').setAttribute('content', route.meta.keywords)
  })

  return router
}
