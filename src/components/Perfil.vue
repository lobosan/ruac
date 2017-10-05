<template>
  <v-flex xs12 sm10 md10 lg8 xl8>
    <form method="post" @submit.prevent="updateProfile" autocomplete="off">
      <v-stepper v-model="step" vertical class="mb-4">
        <v-stepper-step step="1" editable :complete="step > 1">
          <span class="subheading">DATOS GENERALES</span>
        </v-stepper-step>
        <!-- Datos Generales -->
        <v-stepper-content step="1">
          <v-text-field label="Número de cédula" v-model="cedula" disabled></v-text-field>
          <v-text-field label="Nombre completo" v-model="nombre" disabled></v-text-field>
          <v-text-field label="Fecha de nacimiento" v-model="fechaNacimiento" disabled></v-text-field>
          <v-text-field label="Lugar de nacimiento" v-model="lugarNacimiento" disabled></v-text-field>
          <v-text-field label="Nacionalidad" v-model="nacionalidad" disabled></v-text-field>
          <v-text-field label="Estado de afiliación al IESS" v-model="estadoAfiliado" disabled></v-text-field>
          <v-select label="Tipo de afiliación al IESS" v-model="tipoAfiliado" :items="items.tipoAfiliado" autocomplete></v-select>
          <v-select label="Títulos registrados en la SENESCYT" v-model="titulosSenescyt" chips tags readonly disabled></v-select>
          <v-text-field label="Email de Contacto" v-model="email"></v-text-field>
          <v-text-field label="Teléfono Fijo de Contacto" v-model="telefonoFijo"></v-text-field>
          <v-text-field label="Teléfono Celular de Contacto" v-model="telefonoCelular"></v-text-field>
          <v-select label="País de domicilio" v-model="paisDomicilio" :items="paises" @change="onChangePaisDomicilio($event)"></v-select>
          <v-select v-show="showProvinciaCanton" label="Provincia de domicilio" v-model="provinciaDomicilio" :items="provincias" item-text="provincia" item-value="codigoProvincia" return-object @change="onChangeProvincia($event.codigoProvincia)"></v-select>
          <v-select v-show="showProvinciaCanton" label="Cantón de domicilio" v-model="cantonDomicilio" :items="cantones" item-text="canton" item-value="codigoCanton" return-object></v-select>
          <v-flex class="text-xs-center">
            <v-btn outline class="deep-purple--text mt-2 mx-0" @click="step = 2">
              Continuar
              <v-icon class="deep-purple--text ml-1">expand_more</v-icon>
            </v-btn>
          </v-flex>
        </v-stepper-content>
        <!-- Actividad Cultural -->
        <v-stepper-step step="2" editable :complete="step > 2">
          <span class="subheading">ACTIVIDAD CULTURAL</span>
        </v-stepper-step>
        <v-stepper-content step="2">
          <v-text-field label="Nombre artístico" v-model="nombreArtistico"></v-text-field>
          <v-select label="Tipo de actor cultural" v-model="tipoActividad" :items="items.tipoActividad" autocomplete></v-select>
          <v-select label="Actividad principal" v-model="actividadPrincipal" :items="items.ambitoActividad" autocomplete></v-select>
          <v-select label="Actividad secundaria" v-model="actividadSecundaria" :items="items.ambitoActividad" autocomplete></v-select>
          <v-select label="Postulaciones a financiamiento" v-model="postulacionesFinanciamiento" :items="items.postulacionesFinanciamiento" multiple chips autocomplete></v-select>
          <v-text-field label="Otras entidades que lo han apoyado" v-model="otrasEntidadesApoyo"></v-text-field>
          <v-select label="Obras registradas en el IEPI" v-model="obrasRegistradasIEPI" :items="items.siNo" autocomplete></v-select>
          <v-select label="Pertenece a una organización cultural" v-model="perteneceOrgCultural" :items="items.siNo" autocomplete></v-select>
          <v-flex class="text-xs-center">
            <v-btn outline class="deep-purple--text mt-2 mx-0" @click="step = 3">
              Continuar
              <v-icon class="deep-purple--text ml-1">expand_more</v-icon>
            </v-btn>
          </v-flex>
        </v-stepper-content>
        <!-- Trayectoria -->
        <v-stepper-step step="3" editable>
          <span class="subheading">PORTAFOLIO / TRAYECTORIA</span>
        </v-stepper-step>
        <v-stepper-content step="3">
          <v-text-field label="Logros alcanzados" v-model="logrosAlcanzados" hint="Publicaciones, galardones, reconocimientos, conciertos, grabaciones, festivales, entre otros." :persistent-hint="true" multi-line rows="3"></v-text-field>
          <v-text-field label="Proyectos culturales" v-model="proyectosCulturales" hint="Describir su vinculación con proyectos culturales." :persistent-hint="true" multi-line rows="3"></v-text-field>
          <v-text-field label="Formación y capacitación" v-model="formacionCapacitacion" hint="Talleres, cursos, diplomados, entre otros espacios que no generen título reconocido por la SENESCYT" :persistent-hint="true" multi-line rows="3"></v-text-field>
          <v-text-field label="Página web o blog" v-model="webBlog"></v-text-field>
          <v-text-field label="YouTube" v-model="youtube"></v-text-field>
          <v-text-field label="Facebook" v-model="facebook"></v-text-field>
          <v-text-field label="Twitter" v-model="twitter" class="mb-4"></v-text-field>
          <p class="subheading">
            Declaro que son ciertos, reales y verificables todos los datos consignados, haciéndome responsable de cualquier omisión o falsedad en la información solicitada:
          </p>
          <v-flex pl-0 class="text-xs-center">
            <v-select class="custom-select pt-0" v-model="declaracion" :items="items.declaracionSiNo"></v-select>
            <app-alert :alertType="alertType" :alertMessage="alertMessage" :alertDisplay="alertDisplay" @dismissed="dismissAlert"></app-alert>
            <v-btn type="submit" :disabled="loading || declaracion === 'No' ? true : false" :loading="loading" secondary class="mt-3 mx-0">
              Guardar perfil
              <span slot="loader" class="custom-loader">
                <v-icon light>cached</v-icon>
              </span>
            </v-btn>
          </v-flex>
        </v-stepper-content>
      </v-stepper>
    </form>
  </v-flex>
</template>

<script>
export default {
  $validates: true,
  data () {
    return {
      step: 1,
      showProvinciaCanton: false,
      items: {
        tipoAfiliado: [
          'Voluntario',
          'Dependiente'
        ],
        tipoActividad: [
          'Creador',
          'Productor',
          'Gestor cultural',
          'Técnico',
          'Otro trabajador de la cultura'
        ],
        ambitoActividad: [
          'Artes vivas y escénicas',
          'Artes plásticas y visuales',
          'Artes literarias, narrativas y producción editorial',
          'Artes cinematográficas y audiovisuales',
          'Artes musicales y sonoras',
          'Diseño y artes aplicadas',
          'Producción y gestión cultural',
          'Investigación, promoción y difusión',
          'Memoria social',
          'Patrimonio cultural',
          'Otras'
        ],
        postulacionesFinanciamiento: [
          'Fondos concursables del MCYP',
          'Auspicios del MCYP',
          'Fondo de fomento CNCine',
          'Financiamiento Foncultura'
        ],
        siNo: [
          'Si',
          'No'
        ],
        declaracionSiNo: [
          'Sí',
          'No'
        ]
      }
    }
  },
  computed: {
    cedula: {
      get () { return this.$store.state.cedula },
      set (value) { this.$store.commit('setCedula', value) }
    },
    nombre: {
      get () { return this.$store.state.nombre },
      set (value) { this.$store.commit('setNombre', value) }
    },
    fechaNacimiento: {
      get () { return this.$store.state.fechaNacimiento },
      set (value) { this.$store.commit('setFechaNacimiento', value) }
    },
    lugarNacimiento: {
      get () { return this.$store.state.lugarNacimiento },
      set (value) { this.$store.commit('setLugarNacimiento', value) }
    },
    nacionalidad: {
      get () { return this.$store.state.nacionalidad },
      set (value) { this.$store.commit('setNacionalidad', value) }
    },
    estadoAfiliado: {
      get () { return this.$store.state.estadoAfiliado },
      set (value) { this.$store.commit('setEstadoAfiliado', value) }
    },
    tipoAfiliado: {
      get () { return this.$store.state.tipoAfiliado },
      set (value) { this.$store.commit('setTipoAfiliado', value) }
    },
    titulosSenescyt: {
      get () { return this.$store.state.titulosSenescyt },
      set (value) { this.$store.commit('setTitulosSenescyt', value) }
    },
    email: {
      get () { return this.$store.state.email },
      set (value) { this.$store.commit('setEmail', value) }
    },
    telefonoFijo: {
      get () { return this.$store.state.telefonoFijo },
      set (value) { this.$store.commit('setTelefonoFijo', value) }
    },
    telefonoCelular: {
      get () { return this.$store.state.telefonoCelular },
      set (value) { this.$store.commit('setTelefonoCelular', value) }
    },
    paisDomicilio: {
      get () { return this.$store.state.paisDomicilio },
      set (value) { this.$store.commit('setPaisDomicilio', value) }
    },
    provinciaDomicilio: {
      get () { return this.$store.state.provinciaDomicilio },
      set (value) { this.$store.commit('setProvinciaDomicilio', value) }
    },
    cantonDomicilio: {
      get () { return this.$store.state.cantonDomicilio },
      set (value) { this.$store.commit('setCantonDomicilio', value) }
    },
    nombreArtistico: {
      get () { return this.$store.state.nombreArtistico },
      set (value) { this.$store.commit('setNombreArtistico', value) }
    },
    tipoActividad: {
      get () { return this.$store.state.tipoActividad },
      set (value) { this.$store.commit('setTipoActividad', value) }
    },
    actividadPrincipal: {
      get () { return this.$store.state.actividadPrincipal },
      set (value) { this.$store.commit('setActividadPrincipal', value) }
    },
    actividadSecundaria: {
      get () { return this.$store.state.actividadSecundaria },
      set (value) { this.$store.commit('setActividadSecundaria', value) }
    },
    postulacionesFinanciamiento: {
      get () { return this.$store.state.postulacionesFinanciamiento },
      set (value) { this.$store.commit('setPostulacionesFinanciamiento', value) }
    },
    otrasEntidadesApoyo: {
      get () { return this.$store.state.otrasEntidadesApoyo },
      set (value) { this.$store.commit('setOtrasEntidadesApoyo', value) }
    },
    obrasRegistradasIEPI: {
      get () { return this.$store.state.obrasRegistradasIEPI },
      set (value) { this.$store.commit('setObrasRegistradasIEPI', value) }
    },
    perteneceOrgCultural: {
      get () { return this.$store.state.perteneceOrgCultural },
      set (value) { this.$store.commit('setPerteneceOrgCultural', value) }
    },
    logrosAlcanzados: {
      get () { return this.$store.state.logrosAlcanzados },
      set (value) { this.$store.commit('setLogrosAlcanzados', value) }
    },
    proyectosCulturales: {
      get () { return this.$store.state.proyectosCulturales },
      set (value) { this.$store.commit('setProyectosCulturales', value) }
    },
    formacionCapacitacion: {
      get () { return this.$store.state.formacionCapacitacion },
      set (value) { this.$store.commit('setFormacionCapacitacion', value) }
    },
    webBlog: {
      get () { return this.$store.state.webBlog },
      set (value) { this.$store.commit('setWebBlog', value) }
    },
    youtube: {
      get () { return this.$store.state.youtube },
      set (value) { this.$store.commit('setYoutube', value) }
    },
    facebook: {
      get () { return this.$store.state.facebook },
      set (value) { this.$store.commit('setFacebook', value) }
    },
    twitter: {
      get () { return this.$store.state.twitter },
      set (value) { this.$store.commit('setTwitter', value) }
    },
    declaracion: {
      get () { return this.$store.state.declaracion },
      set (value) { this.$store.commit('setDeclaracion', value) }
    },
    paises () { return this.$store.state.paises.map((obj) => obj.pais) },
    provincias () { return this.$store.state.provincias },
    cantones () { return this.$store.state.cantones },
    loading () { return this.$store.state.loading },
    alertMessage () { return this.$store.state.alertMessage },
    alertDisplay () { return this.$store.state.alertDisplay },
    alertType () { return this.$store.state.alertType }
  },
  created () {
    this.$store.dispatch('paises')
    this.$store.dispatch('provincias')
  },
  methods: {
    onChangePaisDomicilio (pais) {
      this.provinciaDomicilio = null
      this.cantonDomicilio = null
      this.showProvinciaCanton = pais === 'Ecuador'
    },
    onChangeProvincia (codigoProvincia) {
      this.cantonDomicilio = null
      this.$store.dispatch('cantones', codigoProvincia)
    },
    async updateProfile () {
      const validForm = await this.$validator.validateAll()
      if (validForm) {
        try {
          const form = {
            cedula: this.cedula,
            nombre: this.nombre,
            fechaNacimiento: this.fechaNacimiento,
            lugarNacimiento: this.lugarNacimiento,
            nacionalidad: this.nacionalidad,
            estadoAfiliado: this.estadoAfiliado,
            tipoAfiliado: this.tipoAfiliado,
            titulosSenescyt: this.titulosSenescyt,
            email: this.email,
            telefonoFijo: this.telefonoFijo,
            telefonoCelular: this.telefonoCelular,
            paisDomicilio: this.paisDomicilio,
            provinciaDomicilio: this.provinciaDomicilio.provincia,
            cantonDomicilio: this.cantonDomicilio.canton,
            nombreArtistico: this.nombreArtistico,
            tipoActividad: this.tipoActividad,
            actividadPrincipal: this.actividadPrincipal,
            actividadSecundaria: this.actividadSecundaria,
            postulacionesFinanciamiento: this.postulacionesFinanciamiento,
            otrasEntidadesApoyo: this.otrasEntidadesApoyo,
            obrasRegistradasIEPI: this.obrasRegistradasIEPI,
            perteneceOrgCultural: this.perteneceOrgCultural,
            logrosAlcanzados: this.logrosAlcanzados,
            proyectosCulturales: this.proyectosCulturales,
            formacionCapacitacion: this.formacionCapacitacion,
            webBlog: this.webBlog,
            youtube: this.youtube,
            facebook: this.facebook,
            twitter: this.twitter,
            declaracion: this.declaracion
          }
          console.log(form)
          this.$store.commit('setLoading', true)
          this.dismissAlert()
          await this.$store.dispatch('updateProfile', form)
          this.$store.commit('setLoading', false)
          this.$store.commit('setAlert', {
            alertType: 'success',
            alertMessage: 'Perfil guardado exitosamente',
            alertDisplay: true
          })
        } catch (error) {
          this.$store.commit('setLoading', false)
          this.$store.commit('setAlert', {
            alertType: 'error',
            alertMessage: JSON.parse(JSON.stringify(error)).graphQLErrors[0].message,
            alertDisplay: true
          })
        }
      }
    },
    dismissAlert () {
      this.$store.commit('setAlert', { alertType: null, alertMessage: null, alertDisplay: false })
    }
  }
}
</script>

<style scoped>
.custom-select {
  width: 60px;
  font-weight: 500;
  margin: auto;
}
</style>
