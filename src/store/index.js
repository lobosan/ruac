import Vue from 'vue'
import Vuex from 'vuex'
import gql from 'graphql-tag'

import apolloClient from '../api/apollo-client'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    allPosts: null,
    user: null,
    perfil: null,
    loading: false,
    error: null,
    snackbar: false
  },
  mutations: {
    setAllPosts (state, payload) {
      state.allPosts = payload
    },
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
    loadAllPosts ({ commit }) {
      commit('setLoading', true)
      apolloClient.query({
        query: gql`{
          allPosts {
            _id
            name
          }
        }`
      }).then(result => {
        commit('setAllPosts', result.data.allPosts)
        commit('setLoading', result.loading)
      }).catch(error => {
        console.log(error)
        commit('setError', error)
        commit('setLoading', false)
      })
    },
    signUp ({ commit, dispatch }, { cedula, apellidosNombres, email, fechaNacimiento, contrasena }) {
      commit('setLoading', true)
      commit('clearError')
      apolloClient.mutate({
        mutation: gql`mutation SignUp($cedula: String!, $apellidosNombres: String!, $email: String!, $fechaNacimiento: String!, $contrasena: String!) {
          signUp(cedula: $cedula, apellidosNombres: $apellidosNombres, email: $email, fechaNacimiento: $fechaNacimiento, contrasena: $contrasena) {
            _id
            cedula
            apellidosNombres
            email
            fechaNacimiento
          }
        }`,
        variables: {
          cedula,
          apellidosNombres,
          email,
          fechaNacimiento,
          contrasena
        }
      }).then(result => {
        commit('setLoading', false)
        return { cedula, contrasena }
      }).then(({ cedula, contrasena }) => {
        dispatch('signIn', { cedula, contrasena })
      }).then(response => {
        return response
      }).catch(error => {
        const errorObj = Object.assign({}, error)
        commit('setSnackbar', true)
        commit('setError', errorObj.graphQLErrors[0].message)
        commit('setLoading', false)
      })
    },
    signIn ({ commit }, { cedula, contrasena }) {
      commit('setLoading', true)
      commit('clearError')
      apolloClient.mutate({
        mutation: gql`mutation SignIn($cedula: String!, $contrasena: String!) {
          signIn(cedula: $cedula, contrasena: $contrasena)
        }`,
        variables: { cedula, contrasena }
      }).then(result => {
        localStorage.setItem('token', result.data.signIn)
        commit('setLoading', false)
      }).catch(error => {
        console.log(error)
        commit('setError', error)
        commit('setLoading', false)
      })
    },
    clearError ({ commit }) {
      commit('clearError')
    },
    clearSnackbar ({ commit }) {
      commit('clearSnackbar')
    }
  },
  getters: {
    allPosts (state) {
      return state.allPosts
    },
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
