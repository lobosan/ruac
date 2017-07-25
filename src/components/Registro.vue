<template>
  <v-flex xs12 sm7 md5 lg4 xl3>
    <v-card class="pa-4">
      <v-card-text>
        <v-flex xs12>
          <v-text-field label="Cédula" hint="10 dígitos sin guiones" max="10"></v-text-field>
          <v-text-field label="Apellidos y nombres" hint="Tal como aparece en su cédula"></v-text-field>
          <v-text-field label="Email" type="email"></v-text-field>
          <v-dialog persistent v-model="modal" lazy full-width>
          <v-text-field slot="activator"
            label="Fecha de nacimiento"
            hint="Año-mes-día"
            v-model="picker"
            readonly></v-text-field>
            <v-date-picker locale="es-sp" first-day-of-week="1" v-model="picker" :scrollable="true">
              <template scope="{ save, cancel }">
                <v-card-actions>
                  <v-btn flat primary @click="cancel()">Cancelar</v-btn>
                  <v-btn flat primary @click="save()">Ok</v-btn>
                </v-card-actions>
              </template>
            </v-date-picker>
          </v-dialog>
          <v-text-field name="contrasena"
            label="Contraseña"
            hint="Al menos 8 caracteres"
            min="8"
            :append-icon="visible ? 'visibility' : 'visibility_off'"
            :append-icon-cb="() => (visible = !visible)"
            :type="visible ? 'text' : 'password'"></v-text-field>
        </v-flex>
        <v-btn to="/perfil-creacion" outline class="deep-purple--text ml-1 mt-4">Registrar</v-btn>
      </v-card-text>
    </v-card>
  </v-flex>
</template>

<script>
export default {
  data: () => ({
    visible: false,
    picker: null,
    modal: false
  })
}
</script>
