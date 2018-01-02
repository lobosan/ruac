<template>
  <v-flex xs12 sm7 md5 lg4 xl3>
    <v-card class="pa-3">
      <app-dialog
        :dialogDisplay="dialogDisplay"
        :dialogColor="dialogColor"
        :dialogTitle="dialogTitle"
        :dialogText="dialogText">
      </app-dialog>
      <v-card-text>
        <form
          method="post"
          autocomplete="off"
          @submit.prevent="changePasswordRequest(form)">
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
          <v-flex class="text-xs-center">
            <v-btn
              outline
              type="submit"
              color="primary"
              class="mt-4"
              :disabled="loading"
              :loading="loading">
              Solicitar Cambio de Contraseña
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
      form: {
        cedula: null,
        email: null
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
    async changePasswordRequest (form) {
      const validForm = await this.$validator.validateAll()
      if (validForm) {
        try {
          this.$store.commit('setLoading', true)
          await this.$store.dispatch('changePasswordRequest', form)
          this.$store.commit('setLoading', false)
          this.$store.commit('setSuccessDialog', 'Hemos enviado un correo para confirmar su solicitud. Por favor revise su bandeja de entrada y siga las instrucciones.')
        } catch (error) {
          this.$store.commit('setLoading', false)
          this.$store.dispatch('handleError', error)
        }
      }
    }
  }
}
</script>
