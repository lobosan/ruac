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
    errorMessage: null,
    showAlert: false
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
    setErrorMessage (state, payload) {
      state.errorMessage = payload
    },
    showAlert (state, payload) {
      state.showAlert = payload
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
            mutation SignUp($cedula: String!, $apellidosNombres: String!, $email: String!, $fechaNacimiento: String!, $contrasena: String!) {
            signUp(cedula: $cedula, apellidosNombres: $apellidosNombres, email: $email, fechaNacimiento: $fechaNacimiento, contrasena: $contrasena) {
              _id
              cedula
              apellidosNombres
              email
              fechaNacimiento
            }
          }`,
        variables: { cedula, apellidosNombres, email, fechaNacimiento, contrasena }
      })
    },
    async signIn ({ commit }, { cedula, contrasena }) {
      return await apolloClient.mutate({
        mutation: gql`
          mutation SignIn($cedula: String!, $contrasena: String!) {
          signIn(cedula: $cedula, contrasena: $contrasena)
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
