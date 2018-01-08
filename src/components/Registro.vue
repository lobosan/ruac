<template>
  <v-flex xs12 sm7 md5 lg4 xl3>
    <v-card class="pa-3">
      <v-card-text>
        <form
          method="post"
          autocomplete="off"
          @submit.prevent="signUp(form)">
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
            v-validate="'required|email'"
            v-model="form.email"
            name="email"
            label="Email"
            data-vv-as="Email"
            maxlength="35"
            :error-messages="errors.collect('email')">
          </v-text-field>
          <v-text-field
            v-validate="'required|min:9'"
            v-model="form.contrasena"
            name="contrasena"
            label="Contraseña"
            maxlength="15"
            data-vv-as="Contraseña"
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
              class="mt-4"
              color="primary"
              :disabled="loading"
              :loading="loading">
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
    'loading'
  ]),
  methods: {
    async signUp (form) {
      const validForm = await this.$validator.validateAll()
      if (validForm) {
        try {
          this.$store.commit('setLoading', true)
          const { cedula } = form
          const { data: { dinardap } } = await this.$store.dispatch('dinardap', cedula)
          const user = { ...form, ...dinardap }
          delete user.confirmarContrasena
          delete user.__typename
          await this.$store.dispatch('signUp', user)
          this.$store.commit('setLoading', false)
          this.$store.commit('setSuccessDialog', 'Hemos enviado un correo para confirmar su registro. Por favor revise su bandeja de entrada y siga las instrucciones.')
        } catch (error) {
          this.$store.commit('setLoading', false)
          this.$store.dispatch('handleError', error)
        }
      }
    }
  }
}
</script>
