<template>
  <v-flex xs12 sm7 md5 lg4 xl3>
    <v-card class="pa-3">
      <v-card-text>
        <form
          method="post"
          autocomplete="off"
          @submit.prevent="updatePassword(form)">
          <v-text-field
            v-validate="'required|min:9'"
            v-model="form.contrasena"
            name="contrasena"
            label="Contraseña"
            data-vv-as="Contraseña"
            maxlength="15"
            :error-messages="errors.collect('contrasena')"
            :append-icon="viewPassword ? 'visibility' : 'visibility_off'"
            :append-icon-cb="() => (viewPassword = !viewPassword)"
            :type="viewPassword ? 'text' : 'password'">
          </v-text-field>
          <v-text-field
            v-validate="'required|min:9|confirmed:contrasena'"
            v-model="form.confirmarContrasena"
            name="confirmarContrasena"
            label="Confirmar Contraseña"
            data-vv-as="Confirmar Contraseña"
            maxlength="15"
            :error-messages="errors.collect('confirmarContrasena')"
            :append-icon="viewPassword ? 'visibility' : 'visibility_off'"
            :append-icon-cb="() => (viewPassword = !viewPassword)"
            :type="viewPassword ? 'text' : 'password'">
          </v-text-field>
          <v-flex class="text-xs-center">
            <v-btn
              outline
              type="submit"
              color="primary"
              class="mt-4"
              :disabled="loading"
              :loading="loading">
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
    'loading'
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
