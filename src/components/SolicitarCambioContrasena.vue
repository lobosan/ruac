<template>
  <v-flex xs12 sm7 md5 lg4 xl3>
    <v-card class="pa-3">
      <app-alert :alertColor="alertColor" :alertIcon="alertIcon" :alertMessage="alertMessage" :alertDisplay="alertDisplay" @dismissed="dismissAlert"></app-alert>
      <v-card-text>
        <form method="post" @submit.prevent="requestPasswordChange(form)" autocomplete="off">
          <v-text-field label="Cédula" name="cedula" maxlength="10" mask="##########" v-model="form.cedula" :error-messages="errors.collect('cedula')" v-validate="'required|digits:10'" data-vv-as="Cédula"></v-text-field>
          <v-text-field label="Email" name="email" maxlength="35" v-model="form.email" :error-messages="errors.collect('email')" v-validate="'required|email'" data-vv-as="Email"></v-text-field>
          <v-flex class="text-xs-center">
            <v-btn type="submit" :disabled="loading" :loading="loading" outline color="primary" class="mt-4">
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
    'alertColor',
    'alertIcon',
    'alertMessage',
    'alertDisplay'
  ]),
  methods: {
    async requestPasswordChange ({ cedula, email }) {
      const validForm = await this.$validator.validateAll()
      if (validForm) {
        try {
          this.$store.commit('setLoading', true)
          this.dismissAlert()
          await this.$store.dispatch('requestPasswordChange', { cedula, email })
          this.$store.commit('setLoading', false)
          this.$store.commit('setAlert', {
            alertColor: 'success',
            alertIcon: 'check_circle',
            alertMessage: 'Hemos enviado un correo para confirmar su solicitud. Por favor revise su bandeja de entrada y siga las instrucciones.',
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
