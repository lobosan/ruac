<template>
  <v-flex xs12 sm11 md11 lg9 xl8>
    <h1 class="mt-3 mb-5 display-1 grey--text text--darken-4 text-xs-center">
      Bienvenido al Registro Único de Artistas y Gestores Culturales
    </h1>
    <!-- Qué es el RUAC -->
    <v-card class="mb-5">
      <v-layout row wrap>
        <v-flex xs12 md6>
          <v-card-media :src="secciones[0].src" height="270">
            <v-layout fill-height align-center justify-center>
              <h2 class="display-2 white--text text-xs-center">{{secciones[0].title}}</h2>
            </v-layout>
          </v-card-media>
        </v-flex>
        <v-flex xs12 md6>
          <v-card-text>
            <v-layout row wrap>
              <v-flex xs12 class="pa-2 grey--text text--darken-4">
                {{secciones[0].text}}
              </v-flex>
              <v-flex xs12 pl-0 pt-2>
                <v-btn to="/inicio-sesion" primary>
                  <v-icon dark left>face</v-icon> Inicia sesión
                </v-btn>
                <v-btn to="/registro" primary>
                  <v-icon dark left>fingerprint</v-icon> Regístrate
                </v-btn>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-flex>
      </v-layout>
    </v-card>
    <!-- Beneficios -->
    <v-card class="mb-5">
      <v-layout row wrap>
        <v-flex xs12 md6 order-xs1 order-md2>
          <v-card-media :src="secciones[1].src" height="270">
            <v-layout fill-height align-center justify-center>
              <h2 class="display-2 white--text text-xs-center">{{secciones[1].title}}</h2>
            </v-layout>
          </v-card-media>
        </v-flex>
        <v-flex xs12 md6 order-xs2 order-md1>
          <v-card-text>
          <v-flex xs12 class="pa-2 grey--text text--darken-4">
            <ul class="beneficios">
              <li class="mb-1" v-for="(beneficio, i) in secciones[1].text" :key="i">
                {{beneficio}}
              </li>
            </ul>
          </v-flex>
          </v-card-text>
        </v-flex>
      </v-layout>
    </v-card>
    <!-- Base legal -->
    <v-card class="mb-5">
      <v-layout row wrap>
        <v-flex xs12 md6>
          <v-card-media :src="secciones[2].src" height="270">
            <v-layout fill-height align-center justify-center>
              <h2 class="display-2 white--text text-xs-center">{{secciones[2].title}}</h2>
            </v-layout>
          </v-card-media>
        </v-flex>
        <v-flex xs12 md6>
          <v-card-text>
            <v-layout row wrap>
              <v-flex xs12 class="pa-2 grey--text text--darken-4">
                {{secciones[2].text}}
              </v-flex>
              <v-flex xs12 pl-0 pt-2>
                <v-btn href="/static/docs/acuerdo_ministerial.pdf" target="_blank" outline class="deep-purple--text">
                  Acuerdo Ministerial
                </v-btn>
                <v-btn href="/static/docs/norma_tecnica.pdf" target="_blank" outline class="deep-purple--text">
                  Norma Técnica
                </v-btn>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-flex>
      </v-layout>
    </v-card>
    <!-- Preguntas Frecuentes -->
    <h2 class="mb-4 pt-3 headline grey--text text--darken-4">Preguntas Frecuentes</h2>
    <v-card flat class="mb-5">
      <v-expansion-panel>
        <v-expansion-panel-content v-for="(pregunta, i) in preguntas" :key="i">
          <div slot="header" class="ml-2 mr-5 grey--text text--darken-4">{{i+1}}. {{pregunta.title}}</div>
          <v-card>
            <v-card-text class="px-4 grey lighten-3 grey--text text--darken-3">{{pregunta.response}}</v-card-text>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-card>
    <!-- Dirección y contactos -->
    <h2 class="mb-4 pt-3 headline grey--text text--darken-4">Dirección y contactos</h2>
    <v-card>
      <v-layout row wrap>
        <v-flex xs12 md5 pa-4 class="pa-2 grey--text text--darken-4" order-xs2 order-md1>
          <p>Dirección: Av. Colón E5-34 y Juan León Mera</p>
          <p>Email: ruac@culturaypatrimonio.gob.ec</p>
          <p>Teléfono: 593-2 381-4550</p>
          <p>Quito – Ecuador</p>
        </v-flex>
        <v-flex xs12 md7 order-xs1 order-md2>
          <gmap-map :center="gmap.center" :zoom="19" style="min-width: 320px; height: 350px">
            <gmap-marker
              :position="gmap.position"
              :clickable="true"
              :draggable="true"
              @click="gmap.center=gmap.position"></gmap-marker>
          </gmap-map>
        </v-flex>
      </v-layout>
    </v-card>
  </v-flex>
</template>

<script>
export default {
  computed: {
    secciones() {
      return this.$store.getters.homeSecciones
    },
    preguntas() {
      return this.$store.getters.homePreguntas
    },
    gmap() {
      return this.$store.getters.homeGmap
    }
  }
}
</script>

<style>
.expansion-panel__header {
  height: auto;
  padding: 15px 0 15px 10px;
}

.beneficios {
  padding-left: 15px;
  list-style: none;
}

.beneficios > li:before {
  content: '✓';
  margin-left: -16px;
}
</style>
