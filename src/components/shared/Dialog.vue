<template>
  <v-dialog
    persistent
    max-width="330"
    :value="dialogDisplay">
      <v-card class="px-2 pt-3 pb-4">
        <v-card-title :class="['headline', `${dialogColor}--text`]">
          <v-flex class="text-xs-center">
            {{ dialogTitle }}
          </v-flex>
        </v-card-title>
        <v-card-text class="pt-2 text-xs-center">
          {{ dialogText }}
        </v-card-text>
        <v-card-actions>
          <v-flex class="ma-1 text-xs-center">
            <v-btn @click="resetDialog">
              Ok
            </v-btn>
          </v-flex>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
export default {
  props: [
    'dialogDisplay',
    'dialogColor',
    'dialogTitle',
    'dialogText'
  ],
  methods: {
    resetDialog () {
      this.$store.commit('resetDialog')
    }
  }
}
</script>
