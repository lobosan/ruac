import Vue from 'vue'
import Vuex from 'vuex'
import gql from 'graphql-tag'

import apolloClient from '../api/apollo-client'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    title: null,
    menuItems: null,
    user: null,
    loading: false,
    alertMessage: null,
    alertDisplay: false,
    alertType: null
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
    setLoading (state, payload) {
      state.loading = payload
    },
    setAlert (state, { alertMessage, alertDisplay, alertType }) {
      state.alertMessage = alertMessage
      state.alertDisplay = alertDisplay
      state.alertType = alertType
    },
    logout (state) {
      localStorage.removeItem('token')
      state.user = null
    }
  },
  actions: {
    async signUp ({ commit }, { cedula, apellidosNombres, email, fechaNacimiento, contrasena }) {
      return await apolloClient.mutate({
        mutation: gql`
          mutation SignUp ($cedula: String!, $apellidosNombres: String!, $email: String!, $fechaNacimiento: String!, $contrasena: String!) {
            signUp (cedula: $cedula, apellidosNombres: $apellidosNombres, email: $email, fechaNacimiento: $fechaNacimiento, contrasena: $contrasena) {
              _id
              cedula
              apellidosNombres
              email
              fechaNacimiento
            }
          }
        `,
        variables: { cedula, apellidosNombres, email, fechaNacimiento, contrasena }
      })
    },
    async dinardap ({ commit }, { cedula }) {
      return await apolloClient.query({
        query: gql`
          query Dinardap ($cedula: String!) {
            dinardap (cedula: $cedula) {
              nombre
              fechaNacimiento
              provincia
              canton
              parroquia
              nacionalidad
              sexo
              tercerNivel
              cuartoNivel
              estadoAfiliado
            }
          }
        `,
        variables: { cedula }
      })
    },
    async signIn ({ commit }, { cedula, contrasena }) {
      return await apolloClient.mutate({
        mutation: gql`
          mutation SignIn ($cedula: String!, $contrasena: String!) {
          signIn (cedula: $cedula, contrasena: $contrasena)
        }`,
        variables: { cedula, contrasena }
      })
    },
    async loggedInUser ({ commit }) {
      return await apolloClient.query({
        query: gql`{
          loggedInUser {
            _id
            cedula
          }
        }`
      })
    }
  }
})
