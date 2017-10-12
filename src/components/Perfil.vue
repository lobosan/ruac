<template>
  <v-flex xs12 sm11 md11 lg10 xl10>
    <form method="post" autocomplete="off">
      <v-stepper v-model="step" vertical class="mb-4">
        <v-stepper-step step="1" editable :complete="step > 1">
          <span class="subheading">DATOS GENERALES</span>
        </v-stepper-step>
        <!-- Datos Generales -->
        <v-stepper-content step="1">
          <v-text-field label="Número de Cédula" v-model="form.cedula" disabled></v-text-field>
          <v-text-field label="Nombre Completo" v-model="form.nombre" disabled></v-text-field>
          <v-text-field label="Fecha de Nacimiento" v-model="form.fechaNacimiento" disabled></v-text-field>
          <v-text-field label="Lugar de Nacimiento" v-model="form.lugarNacimiento" disabled></v-text-field>
          <v-text-field label="Nacionalidad" v-model="form.nacionalidad" disabled></v-text-field>
          <v-text-field label="Estado de Afiliación al IESS" v-model="form.estadoAfiliado" disabled></v-text-field>
          <v-select label="Tipo de Afiliación al IESS" v-model="form.tipoAfiliado" :items="items.tipoAfiliado" autocomplete name="tipoAfiliado" :error-messages="errors.collect('tipoAfiliado')" v-validate="'required'" data-vv-as="Tipo de Afiliación al IESS"></v-select>
          <v-select label="Títulos Registrados en la SENESCYT" v-model="form.titulosSenescyt" chips tags readonly disabled></v-select>
          <v-text-field label="Email de Contacto" v-model="form.email" name="email" :error-messages="errors.collect('email')" v-validate="'required|email'" data-vv-as="Email"></v-text-field>
          <v-text-field label="Teléfono Fijo de Contacto" v-model="form.telefonoFijo" name="telefonoFijo" maxlength="20" :error-messages="errors.collect('telefonoFijo')" v-validate="{ regex: /^0[2-7]{1}\d{7}(\sext\s\d{3,6})?$/ }" data-vv-as="Teléfono Fijo de Contacto" hint="Código de provincia, número y extensión opcional. Ej. 022585623 ext 123456"></v-text-field>
          <v-text-field label="Teléfono Celular de Contacto" v-model="form.telefonoCelular" name="telefonoCelular" maxlength="10" :error-messages="errors.collect('telefonoCelular')" v-validate="{ regex: /^0[8-9]{1}\d{8}$/ }" hint="Ej. 0983507946" data-vv-as="Teléfono Celular de Contacto"></v-text-field>
          <v-select label="País de Domicilio" v-model="form.paisDomicilio" :items="paises" @change="onChangePaisDomicilio($event)" autocomplete name="paisDomicilio" :error-messages="errors.collect('paisDomicilio')" v-validate="'required'" data-vv-as="País de Domicilio"></v-select>
          <v-select v-show="showProvinciaCanton" label="Provincia de Domicilio" v-model="form.provinciaDomicilioObj" :items="provincias" item-text="provincia" item-value="codigoProvincia" return-object @change="onChangeProvincia($event.codigoProvincia)" autocomplete></v-select>
          <v-select v-show="showProvinciaCanton" label="Cantón de Domicilio" v-model="form.cantonDomicilioObj" :items="cantones" item-text="canton" item-value="codigoCanton" return-object autocomplete></v-select>
          <v-flex class="text-xs-center">
            <v-btn outline color="primary" class="mt-2 mx-0" @click="step = 2">
              Continuar
              <v-icon class="ml-1">expand_more</v-icon>
            </v-btn>
          </v-flex>
        </v-stepper-content>
        <!-- Actividad Cultural -->
        <v-stepper-step step="2" editable :complete="step > 2">
          <span class="subheading">ACTIVIDAD CULTURAL</span>
        </v-stepper-step>
        <v-stepper-content step="2">
          <v-text-field label="Nombre Artístico" v-model="form.nombreArtistico"></v-text-field>
          <v-select label="Tipo de Actor Cultural" v-model="form.tipoActorCultural" :items="items.tipoActorCultural" autocomplete name="tipoActorCultural" :error-messages="errors.collect('tipoActorCultural')" v-validate="'required'" data-vv-as="Tipo de Actor Cultural"></v-select>
          <v-select label="Actividad Principal" v-model="form.actividadPrincipal" :items="items.ambitoActividad" autocomplete name="actividadPrincipal" :error-messages="errors.collect('actividadPrincipal')" v-validate="'required'" data-vv-as="Actividad Principal"></v-select>
          <v-select label="Actividad Secundaria" v-model="form.actividadSecundaria" :items="items.ambitoActividad" autocomplete></v-select>
          <v-select label="Postulaciones a Financiamiento" v-model="form.postulacionesFinanciamiento" :items="items.postulacionesFinanciamiento" multiple chips autocomplete></v-select>
          <v-text-field label="Otras Entidades que lo han Apoyado" v-model="form.otrasEntidadesApoyo"></v-text-field>
          <v-select label="Obras Registradas en el IEPI" v-model="form.obrasRegistradasIEPI" :items="items.siNo" autocomplete name="obrasRegistradasIEPI" :error-messages="errors.collect('obrasRegistradasIEPI')" v-validate="'required'" data-vv-as="Obras Registradas en el IEPI"></v-select>
          <v-select label="Pertenece a una Organización Cultural" v-model="form.perteneceOrgCultural" :items="items.siNo" autocomplete name="perteneceOrgCultural" :error-messages="errors.collect('perteneceOrgCultural')" v-validate="'required'" data-vv-as="Pertenece a una Organización Cultural"></v-select>
          <v-flex class="text-xs-center">
            <v-btn outline color="primary" class="mt-2 mx-0" @click="step = 3">
              Continuar
              <v-icon class="ml-1">expand_more</v-icon>
            </v-btn>
          </v-flex>
        </v-stepper-content>
        <!-- Trayectoria -->
        <v-stepper-step step="3" editable>
          <span class="subheading">PORTAFOLIO / TRAYECTORIA</span>
        </v-stepper-step>
        <v-stepper-content step="3">
          <v-text-field label="Logros Alcanzados" v-model="form.logrosAlcanzados" hint="Publicaciones, galardones, reconocimientos, conciertos, grabaciones, festivales, entre otros." multi-line rows="3"></v-text-field>
          <v-text-field label="Proyectos Culturales" v-model="form.proyectosCulturales" hint="Describir su vinculación con proyectos culturales." multi-line rows="3"></v-text-field>
          <v-text-field label="Formación y Capacitación" v-model="form.formacionCapacitacion" hint="Talleres, cursos, diplomados, entre otros espacios que no generen título reconocido por la SENESCYT" multi-line rows="3"></v-text-field>
          <v-text-field label="Página Web o Blog" v-model="form.webBlog" name="webBlog" :error-messages="errors.collect('webBlog')" v-validate="'url'" data-vv-as="Página Web o Blog"></v-text-field>
          <v-text-field label="YouTube" v-model="form.youtube" name="youtube" :error-messages="errors.collect('youtube')" v-validate="'url'" data-vv-as="YouTube"></v-text-field>
          <v-text-field label="Facebook" v-model="form.facebook" name="facebook" :error-messages="errors.collect('facebook')" v-validate="'url'" data-vv-as="Facebook"></v-text-field>
          <v-text-field label="Twitter" v-model="form.twitter" name="twitter" :error-messages="errors.collect('twitter')" v-validate="'url'" data-vv-as="Twitter" class="mb-4"></v-text-field>
        </v-stepper-content>
      </v-stepper>
    </form>
    <v-tooltip top>
      <v-btn large fixed dark fab bottom right color="accent" slot="activator" @click="validateForm">
        <v-icon>save</v-icon>
      </v-btn>
      <span>Guardar Perfil</span>
    </v-tooltip>
    <v-dialog v-model="dialog">
      <v-card class="pa-3">
        <v-card-title class="headline">Guardar Perfil</v-card-title>
        <v-card-text>
          Declaro que son ciertos, reales y verificables todos los datos consignados, haciéndome responsable de cualquier omisión o falsedad en la información solicitada.
        </v-card-text>
        <v-card-actions>
          <v-btn :disabled="loading" @click="dialog = false">No</v-btn>
          <v-spacer></v-spacer>
          <v-btn dark color="accent" :disabled="loading" :loading="loading" @click="updateProfile(form)">Sí</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar :color="snackbar.color" top :timeout="snackbar.timeout" v-model="snackbar.display">
      <v-icon class="mr-3">{{ snackbar.icon }}</v-icon>
      {{ snackbar.message }}
    </v-snackbar>
  </v-flex>
</template>

<script>
export default {
  $validates: true,
  data () {
    return {
      step: 1,
      showProvinciaCanton: false,
      dialog: false,
      snackbar: {
        display: false,
        color: null,
        icon: null,
        timeout: null,
        message: null
      },
      form: {
        ...this.$store.state.user
      },
      items: {
        tipoAfiliado: [
          'Voluntario',
          'Dependiente'
        ],
        tipoActorCultural: [
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
        ]
      }
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
    alertColor () {
      return this.$store.state.alertColor
    },
    alertIcon () {
      return this.$store.state.alertIcon
    },
    alertMessage () {
      return this.$store.state.alertMessage
    },
    alertDisplay () {
      return this.$store.state.alertDisplay
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
      if (pais) {
        this.form.provinciaDomicilioObj = null
        this.form.cantonDomicilioObj = null
        this.showProvinciaCanton = pais === 'Ecuador'
      }
    },
    onChangeProvincia (codigoProvincia) {
      this.form.cantonDomicilioObj = null
      if (codigoProvincia) {
        this.$store.dispatch('cantones', codigoProvincia)
      }
    },
    async validateForm () {
      const validForm = await this.$validator.validateAll()
      if (validForm) {
        this.dialog = true
      } else {
        this.dialog = false
        this.snackbar = {
          display: true,
          color: 'error',
          icon: 'warning',
          timeout: 5000,
          message: 'Error al guardar sus datos, por favor corríjalos.'
        }
      }
      return validForm
    },
    async updateProfile (form) {
      try {
        this.$store.commit('setLoading', true)
        await this.$store.dispatch('updateProfile', form)
        this.$store.commit('setUser', form)
        this.$store.commit('setLoading', false)
        this.dialog = false
        this.snackbar = {
          display: true,
          color: 'success',
          icon: 'check_circle',
          timeout: 3000,
          message: 'Datos Guardados Exitosamente.'
        }
      } catch (error) {
        this.$store.commit('setLoading', false)
        this.dialog = false
        this.snackbar = {
          display: true,
          color: 'error',
          icon: 'warning',
          timeout: 5000,
          message: 'Error al guardar datos. Por favor, inténtelo más tarde.'
        }
        console.log(JSON.parse(JSON.stringify(error)).message)
      }
    }
  }
}
</script>
