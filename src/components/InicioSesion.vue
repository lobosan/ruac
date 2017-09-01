<template>
  <v-flex xs12 sm7 md5 lg4 xl3>
    <v-card class="pa-3">
      <v-card-text>
        <form method="post" @submit.prevent="login(form)" autocomplete="off">
          <v-text-field label="Cédula" name="cedula" maxlength="10" v-model="form.cedula" :rules="rules.cedula"
            data-vv-as="Cédula" v-validate="'required|digits:10'"></v-text-field>
          <v-text-field label="Contraseña" name="contrasena" maxlength="15" v-model="form.contrasena"
            :rules="rules.contrasena" data-vv-as="Contraseña" v-validate="'required'"
            :append-icon="viewPassword ? 'visibility' : 'visibility_off'" :append-icon-cb="() => (viewPassword = !viewPassword)"
            :type="viewPassword ? 'text' : 'password'"></v-text-field>
          <v-btn type="submit" outline class="deep-purple--text ml-0 mt-3">Ingresar</v-btn>
        </form>
      </v-card-text>
      <v-snackbar :info="true" :top="true" :multi-line="true" v-model="snackbar">
        {{ serverError }}
        <v-icon class="close-icon white--text" @click="closeSnackbar">close</v-icon>
      </v-snackbar>
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
        cedula: '1718896580',
        contrasena: '123123123'
      }
    }),
    computed: {
      serverError () {
        return this.$store.state.error
      },
      loading () {
        return this.$store.state.loading
      },
      snackbar () {
        return this.$store.state.snackbar
      }
    },
    methods: {
      async login ({ cedula, contrasena }) {
        const validForm = await this.$validator.validateAll()
        if (validForm) {
          const token = await this.$store.dispatch('signIn', { cedula, contrasena })
          if (token) {
            const loggedInUser = await this.$store.dispatch('loggedInUser')
            if (loggedInUser) {
              this.$router.push('perfil-creacion')
            }
          }
        }
      },
      closeSnackbar () {
        this.$store.dispatch('clearSnackbar')
      }
    }
  }

</script>
