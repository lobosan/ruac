<template>
  <v-flex xs12 sm7 md5 lg4 xl3>
    <v-card class="pa-4">
      <v-card-text>
        <v-flex xs12>
          <v-text-field label="Cédula" hint="10 dígitos sin guiones"></v-text-field>
        </v-flex>
        <v-flex xs12>
          <v-text-field label="Contraseña" hint="Al menos 8 caracteres" min="8" :append-icon="visible ? 'visibility' : 'visibility_off'" :append-icon-cb="() => (visible = !visible)" :type="visible ? 'text' : 'password'"></v-text-field>
        </v-flex>
        <v-btn outline class="indigo--text" @click="dialog = false">Ingresar</v-btn>
      </v-card-text>
    </v-card>
  </v-flex>
</template>

<script>
export default {
  data: () => ({
    visible: false
  })
}
</script>
