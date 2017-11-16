import Vue from 'vue'
import Vuex from 'vuex'
import gql from 'graphql-tag'

import apolloClient from '../api/apollo-client'

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
    async dinardap (_, { cedula }) {
      return apolloClient.query({
        variables: { cedula },
        query: gql`
          query Dinardap ($cedula: String!) {
            dinardap (cedula: $cedula) {
              nombre
              fechaNacimiento
              lugarNacimiento
              nacionalidad
              sexo
              titulosSenescyt
              estadoAfiliado
            }
          }`
      })
    },
    async signUp (_, signUp) {
      return apolloClient.mutate({
        variables: { signUp },
        mutation: gql`
          mutation SignUp ($signUp: SignUp!) {
            signUp (signUp: $signUp)
          }`
      })
    },
    async signIn (_, signIn) {
      return apolloClient.mutate({
        variables: { signIn },
        mutation: gql`
          mutation SignIn ($signIn: SignIn!) {
            signIn (signIn: $signIn) {
              token
              refreshToken
            }
          }`
      })
    },
    async changePasswordRequest (_, changePasswordRequest) {
      return apolloClient.mutate({
        variables: { changePasswordRequest },
        mutation: gql`
          mutation changePasswordRequest ($changePasswordRequest: ChangePasswordRequest!) {
            changePasswordRequest (changePasswordRequest: $changePasswordRequest)
          }`
      })
    },
    async updatePassword (_, updatePassword) {
      return apolloClient.mutate({
        variables: { updatePassword },
        mutation: gql`
          mutation UpdatePassword ($updatePassword: UpdatePassword!) {
            updatePassword (updatePassword: $updatePassword)
          }`
      })
    },
    async loggedInUser () {
      return apolloClient.query({
        fetchPolicy: 'network-only',
        query: gql`{
          loggedInUser {
            cedula
            nombre
            fechaNacimiento
            lugarNacimiento
            nacionalidad
            estadoAfiliado
            tipoAfiliado
            titulosSenescyt
            email
            telefonoFijo
            telefonoCelular
            paisDomicilio
            provinciaDomicilio
            codigoProvinciaDomicilio
            cantonDomicilio
            codigoCantonDomicilio
            nombreArtistico
            tipoActorCultural
            actividadPrincipal
            actividadSecundaria
            postulacionesFinanciamiento
            otrasEntidadesApoyo
            obrasRegistradasIEPI
            perteneceOrgCultural
            logrosAlcanzados
            proyectosCulturales
            formacionCapacitacion
            webBlog
            youtube
            facebook
            twitter
          }
        }`
      })
    },
    async logout ({ commit }) {
      await apolloClient.query({
        query: gql`{
          logout
        }`
      })
      commit('logout')
    },
    async paises ({ commit }) {
      const { data: { paises } } = await apolloClient.query({
        query: gql`{
          paises {
            pais
          }
        }`
      })
      commit('setPaises', paises.map(obj => obj.pais))
    },
    async dpa ({ commit }) {
      const { data: { dpa } } = await apolloClient.query({
        query: gql`{
          dpa {
            codigoProvincia
            provincia
            codigoCanton
            canton
          }
        }`
      })
      commit('setDpa', dpa)
    },
    async updateProfile (_, updateProfile) {
      return apolloClient.mutate({
        variables: { updateProfile },
        mutation: gql`
          mutation UpdateProfile ($updateProfile: UpdateProfile!) {
            updateProfile (updateProfile: $updateProfile)
          }`
      })
    }
  }
})
