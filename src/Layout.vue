<template>
  <v-app toolbar footer>
    <v-navigation-drawer temporary v-model="sideNav">
      <v-list class="pt-0" dense>
        <v-list-tile v-for="(item, i) in sideNavItems" :key="i" :to="item.route" ripple>
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              {{ item.title }}
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-if="user" @click="cerrarSesion">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              Cerrar sesión
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
        <v-btn v-if="!user" flat to="/inicio-sesion">Inicia sesión</v-btn>
        <v-btn v-if="!user" flat to="/registro">Regístrate</v-btn>
        <v-btn v-if="user" flat @click="cerrarSesion">Cerrar sesión</v-btn>
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
    <v-footer class="grey lighten-2 justify-center pa-4 mt-3">
      <span class="grey--text text--darken-3">&copy; Ministerio de Cultura y Patrimonio - {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    data: () => ({
      sideNav: false,
      title: ''
    }),
    computed: {
      // The user is automatically set by the feathers-vuex auth module upon login
      user () {
        return this.$store.state.auth.user
      },
      sideNavItems () {
        let items = [{ title: 'RUAC', icon: 'home', route: '/' }]
        if (this.user) {
          items.push(
            { title: 'Creación de perfil', icon: 'account_box', route: '/perfil-creacion' }
          )
        } else {
          items.push(
            { title: 'Inicio de sesión', icon: 'face', route: '/inicio-sesion' },
            { title: 'Registro de cuenta', icon: 'fingerprint', route: '/registro' }
          )
        }
        return items
      }
    },
    methods: {
      cerrarSesion () {
        this.$store.dispatch('auth/logout').then(() => this.$router.push('inicio-sesion'))
      }
    },
    watch: {
      '$route' (to, from) {
        let item = this.sideNavItems.find(item => item.route === this.$route.path)
        this.title = item.title
      }
    }
  }

</script>

<style lang="stylus">
  @import './stylus/main';

  html {
    font-size: 15px;
  }

  .display-1 {
    font-size: 32px !important;
  }

  .display-2 {
    font-size: 40px !important;
  }

  .container.fluid {
    padding-top: 16px;
  }

  .toolbar--fixed+main {
    padding-top: 64px;
  }

  .application--light {
    background: #f2f2f2;
  }

  .toolbar__title,
  .btn {
    font-weight: 400;
  }

  .toolbar__content {
    height: 56px;
  }

  .application--light .input-group:not(.input-group--error):not(.input-group--focused):not(.input-group--disabled) .input-group__details:before {
    background-color: rgba(0, 0, 0, 0.24);
  }

  .application--light .input-group:not(.input-group--error):not(.input-group--focused):not(.input-group--disabled):hover .input-group__details:before {
    background-color: rgba(0, 0, 0, 0.44);
  }

  .input-group.input-group--text-field {
    padding-bottom: 6px;
  }

  .input-group--text-field.input-group--dirty:not(.input-group--textarea) label,
  .input-group--text-field:not(.input-group--single-line).input-group--focused:not(.input-group--textarea) label,
  .input-group--text-field:not(.input-group--single-line):focus:not(.input-group--textarea) label {
    min-width: 133%;
  }

  .close-icon {
    cursor: pointer;
    margin-left: 10px;
  }

  .footer span {
    font-size: 13.5px;
  }
</style>
