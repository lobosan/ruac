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
    error: null
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
    }
  },
  actions: {
    loadAllPosts ({ commit }) {
      commit('setLoading', true)
      apolloClient.query({
        query: gql`
          {
            allPosts {
              _id
              name
            }
          }
        `
      }).then(result => {
        commit('setAllPosts', result.data.allPosts)
        commit('setLoading', result.loading)
      }).catch(error => {
        console.log(error)
        commit('setLoading', false)
      })
    },
    signUp ({ commit }, payload) {
      commit('setLoading', true)
      commit('clearError')
      apolloClient.query({
        query: gql`
          {
            loggedInUser {
              _id
              username
              email
            }
          }
        `
      }).then(result => {
        commit('setUser', result.data.loggedInUser)
        commit('setLoading', false)
      }).catch(error => {
        console.log(error)
        commit('setLoading', false)
      })
    },
    signIn ({ commit }, payload) {
      commit('setLoading', true)
      commit('clearError')
    },
    clearError ({ commit }) {
      commit('clearError')
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
    }
  }
})
