import Vue from 'vue'
import Vuex from 'vuex'
import gql from 'graphql-tag'

import apolloClient from '../api/apollo-client'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    cedula: null,
    nombre: null,
    fechaNacimiento: null,
    lugarNacimiento: null,
    nacionalidad: null,
    estadoAfiliado: null,
    tipoAfiliado: null,
    titulosSenescyt: null,
    email: null,
    telefonoFijo: null,
    telefonoCelular: null,
    paisDomicilio: null,
    provinciaDomicilio: null,
    cantonDomicilio: null,
    nombreArtistico: null,
    tipoActividad: null,
    actividadPrincipal: null,
    actividadSecundaria: null,
    postulacionesFinanciamiento: null,
    otrasEntidadesApoyo: null,
    obrasRegistradasIEPI: null,
    perteneceOrgCultural: null,
    logrosAlcanzados: null,
    proyectosCulturales: null,
    formacionCapacitacion: null,
    webBlog: null,
    youtube: null,
    facebook: null,
    twitter: null,
    declaracion: null,
    paises: [],
    provincias: [],
    cantones: [],
    title: null,
    menuItems: null,
    loading: false,
    alertMessage: null,
    alertDisplay: false,
    alertType: null
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    },
    setCedula (state, payload) {
      state.cedula = payload
    },
    setNombre (state, payload) {
      state.nombre = payload
    },
    setFechaNacimiento (state, payload) {
      state.fechaNacimiento = payload
    },
    setLugarNacimiento (state, payload) {
      state.lugarNacimiento = payload
    },
    setNacionalidad (state, payload) {
      state.nacionalidad = payload
    },
    setEstadoAfiliado (state, payload) {
      state.estadoAfiliado = payload
    },
    setTipoAfiliado (state, payload) {
      state.tipoAfiliado = payload
    },
    setTitulosSenescyt (state, payload) {
      state.titulosSenescyt = payload
    },
    setEmail (state, payload) {
      state.email = payload
    },
    setTelefonoFijo (state, payload) {
      state.telefonoFijo = payload
    },
    setTelefonoCelular (state, payload) {
      state.telefonoCelular = payload
    },
    setPaisDomicilio (state, payload) {
      state.paisDomicilio = payload
    },
    setProvinciaDomicilio (state, payload) {
      state.provinciaDomicilio = payload
    },
    setCantonDomicilio (state, payload) {
      state.cantonDomicilio = payload
    },
    setNombreArtistico (state, payload) {
      state.nombreArtistico = payload
    },
    setTipoActividad (state, payload) {
      state.tipoActividad = payload
    },
    setActividadPrincipal (state, payload) {
      state.actividadPrincipal = payload
    },
    setActividadSecundaria (state, payload) {
      state.actividadSecundaria = payload
    },
    setPostulacionesFinanciamiento (state, payload) {
      state.postulacionesFinanciamiento = payload
    },
    setOtrasEntidadesApoyo (state, payload) {
      state.otrasEntidadesApoyo = payload
    },
    setObrasRegistradasIEPI (state, payload) {
      state.obrasRegistradasIEPI = payload
    },
    setPerteneceOrgCultural (state, payload) {
      state.perteneceOrgCultural = payload
    },
    setLogrosAlcanzados (state, payload) {
      state.logrosAlcanzados = payload
    },
    setProyectosCulturales (state, payload) {
      state.proyectosCulturales = payload
    },
    setFormacionCapacitacion (state, payload) {
      state.formacionCapacitacion = payload
    },
    setWebBlog (state, payload) {
      state.webBlog = payload
    },
    setYoutube (state, payload) {
      state.youtube = payload
    },
    setFacebook (state, payload) {
      state.facebook = payload
    },
    setTwitter (state, payload) {
      state.twitter = payload
    },
    setDeclaracion (state, payload) {
      state.declaracion = payload
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
    setTitle (state, payload) {
      state.title = payload
    },
    setMenuItems (state, payload) {
      state.menuItems = payload
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
      state.cedula = null
      state.nombre = null
      state.fechaNacimiento = null
      state.lugarNacimiento = null
      state.nacionalidad = null
      state.estadoAfiliado = null
      state.tipoAfiliado = null
      state.titulosSenescyt = null
      state.email = null
      state.telefonoFijo = null
      state.telefonoCelular = null
      state.paisDomicilio = null
      state.provinciaDomicilio = null
      state.cantonDomicilio = null
      state.nombreArtistico = null
      state.tipoActividad = null
      state.actividadPrincipal = null
      state.actividadSecundaria = null
      state.postulacionesFinanciamiento = null
      state.otrasEntidadesApoyo = null
      state.obrasRegistradasIEPI = null
      state.perteneceOrgCultural = null
      state.logrosAlcanzados = null
      state.proyectosCulturales = null
      state.formacionCapacitacion = null
      state.webBlog = null
      state.youtube = null
      state.facebook = null
      state.twitter = null
      state.declaracion = null
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
    async updateProfile (_, { cedula, tipoAfiliado, email, telefonoFijo, telefonoCelular, paisDomicilio, provinciaDomicilio, cantonDomicilio, nombreArtistico, tipoActividad, actividadPrincipal, actividadSecundaria, postulacionesFinanciamiento, otrasEntidadesApoyo, obrasRegistradasIEPI, perteneceOrgCultural, logrosAlcanzados, proyectosCulturales, formacionCapacitacion, webBlog, youtube, facebook, twitter, declaracion }) {
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
