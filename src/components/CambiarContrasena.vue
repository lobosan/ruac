<template>
  <v-flex xs12 sm7 md5 lg4 xl3>
    <v-card class="pa-3">
      <app-dialog :dialogDisplay="dialogDisplay" :dialogColor="dialogColor" :dialogTitle="dialogTitle" :dialogText="dialogText"></app-dialog>
      <v-card-text>
        <form method="post" @submit.prevent="updatePassword(form)" autocomplete="off">
          <v-text-field label="Contraseña" name="contrasena" maxlength="15" v-model="form.contrasena" :error-messages="errors.collect('contrasena')" v-validate="'required|min:9'" data-vv-as="Contraseña" :append-icon="viewPassword ? 'visibility' : 'visibility_off'" :append-icon-cb="() => (viewPassword = !viewPassword)" :type="viewPassword ? 'text' : 'password'"></v-text-field>
          <v-text-field label="Confirmar Contraseña" name="confirmarContrasena" maxlength="15" v-model="form.confirmarContrasena" :error-messages="errors.collect('confirmarContrasena')" v-validate="'required|min:9|confirmed:contrasena'" data-vv-as="Confirmar Contraseña" :append-icon="viewPassword ? 'visibility' : 'visibility_off'" :append-icon-cb="() => (viewPassword = !viewPassword)" :type="viewPassword ? 'text' : 'password'"></v-text-field>
          <v-flex class="text-xs-center">
            <v-btn type="submit" :disabled="loading" :loading="loading" outline color="primary" class="mt-4">
              Cambiar Contraseña
            </v-btn>
          </v-flex>
        </form>
      </v-card-text>
    </v-card>
  </v-flex>
</template>

<script>
import { mapState } from 'vuex'

export default {
  $_veeValidate: {
    validator: 'new'
  },
  data () {
    return {
      viewPassword: false,
      token: null,
      form: {
        contrasena: null,
        confirmarContrasena: null
      }
    }
  },
  computed: mapState([
    'loading',
    'dialogDisplay',
    'dialogColor',
    'dialogTitle',
    'dialogText'
  ]),
  mounted () {
    this.token = this.$route.query.token
    if (this.token) {
      this.$store.commit('setSuccessDialog', 'Su solicitud ha sido verificada correctamente. Por favor ingrese su nueva contraseña y confírmela.')
    } else {
      this.$store.commit('setErrorDialog', 'Hubo un error al validar su solicitud. En caso de requerir asistencia contáctenos.')
    }
  },
  methods: {
    async updatePassword ({ contrasena }) {
      try {
        const validForm = await this.$validator.validateAll()
        if (validForm) {
          this.$store.commit('setLoading', true)
          const token = this.token
          await this.$store.dispatch('updatePassword', { token, contrasena })
          this.$store.commit('setLoading', false)
          this.$router.push('inicio-sesion?contrasenaValida=true')
        }
      } catch (error) {
        this.$store.commit('setLoading', false)
        this.$store.dispatch('handleError', error)
      }
    }
  }
}
</script>
