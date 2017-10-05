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
    store.commit('setAlert', { alertType: null, alertMessage: null, alertDisplay: false })
    const token = localStorage.getItem('token')
    let menuItems = []
    if (token) {
      menuItems.push({ title: 'Mi Perfil', icon: 'account_circle', route: '/perfil' })
      const { data } = await store.dispatch('loggedInUser')
      const user = data.loggedInUser
      store.commit('setUser', true)
      store.commit('setCedula', user.cedula)
      store.commit('setNombre', user.nombre)
      store.commit('setFechaNacimiento', user.fechaNacimiento)
      store.commit('setLugarNacimiento', user.lugarNacimiento)
      store.commit('setNacionalidad', user.nacionalidad)
      store.commit('setEstadoAfiliado', user.estadoAfiliado)
      store.commit('setTipoAfiliado', user.tipoAfiliado)
      store.commit('setTitulosSenescyt', user.titulosSenescyt)
      store.commit('setEmail', user.email)
      store.commit('setTelefonoFijo', user.telefonoFijo)
      store.commit('setTelefonoCelular', user.telefonoCelular)
      store.commit('setPaisDomicilio', user.paisDomicilio)
      store.commit('setProvinciaDomicilio', user.provinciaDomicilio)
      store.commit('setCantonDomicilio', user.cantonDomicilio)
      store.commit('setNombreArtistico', user.nombreArtistico)
      store.commit('setTipoActividad', user.tipoActividad)
      store.commit('setActividadPrincipal', user.actividadPrincipal)
      store.commit('setActividadSecundaria', user.actividadSecundaria)
      store.commit('setPostulacionesFinanciamiento', user.postulacionesFinanciamiento)
      store.commit('setOtrasEntidadesApoyo', user.otrasEntidadesApoyo)
      store.commit('setObrasRegistradasIEPI', user.obrasRegistradasIEPI)
      store.commit('setPerteneceOrgCultural', user.perteneceOrgCultural)
      store.commit('setLogrosAlcanzados', user.logrosAlcanzados)
      store.commit('setProyectosCulturales', user.proyectosCulturales)
      store.commit('setFormacionCapacitacion', user.formacionCapacitacion)
      store.commit('setWebBlog', user.webBlog)
      store.commit('setYoutube', user.youtube)
      store.commit('setFacebook', user.facebook)
      store.commit('setTwitter', user.twitter)
      store.commit('setDeclaracion', user.declaracion)
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
    document.title = route.meta.title
    document.querySelector('meta[name="description"]').setAttribute('content', route.meta.description)
    document.querySelector('meta[name="keywords"]').setAttribute('content', route.meta.keywords)
  })

  return router
}
