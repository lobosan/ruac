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
    async dinardap ({ commit }, { cedula }) {
      return await apolloClient.query({
        variables: { cedula },
        query: gql`
          query Dinardap ($cedula: String!) {
            dinardap (cedula: $cedula) {
              nombre
              fechaNacimiento
              lugarNacimiento
              nacionalidad
              sexo
              tercerNivel
              cuartoNivel
              estadoAfiliado
            }
          }`
      })
    },
    async signUp ({ commit }, { cedula, email, contrasena, nombre, fechaNacimiento, lugarNacimiento, nacionalidad, sexo, tercerNivel, cuartoNivel, estadoAfiliado }) {
      return await apolloClient.mutate({
        variables: { cedula, email, contrasena, nombre, fechaNacimiento, lugarNacimiento, nacionalidad, sexo, tercerNivel, cuartoNivel, estadoAfiliado },
        mutation: gql`
          mutation SignUp ($cedula: String!, $email: String!, $contrasena: String!, $nombre: String!, $fechaNacimiento: String!, $lugarNacimiento: String!, $nacionalidad: String!, $sexo: String!, $tercerNivel: String, $cuartoNivel: String, $estadoAfiliado: String) {
            signUp (cedula: $cedula, email: $email, contrasena: $contrasena, nombre: $nombre, fechaNacimiento: $fechaNacimiento, lugarNacimiento: $lugarNacimiento, nacionalidad: $nacionalidad, sexo: $sexo, tercerNivel: $tercerNivel, cuartoNivel: $cuartoNivel, estadoAfiliado: $estadoAfiliado) {
              _id
            }
          }`
      })
    },
    async signIn ({ commit }, { cedula, contrasena }) {
      return await apolloClient.mutate({
        variables: { cedula, contrasena },
        mutation: gql`
          mutation SignIn ($cedula: String!, $contrasena: String!) {
            signIn (cedula: $cedula, contrasena: $contrasena)
          }`
      })
    },
    async loggedInUser ({ commit }) {
      return await apolloClient.query({
        query: gql`{
          loggedInUser {
            cedula
            email
            nombre
            fechaNacimiento
            lugarNacimiento
            nacionalidad
            tercerNivel
            cuartoNivel
            estadoAfiliado
          }
        }`
      })
    }
  }
})
