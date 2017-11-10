<template>
  <v-dialog :value="dialogDisplay" persistent>
      <v-card class="px-2 pt-2 pb-3">
        <v-card-title :class="['headline', `${dialogColor}--text`]">
          <v-icon :color="dialogColor" class="mr-2">{{ dialogIcon }}</v-icon>
          {{ dialogTitle }}
        </v-card-title>
        <v-card-text class="text-xs-center">
          {{ dialogText }}
        </v-card-text>
        <v-card-actions>
          <v-flex class="text-xs-center">
            <v-btn class="mt-2" @click="resetDialog">Ok</v-btn>
          </v-flex>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
export default {
  props: ['dialogDisplay', 'dialogColor', 'dialogIcon', 'dialogTitle', 'dialogText'],
  methods: {
    resetDialog () {
      this.$store.commit('resetDialog')
    }
  }
}
</script>
