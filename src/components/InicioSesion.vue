<template>
  <v-flex xs12 sm7 md5 lg4 xl3>
    <v-card class="pa-3">
      <app-dialog :dialogDisplay="dialogDisplay" :dialogColor="dialogColor" :dialogTitle="dialogTitle" :dialogText="dialogText"></app-dialog>
      <v-card-text>
        <form method="post" @submit.prevent="signIn(form)" autocomplete="off">
          <v-text-field label="Cédula" name="cedula" maxlength="10" mask="##########" v-model="form.cedula" :error-messages="errors.collect('cedula')" v-validate="'required|digits:10'" data-vv-as="Cédula"></v-text-field>
          <v-text-field label="Contraseña" name="contrasena" maxlength="15" v-model="form.contrasena" :error-messages="errors.collect('contrasena')" v-validate="'required|min:9'" data-vv-as="Contraseña" :append-icon="viewPassword ? 'visibility' : 'visibility_off'" :append-icon-cb="() => (viewPassword = !viewPassword)" :type="viewPassword ? 'text' : 'password'"></v-text-field>
          <v-flex class="text-xs-center">
            <v-btn type="submit" :disabled="loading" :loading="loading" outline color="primary" class="mt-4">
              Iniciar Sesión
            </v-btn>
          </v-flex>
        </form>
      </v-card-text>
    </v-card>
    <v-flex class="pt-2 text-xs-center">
      <v-btn to="/solicitar-cambio-contrasena" flat small class="grey--text text--darken-2">Solicitar Cambio de Contraseña</v-btn>
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
    'loading',
    'dialogDisplay',
    'dialogColor',
    'dialogTitle',
    'dialogText'
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
