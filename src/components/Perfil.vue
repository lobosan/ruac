<template>
  <v-progress-circular
    v-if="initialLoading"
    color="primary"
    size="70"
    indeterminate>
  </v-progress-circular>
  <v-flex v-else xs12 sm11 md11 lg10 xl10>
    <app-dialog
      :dialogDisplay="dialogDisplay"
      :dialogColor="dialogColor"
      :dialogTitle="dialogTitle"
      :dialogText="dialogText">
    </app-dialog>
    <form
      method="post"
      autocomplete="off">
      <v-stepper
        v-model="step"
        vertical
        class="mb-4">
        <p class="title primary--text text-xs-center px-4 pt-4">
          {{ form.nombre }}
        </p>
        <p class="subheading error--text text-xs-center px-4">
          Perfil Registrado
        </p>
        <v-stepper-step
          step="1"
          editable
          :complete="step > 1">
          DATOS GENERALES
        </v-stepper-step>
        <!-- Datos Generales -->
        <v-stepper-content step="1">
          <v-text-field
            label="Número de Cédula"
            v-model="form.cedula"
            disabled>
          </v-text-field>
          <v-text-field
            label="Sexo"
            v-model="form.sexo"
            disabled>
          </v-text-field>
          <v-text-field
            label="Nacionalidad"
            v-model="form.nacionalidad"
            disabled>
          </v-text-field>
          <v-text-field
            label="Lugar de Nacimiento"
            v-model="form.lugarNacimiento"
            disabled>
          </v-text-field>
          <v-text-field
            label="Fecha de Nacimiento"
            v-model="form.fechaNacimiento"
            disabled>
          </v-text-field>
          <v-select
            label="Títulos Registrados en la SENESCYT"
            v-model="form.titulosSenescyt"
            chips
            tags
            readonly
            disabled>
          </v-select>
          <v-text-field
            label="Estado de Afiliación al IESS"
            v-model="form.estadoAfiliado"
            disabled>
          </v-text-field>
          <v-select
            v-validate="'required'"
            v-model="form.tipoAfiliado"
            name="tipoAfiliado"
            label="Tipo de Afiliación al IESS"
            data-vv-as="Tipo de Afiliación al IESS"
            autocomplete
            :items="items.tipoAfiliado"
            :error-messages="errors.collect('tipoAfiliado')"
            >
          </v-select>
          <v-text-field
            v-validate="'required|email'"
            v-model="form.email"
            name="email"
            label="Email de Contacto"
            data-vv-as="Email de Contacto"
            :error-messages="errors.collect('email')">
          </v-text-field>
          <v-text-field
            v-validate="{ regex: /^0[2-7]{1}\d{7}(\sext\s\d{3,6})?$/ }"
            v-model="form.telefonoFijo"
            name="telefonoFijo"
            label="Teléfono Fijo de Contacto"
            data-vv-as="Teléfono Fijo de Contacto"
            hint="Ej. 022585623 ext 123456"
            maxlength="20"
            :error-messages="errors.collect('telefonoFijo')">
          </v-text-field>
          <v-text-field
            v-validate="{ regex: /^0[9]{1}\d{8}$/ }"
            v-model="form.telefonoCelular"
            name="telefonoCelular"
            label="Teléfono Celular de Contacto"
            data-vv-as="Teléfono Celular de Contacto"
            hint="Ej. 0983507946"
            mask="##########"
            maxlength="10"
            :error-messages="errors.collect('telefonoCelular')">
          </v-text-field>
          <v-select
            v-validate="'required'"
            v-model="form.paisDomicilio"
            name="paisDomicilio"
            label="País de Domicilio"
            data-vv-as="País de Domicilio"
            autocomplete
            :items="paises"
            :error-messages="errors.collect('paisDomicilio')"
            @change="onChangePaisDomicilio">
          </v-select>
          <v-select
            v-show="showProvinciaCanton"
            v-model="form.provinciaDomicilio"
            name="provinciaDomicilio"
            label="Provincia de Domicilio"
            item-text="descripcion"
            item-value="codigo"
            autocomplete
            return-object
            :items="items.provincias"
            @change="onChangeProvincia">
          </v-select>
          <v-select
            v-show="showProvinciaCanton"
            v-model="form.cantonDomicilio"
            name="cantonDomicilio"
            label="Cantón de Domicilio"
            item-text="descripcion"
            item-value="codigo"
            autocomplete
            return-object
            :items="items.cantones">
          </v-select>
          <v-flex class="text-xs-center">
            <v-btn
              class="mt-2 mx-0"
              color="primary"
              outline
              @click="step = 2">
              Continuar
              <v-icon>expand_more</v-icon>
            </v-btn>
          </v-flex>
        </v-stepper-content>
        <!-- Actividad Cultural -->
        <v-stepper-step
          step="2"
          editable
          :complete="step > 2">
          ACTIVIDAD CULTURAL
        </v-stepper-step>
        <v-stepper-content step="2">
          <v-text-field
            v-model="form.nombreArtistico"
            label="Nombre Artístico">
          </v-text-field>
          <v-select
            v-validate="'required'"
            v-model="form.tipoActorCultural"
            name="tipoActorCultural"
            label="Tipo de Actor Cultural"
            data-vv-as="Tipo de Actor Cultural"
            autocomplete
            :items="items.tipoActorCultural"
            :error-messages="errors.collect('tipoActorCultural')">
          </v-select>
          <v-select
            v-validate="'required'"
            v-model="form.actividadPrincipal"
            name="actividadPrincipal"
            label="Actividad Principal"
            data-vv-as="Actividad Principal"
            autocomplete
            :items="items.ambitoActividad"
            :error-messages="errors.collect('actividadPrincipal')">
          </v-select>
          <v-select
            v-model="form.actividadSecundaria"
            label="Actividad Secundaria"
            autocomplete
            :items="items.ambitoActividad">
          </v-select>
          <v-select
            v-validate="'required'"
            v-model="form.perteneceOrgCultural"
            name="perteneceOrgCultural"
            label="Pertenece a una Organización Cultural"
            data-vv-as="Pertenece a una Organización Cultural"
            autocomplete
            :items="items.siNo"
            :error-messages="errors.collect('perteneceOrgCultural')">
          </v-select>
          <v-select
            v-validate="'required'"
            v-model="form.obrasRegistradasIEPI"
            name="obrasRegistradasIEPI"
            label="Tiene Obras Registradas en el IEPI"
            data-vv-as="Tiene Obras Registradas en el IEPI"
            autocomplete
            :items="items.siNo"
            :error-messages="errors.collect('obrasRegistradasIEPI')">
          </v-select>
          <label class="custom_label">
            Postulaciones a Mecanismos de Fomento
          </label>
          <v-checkbox
            v-model="form.fondosConcursables"
            name="fondosConcursables"
            label="Fondos Concursables del MCYP"
            data-vv-as="Fondos Concursables del MCYP"
            class="custom_checkbox"
            false-value="No"
            true-value="Si"
            :error-messages="errors.collect('fondosConcursables')">
          </v-checkbox>
          <v-checkbox
            v-model="form.auspicios"
            name="auspicios"
            label="Auspicios del MCYP"
            data-vv-as="Auspicios del MCYP"
            class="custom_checkbox"
            false-value="No"
            true-value="Si"
            :error-messages="errors.collect('auspicios')">
          </v-checkbox>
          <v-checkbox
            v-model="form.cncine"
            name="cncine"
            label="Fondo de Fomento CNCine"
            data-vv-as="Fondo de Fomento CNCine"
            class="custom_checkbox"
            false-value="No"
            true-value="Si"
            :error-messages="errors.collect('cncine')">
          </v-checkbox>
          <v-checkbox
            v-model="form.foncultura"
            name="foncultura"
            label="Financiamiento Foncultura"
            data-vv-as="Financiamiento Foncultura"
            class="custom_checkbox"
            false-value="No"
            true-value="Si"
            :error-messages="errors.collect('foncultura')">
          </v-checkbox>
          <v-text-field
            v-model="form.otrasEntidadesApoyo"
            label="Otras Entidades que lo han Apoyado">
          </v-text-field>
          <v-flex class="text-xs-center">
            <v-btn
              class="mt-2 mx-0"
              color="primary"
              outline
              @click="step = 3">
              Continuar
              <v-icon>expand_more</v-icon>
            </v-btn>
          </v-flex>
        </v-stepper-content>
        <!-- Trayectoria -->
        <v-stepper-step
          step="3"
          editable>
          PORTAFOLIO / TRAYECTORIA
        </v-stepper-step>
        <v-stepper-content step="3">
          <v-text-field
            v-model="form.logrosAlcanzados"
            label="Logros Alcanzados"
            placeholder="Publicaciones, galardones, reconocimientos, conciertos, grabaciones, festivales, entre otros."
            rows="3"
            multi-line>
          </v-text-field>
          <v-text-field
            v-model="form.proyectosCulturales"
            label="Proyectos Culturales"
            placeholder="Describir su vinculación con proyectos culturales."
            rows="3"
            multi-line>
          </v-text-field>
          <v-text-field
            v-model="form.formacionCapacitacion"
            label="Formación y Capacitación"
            placeholder="Talleres, cursos, diplomados, entre otros espacios que no generen título reconocido por la SENESCYT"
            rows="3"
            multi-line>
          </v-text-field>
          <v-text-field
            v-validate="'url'"
            v-model="form.webBlog"
            name="webBlog"
            label="Página Web o Blog"
            data-vv-as="Página Web o Blog"
            :error-messages="errors.collect('webBlog')">
          </v-text-field>
          <v-text-field
            v-validate="'url'"
            v-model="form.youtube"
            name="youtube"
            label="YouTube"
            data-vv-as="YouTube"
            :error-messages="errors.collect('youtube')">
          </v-text-field>
          <v-text-field
            v-validate="'url'"
            v-model="form.facebook"
            name="facebook"
            label="Facebook"
            data-vv-as="Facebook"
            :error-messages="errors.collect('facebook')">
          </v-text-field>
          <v-text-field
            v-validate="'url'"
            v-model="form.twitter"
            name="twitter"
            label="Twitter"
            data-vv-as="Twitter"
            class="mb-4"
            :error-messages="errors.collect('twitter')">
          </v-text-field>
        </v-stepper-content>
      </v-stepper>
    </form>
    <v-tooltip left>
      <v-btn
        color="info"
        slot="activator"
        large fixed dark fab bottom right
        @click="validateForm">
        <v-icon>save</v-icon>
      </v-btn>
      <span>Actualizar Perfil</span>
    </v-tooltip>
    <v-dialog
      v-model="updateProfileDialog"
      max-width="330">
      <v-card class="px-2 pt-3 pb-4">
        <v-card-title class="headline">
          <v-flex class="text-xs-center">
            Actualizar Perfil
          </v-flex>
        </v-card-title>
        <v-card-text class="pt-2 text-xs-center">
          Declaro que son ciertos, reales y verificables todos los datos consignados, haciéndome responsable de cualquier omisión o falsedad en la información solicitada.
        </v-card-text>
        <v-card-actions>
          <v-flex class="ma-1 text-xs-center">
            <v-btn
              class="mr-4"
              :disabled="loading"
              @click="updateProfileDialog = false">
              No
            </v-btn>
            <v-btn
              color="info"
              dark
              :disabled="loading"
              :loading="loading"
              @click="updateProfile(form)">
              Sí
            </v-btn>
          </v-flex>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-flex>
</template>

<script>
import { mapState } from 'vuex'
import { filter, startsWith, omit } from 'lodash'

export default {
  $_veeValidate: {
    validator: 'new'
  },
  data () {
    return {
      initialLoading: false,
      form: null,
      step: 1,
      showProvinciaCanton: false,
      updateProfileDialog: false,
      items: {
        provincias: [],
        cantones: [],
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
        siNo: [
          'Si',
          'No'
        ]
      }
    }
  },
  async created () {
    try {
      this.initialLoading = true
      await this.$store.dispatch('perfil')
      this.items.provincias = filter(this.$store.state.dpa, row => row.codigo.length === 2)
      this.form = { ...this.$store.state.user }
      if (this.$store.state.user.paisDomicilio === 'Ecuador') {
        this.showProvinciaCanton = true
      }
      if (this.form.provinciaDomicilio) {
        const codigo = this.form.provinciaDomicilio.codigo
        this.items.cantones = filter(this.$store.state.dpa, row => {
          return startsWith(row.codigo, codigo) && row.codigo.length === 4
        })
      }
      this.initialLoading = false
    } catch (error) {
      this.initialLoading = false
      this.$store.dispatch('handleError', error)
    }
  },
  computed: mapState([
    'loading',
    'paises',
    'dpa',
    'dialogDisplay',
    'dialogColor',
    'dialogTitle',
    'dialogText'
  ]),
  methods: {
    onChangePaisDomicilio (pais) {
      if (pais) {
        this.showProvinciaCanton = pais === 'Ecuador'
        this.form.provinciaDomicilio = null
        this.form.cantonDomicilio = null
      }
    },
    onChangeProvincia ({codigo}) {
      if (codigo) {
        this.form.cantonDomicilio = null
        this.items.cantones = filter(this.$store.state.dpa, row => {
          return startsWith(row.codigo, codigo) && row.codigo.length === 4
        })
      }
    },
    async validateForm () {
      const validForm = await this.$validator.validateAll()
      if (validForm) {
        this.updateProfileDialog = true
      } else {
        this.updateProfileDialog = false
        this.$store.commit('setErrorDialog', 'Existen problemas con sus datos, por favor corríjalos.')
      }
      return validForm
    },
    async updateProfile (form) {
      try {
        this.$store.commit('setLoading', true)
        const deleteProperties = [
          'nombre',
          'fechaNacimiento',
          'lugarNacimiento',
          'nacionalidad',
          'sexo',
          'estadoAfiliado',
          'titulosSenescyt',
          '__typename',
          'provinciaDomicilio["__typename"]',
          'cantonDomicilio["__typename"]'
        ]
        const profile = omit(form, deleteProperties)
        await this.$store.dispatch('updateProfile', profile)
        this.$store.commit('setUser', form)
        this.$store.commit('setLoading', false)
        this.updateProfileDialog = false
        this.$store.commit('setSuccessDialog', 'Su perfil ha sido actualizado correctamente.')
      } catch (error) {
        this.$store.commit('setLoading', false)
        this.updateProfileDialog = false
        this.$store.dispatch('handleError', error)
      }
    }
  }
}
</script>

<style>
.custom_label {
  color: rgba(0,0,0,0.54);
  font-size: 12px;
}
.custom_checkbox > label {
  color: rgba(0,0,0,0.87) !important;
  height: 40px !important;
}
</style>
