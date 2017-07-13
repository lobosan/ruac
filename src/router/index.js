import Vue from 'vue'
import Router from 'vue-router'

const meta = require('./meta.json')

// Route helper function for lazy loading
function route(path, view) {
  return {
    path: path,
    meta: meta[path],
    component: () => import(`../components/${view}`)
  }
}

Vue.use(Router)

export function createRouter() {
  const router = new Router({
    mode: 'history',
    scrollBehavior: () => ({ y: 0 }),
    routes: [
      route('/', 'Home'),
      route('/inicio-sesion', 'InicioSesion'),
      route('/registro', 'Registro'),
      route('/perfil-creacion', 'PerfilCreacion'),
      // Global redirect for 404
      { path: '*', redirect: '/' }
    ]
  })

  router.afterEach(route => {
    if (route.meta.title !== 'RUAC') {
      document.title = `${route.meta.title} | RUAC`
      document.querySelector('meta[name="description"]').setAttribute('content', route.meta.description)
      document.querySelector('meta[name="keywords"]').setAttribute('content', route.meta.keywords)
    }
  })

  // router.beforeEach((to, from, next) => {
  //   if (to.matched.some(record => record.meta.requiresAuth)) {
  //     // this route requires auth, check if logged in
  //     // if not, redirect to login page.
  //     if (!auth.loggedIn()) {
  //       next({
  //         path: '/login',
  //         query: { redirect: to.fullPath }
  //       })
  //     } else {
  //       next()
  //     }
  //   } else {
  //     next() // make sure to always call next()!
  //   }
  // })

  return router
}
