export const validateForm = {
  watch: {
    veeErrors: {
      handler: function(val, oldVal) {
        Object.keys(this.form).forEach(key => {
          this.rules[key] = [() => (this.veeErrors.has(key) ? this.veeErrors.first(key) : true)]
        })
      },
      deep: true
    }
  }
}
