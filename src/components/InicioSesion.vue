<template>
  <v-flex xs12 sm7 md5 lg4 xl3>
    <v-card class="pa-3">
      <app-alert :alertType="alertType" :alertMessage="alertMessage" :alertDisplay="alertDisplay" @dismissed="dismissAlert"></app-alert>
      <v-card-text>
        <form method="post" @submit.prevent="login(form)" autocomplete="off">
          <v-text-field label="Cédula" name="cedula" maxlength="10" v-model="form.cedula" :rules="rules.cedula" data-vv-as="Cédula" v-validate="'required|digits:10'"></v-text-field>
          <v-text-field label="Contraseña" name="contrasena" maxlength="15" v-model="form.contrasena" :rules="rules.contrasena" data-vv-as="Contraseña" v-validate="'required'" :append-icon="viewPassword ? 'visibility' : 'visibility_off'" :append-icon-cb="() => (viewPassword = !viewPassword)" :type="viewPassword ? 'text' : 'password'"></v-text-field>
          <v-btn type="submit" :disabled="loading" :loading="loading" outline class="deep-purple--text ml-0 mt-3">
            Ingresar
            <span slot="loader" class="custom-loader">
              <v-icon light>cached</v-icon>
            </span>
          </v-btn>
        </form>
      </v-card-text>
    </v-card>
  </v-flex>
</template>

<script>
import { validateForm } from '@/mixins/validateForm'

export default {
  mixins: [validateForm],
  data: () => ({
    viewPassword: false,
    rules: {
      cedula: [],
      contrasena: []
    },
    form: {
      cedula: null,
      contrasena: null
    }
  }),
  computed: {
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
  mounted () {
    const validEmail = this.$route.query.verificado
    if (validEmail === 'true') {
      this.$store.commit('setAlert', {
        alertType: 'success',
        alertMessage: 'Su email ha sido verificado exitosamente. Ya puede iniciar sesión.',
        alertDisplay: true
      })
    } else if (validEmail === 'false') {
      this.$store.commit('setAlert', {
        alertType: 'error',
        alertMessage: 'Hubo un error al validar su email. Por favor envie un correo explicando su problema a ruac@culturaypatrimonio.gob.ec',
        alertDisplay: true
      })
    }
  },
  methods: {
    async login ({ cedula, contrasena }) {
      const validForm = await this.$validator.validateAll()
      if (validForm) {
        try {
          this.$store.commit('setLoading', true)
          this.dismissAlert()
          const token = await this.$store.dispatch('signIn', { cedula, contrasena })
          localStorage.setItem('token', token.data.signIn)
          const user = await this.$store.dispatch('loggedInUser')
          this.$store.commit('setUser', user.data.loggedInUser)
          this.$store.commit('setLoading', false)
          this.$router.push('perfil')
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
