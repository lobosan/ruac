import store from '../store'

export default (to, from, next) => {
  if (store.state.user) {
    next()
  } else {
    next('/inicio-sesion')
  }
}