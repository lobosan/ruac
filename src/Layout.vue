<template>
  <v-app id="sandbox" :light="true" standalone>
    <v-navigation-drawer v-model="drawer" persistent clipped overflow enable-resize-watcher>
      <v-list class="pa-0">
        <v-list-tile avatar tag="div">
          <v-list-tile-avatar>
            <img src="https://randomuser.me/api/portraits/men/85.jpg">
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>Juan Vergara</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-list class="pt-0" dense>
        <v-divider></v-divider>
        <v-list-tile v-for="item in items" :key="item" :to="item.route" router ripple>
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              {{ item.title }}
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar fixed dark class="deep-orange">
      <v-toolbar-side-icon @click.native.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>RUAC</v-toolbar-title>
    </v-toolbar>
    <main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </main>
    <v-footer>
      <span>&copy; Ministerio de Cultura y Patrimonio - {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    drawer: true,
    items: [
      { title: 'Iniciar sesión', icon: 'dashboard', route: '/inicio-sesion' },
      { title: 'Registro', icon: 'question_answer', route: '/registro' }
    ]
  })
}
</script>

<style lang="stylus">
  @import './stylus/main'
</style>
