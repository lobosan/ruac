import Vue from 'vue'
import Vuex from 'vuex'
import gql from 'graphql-tag'

import apolloClient from '../api/apollo-client'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    loading: false,
    error: null,
    snackbar: false
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    },
    setLoading (state, payload) {
      state.loading = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    clearError (state) {
      state.error = null
    },
    setSnackbar (state, payload) {
      state.snackbar = payload
    },
    clearSnackbar (state) {
      state.snackbar = false
    }
  },
  actions: {
    async signUp ({ commit, dispatch }, { cedula, apellidosNombres, email, fechaNacimiento, contrasena }) {
      commit('setLoading', true)
      commit('clearError')
      try {
        const newUser = await apolloClient.mutate({
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
        commit('setLoading', false)
        return newUser.data.signUp
      } catch (error) {
        const errorObj = Object.assign({}, error)
        commit('setLoading', false)
        commit('setSnackbar', true)
        commit('setError', errorObj.graphQLErrors[0].message)
        return false
      }
    },
    async signIn ({ commit }, { cedula, contrasena }) {
      commit('setLoading', true)
      commit('clearError')
      try {
        const token = await apolloClient.mutate({
          mutation: gql`
            mutation SignIn($cedula: String!, $contrasena: String!) {
            signIn(cedula: $cedula, contrasena: $contrasena)
          }`,
          variables: { cedula, contrasena }
        })
        localStorage.setItem('token', token.data.signIn)
        commit('setLoading', false)
        return token.data.signIn
      } catch (error) {
        const errorObj = Object.assign({}, error)
        commit('setLoading', false)
        commit('setSnackbar', true)
        commit('setError', errorObj.graphQLErrors[0].message)
        return false
      }
    },
    clearError ({ commit }) {
      commit('clearError')
    },
    clearSnackbar ({ commit }) {
      commit('clearSnackbar')
    }
  },
  getters: {
    user (state) {
      return state.user
    },
    loading (state) {
      return state.loading
    },
    error (state) {
      return state.error
    },
    snackbar (state) {
      return state.snackbar
    }
  }
})
