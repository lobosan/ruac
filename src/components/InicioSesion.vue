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
      <v-snackbar :info="true" :timeout="3500" :top="true" :multi-line="true" v-model="snackbar">
        {{ serverError }}
        <v-icon class="close-icon white--text" @click="snackbar = false">close</v-icon>
      </v-snackbar>
    </v-card>
  </v-flex>
</template>

<script>
  import { validateForm } from '@/mixins/validateForm'

  export default {
    mixins: [validateForm],
    data: () => ({
      snackbar: false,
      serverError: '',
      viewPassword: false,
      rules: {
        cedula: [],
        contrasena: []
      },
      form: {
        cedula: '',
        contrasena: ''
      }
    }),
    methods: {
      login ({ cedula, contrasena }) {
        this.$validator.validateAll().then(response => {
          if (response) {
            // Check on server
          }
        }).catch(error => {
          console.log('Error en el cliente al validar el formulario', error)
        })
      }
    }
  }

</script>
