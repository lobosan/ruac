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
    async signIn (_, { cedula, contrasena }) {
      return apolloClient.mutate({
        variables: { cedula, contrasena },
        mutation: gql`
          mutation SignIn ($cedula: String!, $contrasena: String!) {
            signIn (cedula: $cedula, contrasena: $contrasena) {
              token
              refreshToken
            }
          }`
      })
    },
    async requestPasswordChange (_, { cedula, email }) {
      return apolloClient.mutate({
        variables: { cedula, email },
        mutation: gql`
          mutation RequestPasswordChange ($cedula: String!, $email: String!) {
            requestPasswordChange (cedula: $cedula, email: $email)
          }`
      })
    },
    async updatePassword (_, { token, contrasena }) {
      return apolloClient.mutate({
        variables: { token, contrasena },
        mutation: gql`
          mutation UpdatePassword ($token: String!, $contrasena: String!) {
            updatePassword (token: $token, contrasena: $contrasena)
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
    async updateProfile (_, profile) {
      let provinciaDomicilio = null
      let codigoProvinciaDomicilio = null
      let cantonDomicilio = null
      let codigoCantonDomicilio = null
      if (profile.provinciaDomicilioObj && profile.cantonDomicilioObj) {
        provinciaDomicilio = profile.provinciaDomicilioObj.provincia
        codigoProvinciaDomicilio = profile.provinciaDomicilioObj.codigoProvincia
        cantonDomicilio = profile.cantonDomicilioObj.canton
        codigoCantonDomicilio = profile.cantonDomicilioObj.codigoCanton
      }
      return apolloClient.mutate({
        variables: {
          ...profile,
          provinciaDomicilio,
          codigoProvinciaDomicilio,
          cantonDomicilio,
          codigoCantonDomicilio
        },
        mutation: gql`
          mutation UpdateProfile (
            $cedula: String!,
            $tipoAfiliado: String!,
            $email: String!,
            $telefonoFijo: String,
            $telefonoCelular: String,
            $paisDomicilio: String!,
            $provinciaDomicilio: String,
            $codigoProvinciaDomicilio: String,
            $cantonDomicilio: String,
            $codigoCantonDomicilio: String,
            $nombreArtistico: String,
            $tipoActorCultural: String!,
            $actividadPrincipal: String!,
            $actividadSecundaria: String,
            $postulacionesFinanciamiento: [String],
            $otrasEntidadesApoyo: String,
            $obrasRegistradasIEPI: String!,
            $perteneceOrgCultural: String!,
            $logrosAlcanzados: String,
            $proyectosCulturales: String,
            $formacionCapacitacion: String,
            $webBlog: String,
            $youtube: String,
            $facebook: String,
            $twitter: String
          ) {
            updateProfile (
              cedula: $cedula,
              tipoAfiliado: $tipoAfiliado,
              email: $email,
              telefonoFijo: $telefonoFijo,
              telefonoCelular: $telefonoCelular,
              paisDomicilio: $paisDomicilio,
              provinciaDomicilio: $provinciaDomicilio,
              codigoProvinciaDomicilio: $codigoProvinciaDomicilio
              cantonDomicilio: $cantonDomicilio,
              codigoCantonDomicilio: $codigoCantonDomicilio
              nombreArtistico: $nombreArtistico,
              tipoActorCultural: $tipoActorCultural,
              actividadPrincipal: $actividadPrincipal,
              actividadSecundaria: $actividadSecundaria,
              postulacionesFinanciamiento: $postulacionesFinanciamiento,
              otrasEntidadesApoyo: $otrasEntidadesApoyo,
              obrasRegistradasIEPI: $obrasRegistradasIEPI,
              perteneceOrgCultural: $perteneceOrgCultural,
              logrosAlcanzados: $logrosAlcanzados,
              proyectosCulturales: $proyectosCulturales,
              formacionCapacitacion: $formacionCapacitacion,
              webBlog: $webBlog,
              youtube: $youtube,
              facebook: $facebook,
              twitter: $twitter
            ) {
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
    }
  }
})
