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
    paises: [],
    provincias: [],
    cantones: [],
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
    setPaises (state, payload) {
      state.paises = payload
    },
    setProvincias (state, payload) {
      state.provincias = payload
    },
    setCantones (state, payload) {
      state.cantones = payload
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
    async dinardap (_, { cedula }) {
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
              titulosSenescyt
              estadoAfiliado
            }
          }`
      })
    },
    async signUp (_, { cedula, contrasena, nombre, fechaNacimiento, lugarNacimiento, nacionalidad, sexo, estadoAfiliado, titulosSenescyt, email }) {
      return await apolloClient.mutate({
        variables: { cedula, contrasena, nombre, fechaNacimiento, lugarNacimiento, nacionalidad, sexo, estadoAfiliado, titulosSenescyt, email },
        mutation: gql`
          mutation SignUp ($cedula: String!, $contrasena: String!, $nombre: String!, $fechaNacimiento: String!, $lugarNacimiento: String!, $nacionalidad: String!, $sexo: String!, $estadoAfiliado: String, $titulosSenescyt: [String]!, $email: String!) {
            signUp (cedula: $cedula, contrasena: $contrasena, nombre: $nombre, fechaNacimiento: $fechaNacimiento, lugarNacimiento: $lugarNacimiento, nacionalidad: $nacionalidad, sexo: $sexo, estadoAfiliado: $estadoAfiliado, titulosSenescyt: $titulosSenescyt, email: $email) {
              cedula
            }
          }`
      })
    },
    async signIn (_, { cedula, contrasena }) {
      return await apolloClient.mutate({
        variables: { cedula, contrasena },
        mutation: gql`
          mutation SignIn ($cedula: String!, $contrasena: String!) {
            signIn (cedula: $cedula, contrasena: $contrasena)
          }`
      })
    },
    async loggedInUser () {
      return await apolloClient.query({
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
            cantonDomicilio
            nombreArtistico
            tipoActividad
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
            declaracion
          }
        }`
      })
    },
    async paises ({ commit }) {
      const { data } = await apolloClient.query({
        query: gql`{
          paises {
            pais
          }
        }`
      })
      commit('setPaises', data.paises)
    },
    async provincias ({ commit }) {
      const { data } = await apolloClient.query({
        query: gql`{
          provincias {
            codigoProvincia
            provincia
          }
        }`
      })
      commit('setProvincias', data.provincias)
    },
    async cantones ({ commit }, codigoProvincia) {
      const { data } = await apolloClient.query({
        variables: { codigoProvincia },
        query: gql`
          query Cantones ($codigoProvincia: String!) {
            cantones (codigoProvincia: $codigoProvincia) {
              codigoCanton
              canton
            }
          }`
      })
      commit('setCantones', data.cantones)
    },
    async updateProfile (_, { cedula, tipoAfiliado, email, telefonoFijo, telefonoCelular, paisDomicilio, provinciaDomicilioObj, cantonDomicilioObj, nombreArtistico, tipoActividad, actividadPrincipal, actividadSecundaria, postulacionesFinanciamiento, otrasEntidadesApoyo, obrasRegistradasIEPI, perteneceOrgCultural, logrosAlcanzados, proyectosCulturales, formacionCapacitacion, webBlog, youtube, facebook, twitter, declaracion }) {
      const provinciaDomicilio = provinciaDomicilioObj.provincia
      const cantonDomicilio = cantonDomicilioObj.canton
      return await apolloClient.mutate({
        variables: { cedula, tipoAfiliado, email, telefonoFijo, telefonoCelular, paisDomicilio, provinciaDomicilio, cantonDomicilio, nombreArtistico, tipoActividad, actividadPrincipal, actividadSecundaria, postulacionesFinanciamiento, otrasEntidadesApoyo, obrasRegistradasIEPI, perteneceOrgCultural, logrosAlcanzados, proyectosCulturales, formacionCapacitacion, webBlog, youtube, facebook, twitter, declaracion },
        mutation: gql`
          mutation UpdateProfile ($cedula: String!, $tipoAfiliado: String!, $email: String!, $telefonoFijo: String, $telefonoCelular: String, $paisDomicilio: String!, $provinciaDomicilio: String, $cantonDomicilio: String, $nombreArtistico: String, $tipoActividad: String!, $actividadPrincipal: String!, $actividadSecundaria: String, $postulacionesFinanciamiento: [String], $otrasEntidadesApoyo: String, $obrasRegistradasIEPI: String!, $perteneceOrgCultural: String!, $logrosAlcanzados: String, $proyectosCulturales: String, $formacionCapacitacion: String, $webBlog: String, $youtube: String, $facebook: String, $twitter: String, $declaracion: String!) {
            updateProfile (cedula: $cedula, tipoAfiliado: $tipoAfiliado, email: $email, telefonoFijo: $telefonoFijo, telefonoCelular: $telefonoCelular, paisDomicilio: $paisDomicilio, provinciaDomicilio: $provinciaDomicilio, cantonDomicilio:$cantonDomicilio, nombreArtistico: $nombreArtistico, tipoActividad: $tipoActividad, actividadPrincipal: $actividadPrincipal, actividadSecundaria: $actividadSecundaria, postulacionesFinanciamiento: $postulacionesFinanciamiento, otrasEntidadesApoyo: $otrasEntidadesApoyo, obrasRegistradasIEPI: $obrasRegistradasIEPI, perteneceOrgCultural: $perteneceOrgCultural, logrosAlcanzados: $logrosAlcanzados, proyectosCulturales: $proyectosCulturales, formacionCapacitacion: $formacionCapacitacion, webBlog: $webBlog, youtube: $youtube, facebook: $facebook, twitter: $twitter, declaracion: $declaracion) {
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
              cantonDomicilio
              nombreArtistico
              tipoActividad
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
              declaracion
            }
          }`
      })
    }
  }
})
