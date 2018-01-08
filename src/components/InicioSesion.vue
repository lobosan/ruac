<template>
  <v-flex xs12 sm7 md5 lg4 xl3>
    <v-card class="pa-3">
      <v-card-text>
        <form
          method="post"
          autocomplete="off"
          @submit.prevent="signIn(form)">
          <v-text-field
            v-validate="'required|digits:10'"
            v-model="form.cedula"
            name="cedula"
            label="Cédula"
            data-vv-as="Cédula"
            maxlength="10"
            mask="##########"
            :error-messages="errors.collect('cedula')">
          </v-text-field>
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
          <v-flex class="text-xs-center">
            <v-btn
              outline
              type="submit"
              color="primary"
              class="mt-4"
              :disabled="loading"
              :loading="loading">
              Iniciar Sesión
            </v-btn>
          </v-flex>
        </form>
      </v-card-text>
    </v-card>
    <v-flex class="pt-2 text-xs-center">
      <v-btn
        flat small
        to="/solicitar-cambio-contrasena"
        class="grey--text text--darken-2">
        Solicitar Cambio de Contraseña
      </v-btn>
    </v-flex>
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
      form: {
        cedula: null,
        contrasena: null
      }
    }
  },
  computed: mapState([
    'loading'
  ]),
  mounted () {
    const validEmail = this.$route.query.verificado
    if (validEmail === 'true') {
      this.$store.commit('setSuccessDialog', 'Su email ha sido confirmado correctamente. Ya puede iniciar sesión.')
    } else if (validEmail === 'false') {
      this.$store.commit('setErrorDialog', 'Hubo un error al validar su email. Por favor envie un correo explicando su problema a ruac@culturaypatrimonio.gob.ec')
    }
    const contrasenaValida = this.$route.query.contrasenaValida
    if (contrasenaValida === 'true') {
      this.$store.commit('setSuccessDialog', 'Su contraseña ha sido actualizada correctamente. Ya puede iniciar sesión.')
    }
  },
  methods: {
    async signIn (form) {
      const validForm = await this.$validator.validateAll()
      if (validForm) {
        try {
          this.$store.commit('setLoading', true)
          const { data: { signIn } } = await this.$store.dispatch('signIn', form)
          const { token, refreshToken } = signIn
          localStorage.setItem('token', token)
          localStorage.setItem('refresh-token', refreshToken)
          this.$store.commit('setLoading', false)
          this.$router.push('perfil')
        } catch (error) {
          this.$store.commit('setLoading', false)
          this.$store.dispatch('handleError', error)
        }
      }
    }
  }
}
</script>
