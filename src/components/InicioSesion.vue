<template>
  <v-flex xs12 sm7 md5 lg4 xl3>
    <v-card>
      <v-card-title primary-title class="display-1 grey--text text--darken-1">
        Inicio de sesión
      </v-card-title>
      <v-card-text>
        <v-flex xs12>
          <v-text-field label="Cédula" hint="10 dígitos sin guiones"></v-text-field>
        </v-flex>
        <v-flex xs12>
          <v-text-field label="Contraseña" hint="Al menos 8 caracteres" min="8" :append-icon="e1 ? 'visibility' : 'visibility_off'" :append-icon-cb="() => (e1 = !e1)" :type="e1 ? 'text' : 'password'"></v-text-field>
        </v-flex>
        <v-btn light class="blue--text darken-1" @click.native="dialog = false">Ingresar</v-btn>
      </v-card-text>
    </v-card>
  </v-flex>
</template>

<script>
export default {
  data: () => ({
    e1: false
  })
}
</script>
