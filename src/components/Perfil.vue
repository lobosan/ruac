<template>
  <v-flex xs12 sm10 md10 lg8 xl8>
    <form method="post" @submit.prevent="updateProfile(form)" autocomplete="off">
      <v-stepper v-model="step" vertical class="mb-4">
        <v-stepper-step step="1" editable :complete="step > 1">
          <span class="subheading">DATOS GENERALES</span>
        </v-stepper-step>
        <!-- Datos Generales -->
        <v-stepper-content step="1">
          <v-text-field label="Número de cédula" v-model="form.cedula" disabled></v-text-field>
          <v-text-field label="Nombre completo" v-model="form.nombre" disabled></v-text-field>
          <v-text-field label="Fecha de nacimiento" v-model="form.fechaNacimiento" disabled></v-text-field>
          <v-text-field label="Lugar de nacimiento" v-model="form.lugarNacimiento" disabled></v-text-field>
          <v-text-field label="Nacionalidad" v-model="form.nacionalidad" disabled></v-text-field>
          <v-text-field label="Estado de afiliación al IESS" v-model="form.estadoAfiliado" disabled></v-text-field>
          <v-select label="Tipo de afiliación al IESS" v-model="form.tipoAfiliado" :items="tipoAfiliado" autocomplete></v-select>
          <v-select label="Títulos registrados en la SENESCYT" v-model="form.titulosSenescyt" chips tags readonly disabled></v-select>
          <v-text-field label="Email de Contacto" v-model="form.email"></v-text-field>
          <v-text-field label="Teléfono Fijo de Contacto" v-model="form.telefonoFijo"></v-text-field>
          <v-text-field label="Teléfono Celular de Contacto" v-model="form.telefonoCelular"></v-text-field>
          <v-select label="País de domicilio" v-model="form.paisDomicilio" :items="paises" @change="onChangePaisDomicilio($event)"></v-select>
          <v-select v-show="showProvinciaCanton" label="Provincia de domicilio" v-model="form.provinciaDomicilioObj" :items="provincias" item-text="provincia" item-value="codigoProvincia" return-object @change="onChangeProvincia($event.codigoProvincia)"></v-select>
          <v-select v-show="showProvinciaCanton" label="Cantón de domicilio" v-model="form.cantonDomicilioObj" :items="cantones" item-text="canton" item-value="codigoCanton" return-object></v-select>
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
          <v-text-field label="Nombre artístico" v-model="form.nombreArtistico"></v-text-field>
          <v-select label="Tipo de actor cultural" v-model="form.tipoActividad" :items="tipoActividad" autocomplete></v-select>
          <v-select label="Actividad principal" v-model="form.actividadPrincipal" :items="ambitoActividad" autocomplete></v-select>
          <v-select label="Actividad secundaria" v-model="form.actividadSecundaria" :items="ambitoActividad" autocomplete></v-select>
          <v-select label="Postulaciones a financiamiento" v-model="form.postulacionesFinanciamiento" :items="postulacionesFinanciamiento" multiple chips autocomplete></v-select>
          <v-text-field label="Otras entidades que lo han apoyado" v-model="form.otrasEntidadesApoyo"></v-text-field>
          <v-select label="Obras registradas en el IEPI" v-model="form.obrasRegistradasIEPI" :items="siNo" autocomplete></v-select>
          <v-select label="Pertenece a una organización cultural" v-model="form.perteneceOrgCultural" :items="siNo" autocomplete></v-select>
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
          <v-text-field label="Logros alcanzados" v-model="form.logrosAlcanzados" hint="Publicaciones, galardones, reconocimientos, conciertos, grabaciones, festivales, entre otros." :persistent-hint="true" multi-line rows="3"></v-text-field>
          <v-text-field label="Proyectos culturales" v-model="form.proyectosCulturales" hint="Describir su vinculación con proyectos culturales." :persistent-hint="true" multi-line rows="3"></v-text-field>
          <v-text-field label="Formación y capacitación" v-model="form.formacionCapacitacion" hint="Talleres, cursos, diplomados, entre otros espacios que no generen título reconocido por la SENESCYT" :persistent-hint="true" multi-line rows="3"></v-text-field>
          <v-text-field label="Página web o blog" v-model="form.webBlog"></v-text-field>
          <v-text-field label="YouTube" v-model="form.youtube"></v-text-field>
          <v-text-field label="Facebook" v-model="form.facebook"></v-text-field>
          <v-text-field label="Twitter" v-model="form.twitter" class="mb-4"></v-text-field>
          <p class="subheading">
            Declaro que son ciertos, reales y verificables todos los datos consignados, haciéndome responsable de cualquier omisión o falsedad en la información solicitada:
          </p>
          <v-flex pl-0 class="text-xs-center">
            <v-select class="custom-select pt-0" v-model="form.declaracion" :items="declaracionSiNo"></v-select>
            <app-alert :alertType="alertType" :alertMessage="alertMessage" :alertDisplay="alertDisplay" @dismissed="dismissAlert"></app-alert>
            <v-btn type="submit" :disabled="loading || form.declaracion === 'No' ? true : false" :loading="loading" secondary class="mt-3 mx-0">
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
      form: {
        ...this.$store.state.user
      },
      step: 1,
      showProvinciaCanton: false,
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
  },
  computed: {
    paises () {
      return this.$store.state.paises.map(obj => obj.pais)
    },
    provincias () {
      return this.$store.state.provincias
    },
    cantones () {
      return this.$store.state.cantones
    },
    loading () {
      return this.$store.state.loading
    },
    alertMessage () {
      return this.$store.state.alertMessage
    },
    alertDisplay () {
      return this.$store.state.alertDisplay
    },
    alertType () {
      return this.$store.state.alertType
    }
  },
  created () {
    this.$store.dispatch('paises')
    this.$store.dispatch('provincias')
    if (this.form.paisDomicilio === 'Ecuador') {
      this.$store.dispatch('cantones', this.form.codigoProvinciaDomicilio)
      this.showProvinciaCanton = true
      this.form.provinciaDomicilioObj = {
        codigoProvincia: this.form.codigoProvinciaDomicilio,
        provincia: this.form.provinciaDomicilio
      }
      this.form.cantonDomicilioObj = {
        codigoCanton: this.form.codigoCantonDomicilio,
        canton: this.form.cantonDomicilio
      }
    }
  },
  methods: {
    onChangePaisDomicilio (pais) {
      this.form.provinciaDomicilioObj = null
      this.form.cantonDomicilioObj = null
      this.showProvinciaCanton = pais === 'Ecuador'
    },
    onChangeProvincia (codigoProvincia) {
      this.form.cantonDomicilioObj = null
      this.$store.dispatch('cantones', codigoProvincia)
    },
    async updateProfile (form) {
      const validForm = await this.$validator.validateAll()
      if (validForm) {
        try {
          this.$store.commit('setLoading', true)
          this.dismissAlert()
          await this.$store.dispatch('updateProfile', form)
          this.$store.commit('setUser', form)
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
