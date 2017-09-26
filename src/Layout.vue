<template>
  <v-app toolbar footer>
    <v-toolbar fixed dark class="deep-purple">
      <v-slide-x-reverse-transition mode="out-in">
        <v-btn v-if="title != 'RUAC'" icon @click="redirectToHome" class="mr-0">
          <v-icon>arrow_back</v-icon>
        </v-btn>
      </v-slide-x-reverse-transition>
      <v-slide-x-reverse-transition mode="out-in">
        <v-toolbar-title :key="title">{{title}}</v-toolbar-title>
      </v-slide-x-reverse-transition>
      <v-spacer></v-spacer>
      <v-menu bottom left>
        <v-btn icon slot="activator" dark>
          <v-icon>more_vert</v-icon>
        </v-btn>
        <v-list>
          <v-list-tile v-for="(item, i) in menuItems" :key="i" :to="item.route">
            <v-list-tile-title>
              <v-icon class="mr-1">{{ item.icon }}</v-icon>
              {{ item.title }}
            </v-list-tile-title>
          </v-list-tile>
          <v-list-tile @click="logout" v-if="userIsAuthenticated">
            <v-list-tile-title>
              <v-icon class="mr-1">exit_to_app</v-icon>
              Cerrar sesión
            </v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
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
  computed: {
    title () {
      return this.$store.state.title
    },
    userIsAuthenticated () {
      return this.$store.state.user
    },
    menuItems () {
      return this.$store.state.menuItems
    }
  },
  methods: {
    redirectToHome () {
      this.$router.push('/')
    },
    logout () {
      this.$store.commit('logout')
      this.$router.push('inicio-sesion')
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
