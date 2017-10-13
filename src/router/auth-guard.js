import store from '../store'

export default (to, from, next) => {
  if (store.state.userIsAuthenticated) {
    next()
  } else {
    next('/inicio-sesion')
  }
}
