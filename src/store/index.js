import Vue from 'vue'
import Vuex from 'vuex'

import apolloClient from '../api/apollo-client'
import DINARDAP_QUERY from '../graphql/Dinardap.gql'
import SIGN_UP_MUTATION from '../graphql/SignUp.gql'
import SIGN_IN_MUTATION from '../graphql/SignIn.gql'
import CHANGE_PASSWORD_REQUEST_MUTATION from '../graphql/ChangePasswordRequest.gql'
import UPDATE_PASSWORD_MUTATION from '../graphql/UpdatePassword.gql'
import LOGGED_IN_USER_QUERY from '../graphql/LoggedInUser.gql'
import LOGOUT_QUERY from '../graphql/Logout.gql'
import PAISES_QUERY from '../graphql/Paises.gql'
import DPA_QUERY from '../graphql/Dpa.gql'
import UPDATE_PROFILE_MUTATION from '../graphql/UpdateProfile.gql'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    menuItems: [
      { title: 'Inicio de sesión', icon: 'face', route: '/inicio-sesion' },
      { title: 'Registro de cuenta', icon: 'fingerprint', route: '/registro' }
    ],
    title: null,
    user: null,
    userIsAuthenticated: false,
    paises: [],
    dpa: [],
    loading: false,
    dialogDisplay: false,
    dialogColor: null,
    dialogTitle: null,
    dialogText: null
  },
  mutations: {
    setTitle (state, payload) {
      state.title = payload
    },
    setMenuItems (state, payload) {
      state.menuItems = payload
    },
    setUser (state, payload) {
      state.user = payload
    },
    setUserIsAuthenticated (state, payload) {
      state.userIsAuthenticated = payload
    },
    setPaises (state, payload) {
      state.paises = payload
    },
    setDpa (state, payload) {
      state.dpa = payload
    },
    setLoading (state, payload) {
      state.loading = payload
    },
    setSuccessDialog (state, dialogText) {
      state.dialogColor = 'success'
      state.dialogTitle = 'Éxito'
      state.dialogText = dialogText
      state.dialogDisplay = true
    },
    setErrorDialog (state, dialogText) {
      state.dialogColor = 'error'
      state.dialogTitle = 'Error'
      state.dialogText = dialogText
      state.dialogDisplay = true
    },
    resetDialog (state) {
      state.dialogDisplay = false
    },
    logout (state) {
      state.menuItems = [
        { title: 'Inicio de sesión', icon: 'face', route: '/inicio-sesion' },
        { title: 'Registro de cuenta', icon: 'fingerprint', route: '/registro' }
      ]
      state.userIsAuthenticated = false
    }
  },
  actions: {
    async dinardap (_, cedula) {
      return apolloClient.query({
        variables: { cedula },
        query: DINARDAP_QUERY
      })
    },
    async signUp (_, signUp) {
      return apolloClient.mutate({
        variables: { signUp },
        mutation: SIGN_UP_MUTATION
      })
    },
    async signIn (_, signIn) {
      return apolloClient.mutate({
        variables: { signIn },
        mutation: SIGN_IN_MUTATION
      })
    },
    async changePasswordRequest (_, changePasswordRequest) {
      return apolloClient.mutate({
        variables: { changePasswordRequest },
        mutation: CHANGE_PASSWORD_REQUEST_MUTATION
      })
    },
    async updatePassword (_, updatePassword) {
      return apolloClient.mutate({
        variables: { updatePassword },
        mutation: UPDATE_PASSWORD_MUTATION
      })
    },
    async loggedInUser () {
      return apolloClient.query({
        fetchPolicy: 'network-only',
        query: LOGGED_IN_USER_QUERY
      })
    },
    async logout ({ commit }) {
      await apolloClient.query({
        query: LOGOUT_QUERY
      })
      commit('logout')
    },
    async paises ({ commit }) {
      const { data: { paises } } = await apolloClient.query({
        query: PAISES_QUERY
      })
      commit('setPaises', paises.map(obj => obj.pais))
    },
    async dpa ({ commit }) {
      const { data: { dpa } } = await apolloClient.query({
        query: DPA_QUERY
      })
      commit('setDpa', dpa)
    },
    async updateProfile (_, updateProfile) {
      return apolloClient.mutate({
        variables: { updateProfile },
        mutation: UPDATE_PROFILE_MUTATION
      })
    }
  }
})
