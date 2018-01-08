<template>
  <v-app light>
    <v-toolbar
      app fixed dark
      color="primary">
      <v-slide-x-reverse-transition mode="out-in">
        <v-btn
          icon
          v-if="title !== 'RUAC'"
          class="mr-0"
          @click="redirectToHome">
          <v-icon>
            arrow_back
          </v-icon>
        </v-btn>
      </v-slide-x-reverse-transition>
      <v-slide-x-reverse-transition mode="out-in">
        <v-toolbar-title :key="title">
          {{title}}
        </v-toolbar-title>
      </v-slide-x-reverse-transition>
      <v-spacer></v-spacer>
      <v-menu bottom left>
        <v-btn
          dark
          icon
          slot="activator">
          <v-icon>
            more_vert
          </v-icon>
        </v-btn>
        <v-list>
          <v-list-tile
            v-for="(item, i) in menuItems"
            :key="i"
            :to="item.route">
            <v-list-tile-title>
              <v-icon class="mr-1">
                {{ item.icon }}
              </v-icon>
              {{ item.title }}
            </v-list-tile-title>
          </v-list-tile>
          <v-list-tile
            v-if="userIsAuthenticated"
            @click="logout">
            <v-list-tile-title>
              <v-icon class="mr-1">
                exit_to_app
              </v-icon>
              Cerrar sesión
            </v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar>
    <v-content>
      <v-container fluid>
        <v-layout justify-center>
          <v-slide-x-reverse-transition mode="out-in">
            <router-view></router-view>
          </v-slide-x-reverse-transition>
        </v-layout>
      </v-container>
    </v-content>
    <v-footer
      app
      class="grey lighten-2 justify-center">
      <span class="grey--text text--darken-3">
        &copy; {{ new Date().getFullYear() }} Ministerio de Cultura y Patrimonio
      </span>
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
      return this.$store.state.userIsAuthenticated
    },
    menuItems () {
      return this.$store.state.menuItems
    }
  },
  methods: {
    redirectToHome () {
      this.$router.push('/')
    },
    async logout () {
      try {
        await this.$store.dispatch('logout')
        localStorage.removeItem('token')
        localStorage.removeItem('refresh-token')
        this.$router.push('inicio-sesion')
      } catch (error) {
        this.$store.dispatch('handleError', error)
      }
    }
  }
}
</script>
