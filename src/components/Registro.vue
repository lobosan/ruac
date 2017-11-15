<template>
  <v-flex xs12 sm7 md5 lg4 xl3>
    <v-card class="pa-3">
      <app-dialog :dialogDisplay="dialogDisplay" :dialogColor="dialogColor" :dialogTitle="dialogTitle" :dialogText="dialogText"></app-dialog>
      <v-card-text>
        <form method="post" @submit.prevent="signUp(form)" autocomplete="off">
          <v-text-field label="Cédula" name="cedula" maxlength="10" mask="##########" v-model="form.cedula" :error-messages="errors.collect('cedula')" v-validate="'required|digits:10'" data-vv-as="Cédula"></v-text-field>
          <v-text-field label="Email" name="email" maxlength="35" v-model="form.email" :error-messages="errors.collect('email')" v-validate="'required|email'" data-vv-as="Email"></v-text-field>
          <v-text-field label="Contraseña" name="contrasena" maxlength="15" v-model="form.contrasena" :error-messages="errors.collect('contrasena')" v-validate="'required|min:9'" data-vv-as="Contraseña" :append-icon="viewPassword ? 'visibility' : 'visibility_off'" :append-icon-cb="() => (viewPassword = !viewPassword)" :type="viewPassword ? 'text' : 'password'"></v-text-field>
          <v-text-field label="Confirmar Contraseña" name="confirmarContrasena" maxlength="15" v-model="form.confirmarContrasena" :error-messages="errors.collect('confirmarContrasena')" v-validate="'required|min:9|confirmed:contrasena'" data-vv-as="Confirmar Contraseña" :append-icon="viewPassword ? 'visibility' : 'visibility_off'" :append-icon-cb="() => (viewPassword = !viewPassword)" :type="viewPassword ? 'text' : 'password'"></v-text-field>
          <v-flex class="text-xs-center">
            <v-btn type="submit" :disabled="loading" :loading="loading" outline color="primary" class="mt-4">
              Registrar Cuenta
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
      form: {
        cedula: null,
        email: null,
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
  methods: {
    async signUp (form) {
      const validForm = await this.$validator.validateAll()
      if (validForm) {
        try {
          this.$store.commit('setLoading', true)
          const { data: { dinardap } } = await this.$store.dispatch('dinardap', form)
          const user = { ...form, ...dinardap }
          await this.$store.dispatch('signUp', user)
          this.$store.commit('setLoading', false)
          this.$store.commit('setSuccessDialog', 'Hemos enviado un correo para confirmar su registro. Por favor revise su bandeja de entrada y siga las instrucciones.')
        } catch (error) {
          this.$store.commit('setLoading', false)
          this.$store.commit('setErrorDialog', JSON.parse(JSON.stringify(error)).graphQLErrors[0].message)
        }
      }
    }
  }
}
</script>
