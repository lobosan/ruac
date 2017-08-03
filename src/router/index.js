import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

const meta = require('./meta.json')

// Route helper function for lazy loading
function route (path, view) {
  return {
    path: path,
    meta: meta[path],
    component: () => import(`../components/${view}`)
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
      route('/perfil-creacion', 'PerfilCreacion'),
      { path: '*', redirect: '/' }
    ]
  })

  router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth) {
      if (!store.state.auth.user) {
        next('/inicio-sesion')
      } else {
        next()
      }
    } else {
      next()
    }
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
