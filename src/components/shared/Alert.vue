<template>
  <v-alert :color="alertColor" :icon="alertIcon" :value="alertDisplay" @input="onClose" transition="scale-transition" dismissible>
    {{ alertMessage }}
  </v-alert>
</template>

<script>
export default {
  props: ['alertColor', 'alertIcon', 'alertMessage', 'alertDisplay'],
  methods: {
    onClose () {
      this.$emit('dismissed')
    }
  }
}
</script>
