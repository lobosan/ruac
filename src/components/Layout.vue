<template>
  <v-app toolbar footer>
    <v-navigation-drawer temporary v-model="sideNav">
      <v-list class="pt-0" dense>
        <v-divider></v-divider>
        <v-list-tile v-for="(item, i) in items" :key="i" :to="item.route" ripple>
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
      <v-toolbar-side-icon @click.stop="sideNav = !sideNav"></v-toolbar-side-icon>
      <v-slide-x-reverse-transition mode="out-in">
        <v-toolbar-title :key="title">{{title}}</v-toolbar-title>
      </v-slide-x-reverse-transition>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn flat to="/inicio-sesion">Inicia sesión</v-btn>
        <v-btn flat to="/registro">Regístrate</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <main>
      <v-container fluid>
        <v-layout justify-center mt-3>
          <v-slide-x-reverse-transition mode="out-in">
            <router-view></router-view>
          </v-slide-x-reverse-transition>
        </v-layout>
      </v-container>
    </main>
    <v-footer class="grey lighten-2 justify-center pa-4 mt-5">
      <span>&copy; Ministerio de Cultura y Patrimonio - {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    sideNav: false,
    title: '',
    items: [
      { title: 'RUAC', icon: 'home', route: '/' },
      { title: 'Inicio de sesión', icon: 'face', route: '/inicio-sesion' },
      { title: 'Registro de cuenta', icon: 'fingerprint', route: '/registro' },
      { title: 'Creación de perfil', icon: 'account_box', route: '/perfil-creacion' }
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
  @import '../stylus/main'

  html {
    font-size: 15px;
  }

  .toolbar__title, .btn {
    font-weight: 400;
  }

  .toolbar__content {
    height: 56px;
  }

  .application--light .input-group:not(.input-group--error):not(.input-group--focused):not(.input-group--disabled) .input-group__details:before {
    background-color: rgba(0,0,0,0.24);
  }

  .application--light .input-group:not(.input-group--error):not(.input-group--focused):not(.input-group--disabled):hover .input-group__details:before {
    background-color: rgba(0,0,0,0.44);
  }

  .input-group.input-group--text-field {
    padding-bottom: 7px;
  }

  .footer span {
    font-size: 13.5px;
  }
</style>
