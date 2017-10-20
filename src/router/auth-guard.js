import store from '../store'

export default async (to, from, next) => {
  try {
    const { data: { loggedInUser } } = await store.dispatch('loggedInUser')
    store.commit('setUser', loggedInUser)
    store.commit('setMenuItems', [
      { title: 'Mi Perfil', icon: 'account_circle', route: '/perfil' }
    ])
    store.commit('setUserIsAuthenticated', true)
    next()
  } catch (error) {
    store.commit('setAlert', {
      alertColor: 'error',
      alertIcon: 'warning',
      alertMessage: JSON.parse(JSON.stringify(error)).graphQLErrors[0].message,
      alertDisplay: true
    })
    next('/inicio-sesion')
  }
}
