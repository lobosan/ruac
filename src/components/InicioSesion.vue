<template>
  <v-flex xs12 sm7 md5 lg4 xl3>
    <v-card class="pa-4">
      <v-card-text>
        <form autocomplete="off">
          <v-flex xs12>
            <v-text-field name="cedula"
              label="Cédula"
              hint="10 dígitos sin guiones"></v-text-field>
            <v-text-field name="contrasena"
              label="Contraseña"
              hint="Al menos 8 caracteres"
              min="8"
              :append-icon="visible ? 'visibility' : 'visibility_off'"
              :append-icon-cb="() => (visible = !visible)"
              :type="visible ? 'text' : 'password'"></v-text-field>
          </v-flex>
          <v-btn to="/perfil-creacion" outline class="deep-purple--text ml-1 mt-4">Ingresar</v-btn>
        </form>
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
