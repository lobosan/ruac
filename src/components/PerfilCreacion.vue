<template>
  <v-flex xs12 sm10 md10 lg8 xl8>
    <v-stepper v-model="step" vertical>
      <v-stepper-step step="1" editable :complete="step > 1">
        <span class="subheading deep-purple--text">DATOS GENERALES</span>
      </v-stepper-step>
      <!-- Datos Generales -->
      <v-stepper-content step="1">
        <v-text-field label="Número de cédula" v-model="perfil.cedula" disabled></v-text-field>
        <v-text-field label="Nombre completo" v-model="perfil.nombreCompleto" disabled></v-text-field>
        <v-text-field label="Fecha de nacimiento" v-model="perfil.fechaNacimiento" disabled></v-text-field>
        <v-text-field label="Lugar de nacimiento" v-model="perfil.lugarNacimiento" disabled></v-text-field>
        <v-text-field label="Nacionalidad" v-model="perfil.nacionalidad" disabled></v-text-field>
        <v-text-field label="Título registrado en la SENESCYT" v-model="perfil.tituloSenescyt" disabled></v-text-field>
        <v-text-field label="Nombre artístico"></v-text-field>
        <v-select label="País de domicilio" :items="paises"></v-select>
        <v-select label="Provincia de domicilio" :items="provincias"></v-select>
        <v-select label="Cantón de domicilio" :items="cantones"></v-select>
        <v-text-field label="Teléfono de contacto"></v-text-field>
        <v-btn outline class="deep-purple--text my-3" @click="step = 2">
          Continuar
          <v-icon class="deep-purple--text">navigate_next</v-icon>
        </v-btn>
      </v-stepper-content>
      <!-- Actividad Cultural -->
      <v-stepper-step step="2" editable :complete="step > 2">
        <span class="subheading deep-purple--text">ACTIVIDAD CULTURAL</span>
      </v-stepper-step>
      <v-stepper-content step="2">
        <v-select label="Tipo de actor cultural" :items="tipoActividad"></v-select>
        <v-select label="Actividad principal" :items="ambitoActividad"></v-select>
        <v-select label="Actividad secundaria" :items="ambitoActividad"></v-select>
        <v-select label="Postulaciones a financiamiento" :items="mecanismosFomento" multiple chips></v-select>
        <v-text-field label="Otras entidades que lo han apoyado"></v-text-field>
        <v-select label="Obras registradas en el IEPI" :items="siNo"></v-select>
        <v-select label="Pertenece a una organización cultural" :items="siNo"></v-select>
        <v-select label="Afiliado a seguridad social" :items="siNo"></v-select>
        <v-select label="Tipo de seguridad social" :items="tipoSeguridadSocial"></v-select>
        <v-btn outline class="deep-purple--text my-3" @click="step = 3">
          Continuar
          <v-icon class="deep-purple--text">navigate_next</v-icon>
        </v-btn>
      </v-stepper-content>
      <!-- Trayectoria -->
      <v-stepper-step step="3" editable>
        <span class="subheading deep-purple--text">PORTAFOLIO / TRAYECTORIA</span>
      </v-stepper-step>
      <v-stepper-content step="3">
        <v-text-field label="Logros alcanzados"
          hint="Publicaciones, galardones, reconocimientos, conciertos, grabaciones, festivales, entre otros."
          :persistent-hint="true"
          multi-line rows="3"></v-text-field>
        <v-text-field label="Proyectos culturales"
          hint="Describir su vinculación con proyectos culturales."
          :persistent-hint="true"
          multi-line rows="3"></v-text-field>
        <v-text-field label="Formación y capacitación"
          hint="Talleres, cursos, diplomados, entre otros espacios que no generen título reconocido por la SENESCYT"
          :persistent-hint="true"
          multi-line rows="3"></v-text-field>
        <v-text-field label="Página web o blog"></v-text-field>
        <v-text-field label="YouTube"></v-text-field>
        <v-text-field label="Facebook"></v-text-field>
        <v-text-field label="Twitter" class="mb-4"></v-text-field>
        <label class="subheading">
          Declaro que son ciertos, reales y verificables todos los datos consignados, haciéndome responsable de cualquier omisión o falsedad en la información solicitada:
          <v-select class="custom-select" :items="declaracionSiNo" v-model="declaracion"></v-select>
        </label>
        <v-flex my-3 pl-0>
          <v-btn primary :disabled="declaracion === 'No' ? true : false">
            <v-icon left dark>save</v-icon>
            Guardar perfil
          </v-btn>
        </v-flex>
      </v-stepper-content>
    </v-stepper>
  </v-flex>
</template>

<script>
export default {
  data: () => ({
    step: 1,
    declaracion: 'No',
    declaracionSiNo: [
      'Sí',
      'No'
    ]
  }),
  computed: {
    perfil() {
      return this.$store.getters.perfilCreacionPerfil
    },
    paises() {
      return this.$store.getters.perfilCreacionPaises
    },
    provincias() {
      return this.$store.getters.perfilCreacionProvincias
    },
    cantones() {
      return this.$store.getters.perfilCreacionCantones
    },
    tipoActividad() {
      return this.$store.getters.perfilCreacionTipoActividad
    },
    ambitoActividad() {
      return this.$store.getters.perfilCreacionAmbitoActividad
    },
    mecanismosFomento() {
      return this.$store.getters.perfilCreacionMecanismosFomento
    },
    siNo() {
      return this.$store.getters.perfilCreacionSiNo
    },
    tipoSeguridadSocial() {
      return this.$store.getters.perfilCreacionTipoSeguridadSocial
    }
  }
}
</script>

<style>
.application--light .stepper .stepper__step--editable:hover .stepper__label,
.application--light .stepper .stepper__step--active .stepper__label {
  text-shadow: 0px 0px 0px #7c4dff;
}

.custom-select {
  width: 50px;
  display: inline-flex;
  margin: 0 0 0 10px;
  padding-top: 0;
  font-weight: 500;
}

@media only screen and (max-width: 386px) {
  .custom-select {
    margin: 0;
  }
}

@media only screen and (max-width: 700px) {
  .application--light .stepper--vertical .stepper__content:not(:last-child) {
    border-left: none;
  }
  .application--light .stepper--vertical .stepper__content {
    margin: 0;
    padding: 5px 24px;
  }
}
</style>
