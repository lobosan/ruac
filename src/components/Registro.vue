<template>
  <v-layout align-center justify-center>
    <v-flex xs12 sm7 md5 lg4 xl3>
      <v-card>
        <v-card-title primary-title class="display-1 grey--text text--darken-1">
          Creación de cuenta
        </v-card-title>
        <v-card-text>
          <v-flex xs12>
            <v-text-field label="Cédula" hint="10 dígitos sin guiones" max="10"></v-text-field>
          </v-flex>
          <v-flex xs12>
            <v-text-field label="Apellidos y nombres" hint="Tal como aparece en su cédula"></v-text-field>
          </v-flex>
          <v-flex xs12>
            <v-text-field label="Email" type="email"></v-text-field>
          </v-flex>
          <v-flex xs12>
            <v-dialog persistent v-model="modal" lazy full-width>
              <v-text-field slot="activator" label="Fecha de nacimiento" hint="Año-mes-día" v-model="e3" readonly></v-text-field>
              <v-date-picker v-model="e3" :months=" months " :days="days " first-day-of-week="Lunes " scrollable>
                <template scope="{ save, cancel } ">
                  <v-card-actions>
                    <v-btn flat primary @click.native="cancel() ">Cancelar</v-btn>
                    <v-btn flat primary @click.native="save() ">Ok</v-btn>
                  </v-card-actions>
                </template>
              </v-date-picker>
            </v-dialog>
          </v-flex>
          <v-flex xs12>
            <v-text-field name="input-10-1 " label="Contraseña " hint="Al menos 8 caracteres " min="8 " :append-icon="e1 ? 'visibility' : 'visibility_off' " :append-icon-cb="()=> (e1 = !e1)" :type="e1 ? 'text' : 'password'"></v-text-field>
          </v-flex>
          <v-btn light>Registrar</v-btn>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data: () => ({
    e1: false,
    e3: null,
    modal: false,
    months: [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre'
    ],
    days: [
      'Domingo',
      'Lunes',
      'Martes',
      'Miércoles',
      'Jueves',
      'Viernes',
      'Sábado'
    ]
  })
}
</script>
