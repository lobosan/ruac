import Vue from 'vue'
import Router from 'vue-router'

import meta from './meta.json'
import AuthGuard from './auth-guard'
import store from '../store'

// Route helper function for lazy loading
function route (path, view, beforeEnter) {
  return {
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
      route('/', 'Home'),
      route('/inicio-sesion', 'InicioSesion'),
      route('/registro', 'Registro'),
      route('/perfil-creacion', 'PerfilCreacion', AuthGuard),
      { path: '*', redirect: '/' }
    ]
  })

  router.beforeEach(async (to, from, next) => {
    const token = localStorage.getItem('token')
    let sideNavItems = [{ title: 'RUAC', icon: 'home', route: '/' }]
    let toolbarItems = []
    if (token) {
      await store.dispatch('loggedInUser')
      sideNavItems.push({ title: 'Creación de perfil', icon: 'account_box', route: '/perfil-creacion' })
    } else {
      sideNavItems.push(
        { title: 'Inicio de sesión', icon: 'face', route: '/inicio-sesion' },
        { title: 'Registro de cuenta', icon: 'fingerprint', route: '/registro' }
      )
      toolbarItems.push(
        { title: 'Inicia sesión', route: '/inicio-sesion' },
        { title: 'Regístrate', route: '/registro' }
      )
    }
    store.commit('setTitle', to.meta.title)
    store.commit('setSideNavItems', sideNavItems)
    store.commit('setToolbarItems', toolbarItems)
    next()
  })

  router.afterEach(route => {
    if (route.meta.title !== 'RUAC') {
      document.title = `${route.meta.title} | RUAC`
      document.querySelector('meta[name="description"]').setAttribute('content', route.meta.description)
      document.querySelector('meta[name="keywords"]').setAttribute('content', route.meta.keywords)
    }
  })

  return router
}
