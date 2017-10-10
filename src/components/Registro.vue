<template>
  <v-flex xs12 sm7 md5 lg4 xl3>
    <v-card class="pa-3">
      <app-alert :alertColor="alertColor" :alertIcon="alertIcon" :alertMessage="alertMessage" :alertDisplay="alertDisplay" @dismissed="dismissAlert"></app-alert>
      <v-card-text>
        <form method="post" @submit.prevent="signUp(form)" autocomplete="off">
          <v-text-field label="Cédula" name="cedula" maxlength="10" v-model="form.cedula" :error-messages="errors.collect('cedula')" v-validate="'required|digits:10'" data-vv-as="Cédula"></v-text-field>
          <v-text-field label="Email" name="email" maxlength="35" v-model="form.email" :error-messages="errors.collect('email')" v-validate="'required|email'" data-vv-as="Email"></v-text-field>
          <v-text-field label="Contraseña" name="contrasena" maxlength="15" v-model="form.contrasena" :error-messages="errors.collect('contrasena')" v-validate="'required|min:9'" data-vv-as="Contraseña" :append-icon="viewPassword ? 'visibility' : 'visibility_off'" :append-icon-cb="() => (viewPassword = !viewPassword)" :type="viewPassword ? 'text' : 'password'"></v-text-field>
          <v-text-field label="Confirmar Contraseña" name="confirmarContrasena" maxlength="15" v-model="form.confirmarContrasena" :error-messages="errors.collect('confirmarContrasena')" v-validate="'required|min:9|confirmed:contrasena'" data-vv-as="Confirmar Contraseña" :append-icon="viewPassword ? 'visibility' : 'visibility_off'" :append-icon-cb="() => (viewPassword = !viewPassword)" :type="viewPassword ? 'text' : 'password'"></v-text-field>
          <v-flex class="text-xs-center">
            <v-btn type="submit" :disabled="loading" :loading="loading" outline class="deep-purple--text mt-4">
              Registrar Cuenta
              <span slot="loader" class="custom-loader">
                <v-icon light>cached</v-icon>
              </span>
            </v-btn>
          </v-flex>
        </form>
      </v-card-text>
    </v-card>
  </v-flex>
</template>

<script>
export default {
  $validates: true,
  data () {
    return {
      viewPassword: false,
      form: {
        cedula: null,
        email: null,
        contrasena: null,
        confirmarContrasena: null
      }
    }
  },
  computed: {
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
  methods: {
    async signUp (form) {
      const validForm = await this.$validator.validateAll()
      if (validForm) {
        try {
          this.$store.commit('setLoading', true)
          this.dismissAlert()
          const { data } = await this.$store.dispatch('dinardap', form)
          const user = { ...form, ...data.dinardap }
          await this.$store.dispatch('signUp', user)
          this.$store.commit('setLoading', false)
          this.$store.commit('setAlert', {
            alertColor: 'success',
            alertIcon: 'check_circle',
            alertMessage: 'Hemos enviado un correo para confirmar su registro. Por favor revise su bandeja de entrada y siga las instrucciones.',
            alertDisplay: true
          })
        } catch (error) {
          this.$store.commit('setLoading', false)
          this.$store.commit('setAlert', {
            alertColor: 'error',
            alertIcon: 'warning',
            alertMessage: JSON.parse(JSON.stringify(error)).graphQLErrors[0].message,
            alertDisplay: true
          })
        }
      }
    },
    dismissAlert () {
      this.$store.commit('setAlert', { alertColor: null, alertIcon: null, alertMessage: null, alertDisplay: false })
    }
  }
}
</script>
