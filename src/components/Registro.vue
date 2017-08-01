<template>
  <v-flex xs12 sm7 md5 lg4 xl3>
    <v-card class="pa-3">
      <v-card-text>
        <form @submit.prevent="signUp()" autocomplete="off">
          <v-text-field label="Cédula"
            name="cedula"
            maxlength="10"
            v-model="form.cedula"
            :rules="rules.cedula"
            data-vv-as="Cédula"
            v-validate="'required|digits:10'"></v-text-field>
          <v-text-field label="Apellidos y nombres"
            name="apellidosNombres"
            hint="Tal como aparece en su cédula"
            maxlength="70"
            v-model="form.apellidosNombres"
            :rules="rules.apellidosNombres"
            data-vv-as="Apellidos y nombres"
            v-validate="'required|alpha_spaces'"></v-text-field>
          <v-text-field label="Email"
            name="email"
            maxlength="35"
            v-model="form.email"
            :rules="rules.email"
            data-vv-as="Email"
            v-validate="'required|email'"></v-text-field>
          <v-dialog persistent v-model="pickerModal" lazy full-width>
            <v-text-field label="Fecha de nacimiento"
              name="fechaNacimiento"
              slot="activator"
              v-model="form.fechaNacimiento"
              :rules="rules.fechaNacimiento"
              data-vv-as="Fecha de nacimiento"
              v-validate="'required'"
              readonly></v-text-field>
            <v-date-picker locale="es-sp"
              first-day-of-week="1"
              v-model="form.fechaNacimiento"
              :scrollable="true"
              ref="picker">
              <template scope="{ save, cancel }">
                <v-card-actions>
                  <v-btn flat primary @click="cancel()">Cancelar</v-btn>
                  <v-btn flat primary @click="save()">Ok</v-btn>
                </v-card-actions>
              </template>
            </v-date-picker>
          </v-dialog>
          <v-text-field label="Contraseña"
            name="contrasena"
            maxlength="15"
            v-model="form.contrasena"
            :rules="rules.contrasena"
            data-vv-as="Contraseña"
            v-validate="'required|min:8'"
            :append-icon="visible ? 'visibility' : 'visibility_off'"
            :append-icon-cb="() => (visible = !visible)"
            :type="visible ? 'text' : 'password'"></v-text-field>
          <v-btn type="submit" outline class="deep-purple--text ml-0 mt-3">Registrar Cuenta</v-btn>
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
    visible: false,
    pickerModal: false,
    picker: '',
    rules: {
      cedula: [],
      apellidosNombres: [],
      email: [],
      fechaNacimiento: [],
      contrasena: []
    },
    form: {
      cedula: '',
      apellidosNombres: '',
      email: '',
      fechaNacimiento: '',
      contrasena: ''
    }
  }),
  watch: {
    pickerModal(val) {
      if (val) {
        this.$nextTick(() => {
          this.$refs.picker.isSelected = true
        })
      }
    }
  },
  methods: {
    signUp() {
      this.$validator.validateAll().then((res) => {
        res ? this.$router.push('perfil-creacion') : undefined
      }).catch(() => {
        console.log('Errors while validating')
      })
    }
  }
}
</script>
