<template>
  <v-alert :error="alertType === 'error' ? true : false" :success="alertType === 'success' ? true : false" :value="alertDisplay" @input="onClose" transition="scale-transition" dismissible>
    {{ alertMessage }}
  </v-alert>
</template>

<script>
export default {
  props: ['alertMessage', 'alertDisplay', 'alertType'],
  methods: {
    onClose () {
      this.$emit('dismissed')
    }
  }
}

</script>
