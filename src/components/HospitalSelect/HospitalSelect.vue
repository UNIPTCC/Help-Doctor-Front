<template>
  <div id="hospitals-select">
    <b-form-select 
      v-model="hospital" 
      :options="options" 
      :disabled="disabled"
      :loading="loading" 
      :required="required"
    />
  </div>
</template>

<script>
export default {
  name: 'HospitalSelect',
  props: {
    disabled: Boolean,
    loading: Boolean,
    recieveHospital: String,
    required: Boolean
  },
  created () {
    this.hospital = this.recieveHospital || null
  },
  updated () {
    this.hospital = this.recieveHospital || null
  },
  watch: {
    hospital (newVal, oldVal) {
       if (newVal !== oldVal) {
        this.$emit('pickhospital', newVal)
      }
    }
  },
  data () {
    return {
      state: null,
      options: [
        { value: null, text: 'Selecione o Hospital',  disabled: true }
      ]
    }
  },
  methods: {
    requestHospitals () {
      (async () => {

      })()
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/globals";
@import "./HospitalSelect";
</style>