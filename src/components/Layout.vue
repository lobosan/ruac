<template>
  <v-app id="sandbox" :light="true" standalone>
    <v-navigation-drawer v-model="drawer" temporary overflow absolute enable-resize-watcher>
      <v-list class="pt-0" dense>
        <v-divider></v-divider>
        <v-list-tile v-for="item in items" :key="item" :to="item.route" router ripple @click.native="title = item.title">
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
    <v-toolbar fixed dark class="deep-purple">
      <v-toolbar-side-icon @click.native.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-slide-x-reverse-transition mode="out-in">
        <v-toolbar-title :key="title">{{title}}</v-toolbar-title>
      </v-slide-x-reverse-transition>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat to="/inicio-sesion" router>Inicia sesión</v-btn>
        <v-btn flat to="/registro" router>Regístrate</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <main>
      <v-container fluid>
        <v-layout justify-center>
          <v-slide-x-reverse-transition mode="out-in">
            <router-view></router-view>
          </v-slide-x-reverse-transition>
        </v-layout>
      </v-container>
    </main>
    <v-footer class="layout justify-center pa-4 mt-5">
      <span>&copy; Ministerio de Cultura y Patrimonio - {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    drawer: true,
    title: '',
    items: [
      { title: 'RUAC', icon: 'home', route: '/' },
      { title: 'Inicio de sesión', icon: 'lock_outline', route: '/inicio-sesion' },
      { title: 'Registro de cuenta', icon: 'fingerprint', route: '/registro' },
      { title: 'Creación de perfil', icon: 'face', route: '/perfil-creacion' }
    ]
  }),
  watch: {
    '$route'(to, from) {
      let item = this.items.find(item => item.route === this.$route.path)
      this.title = item.title
    }
  }
}
</script>

<style lang="stylus">
  @import '../../node_modules/vuetify/src/stylus/settings/_colors'

  $theme := {
    primary: $deep-purple.accent-2
    accent: $purple.accent-2
    secondary: $grey.lighten-1
    info: $indigo.lighten-1
    warning: $amber.darken-2
    error: $purple.accent-4
    success: $green.lighten-2
  }

  @import '../stylus/main'
</style>
