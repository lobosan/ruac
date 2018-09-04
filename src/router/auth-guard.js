import store from '../store'
import decode from 'jwt-decode'

export default async (to, from, next) => {
  try {
    const token = localStorage.getItem('token')
    const refreshToken = localStorage.getItem('refresh-token')
    decode(token)
    const { exp } = decode(refreshToken)
    if (Date.now() / 1000 > exp) {
      store.commit('setUserIsAuthenticated', false)
      store.commit('setErrorDialog', 'Su sesión ha caducado. Por favor vuelva a iniciar sesión para acceder a la página solicitada.')
      next('/inicio-sesion')
    } else {
      await store.dispatch('perfil')
      next()
    }
  } catch (error) {
    store.commit('setUserIsAuthenticated', false)
    store.commit('setErrorDialog', 'Inicie sesión para acceder a la página solicitada.')
    next('/inicio-sesion')
  }
}
