<template>
  <div id="hospitals-select">
    <b-form-select 
      v-model="hospital" 
      :options="options" 
      :disabled="disabled"
      :loading="loading" 
      :required="required"
      :multiple="multiple" 
    />
  </div>
</template>

<script>
import Hospitals from '../../services/Hospitals'
const hospitalsService = new Hospitals()

export default {
  name: 'HospitalSelect',
  props: {
    disabled: Boolean,
    loading: Boolean,
    recieveHospital:  [String, Array],
    required: Boolean,
    multiple: Boolean
  },
  created () {
    this.hospital = this.recieveHospital || null
    this.getHospitals()
  },
  updated () {
    this.hospital = this.recieveHospital || null
  },
  watch: {
    hospital (newVal, oldVal) {
       if (newVal !== oldVal) {
        if (this.multiple) {
          this.$emit('pickhospitals', newVal)
        } else {
          this.$emit('pickhospital', newVal)
        }
      }
    }
  },
  data () {
    return {
      state: null,
      options: [
        { value: null, text: (this.multiple) ? 'Selecione os Hospitais de atuação' : 'Selecione o Hospital a ser gerenciado',  disabled: true }
      ]
    }
  },
  methods: {
    getHospitals () {
      (async () => {
        try {
          const hospitalsList = await hospitalsService.get()
          this.options = await hospitalsList.map((hospital) => {
            return {
              value: hospital.id,
              text: hospital.name
            }
          })
          this.loading = false
        } catch (err) {
          this.loading = false
          window.alert('Falha ao obter hospitais')
        }
      })()
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/globals";
@import "./HospitalSelect";
</style>