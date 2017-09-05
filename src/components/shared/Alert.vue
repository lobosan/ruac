<template>
  <v-alert error dismissible @input="onClose" :value="showAlert" transition="scale-transition">
    {{ serverError }}
  </v-alert>
</template>

<script>
  export default {
    props: ['serverError', 'showAlert'],
    methods: {
      onClose () {
        this.$emit('dismissed')
      }
    }
  }

</script>
