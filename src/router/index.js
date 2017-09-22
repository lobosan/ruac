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
      route('/perfil', 'Perfil', AuthGuard),
      { path: '*', redirect: '/' }
    ]
  })

  router.beforeEach(async (to, from, next) => {
    const token = localStorage.getItem('token')
    let menuItems = []
    if (token) {
      const user = await store.dispatch('loggedInUser')
      store.commit('setUser', user.data.loggedInUser)
      menuItems.push({ title: 'Mi Perfil', icon: 'account_circle', route: '/perfil' })
    } else {
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
    if (route.meta.title !== 'RUAC') {
      document.title = `${route.meta.title} | RUAC`
      document.querySelector('meta[name="description"]').setAttribute('content', route.meta.description)
      document.querySelector('meta[name="keywords"]').setAttribute('content', route.meta.keywords)
    }
  })

  return router
}
