<template>
  <div id="hospitals-select">
    <b-form-select 
      v-model="hospital" 
      :options="options" 
      :disabled="disabled"
      :loading="loading" 
      :required="required"
      :multiple="multiple"
      :select-size="(multiple) ? 5 : 0"
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
    recieveHospital:  [String, Array, Number],
    required: Boolean,
    multiple: Boolean,
    list: [Array, Boolean]
  },
  created () {
    this.hospital = this.recieveHospital || null
    if (!this.list) {
      this.getHospitals()
    } else {
      this.options = this.list.map((hospital) => {
        return {
          value: hospital.id,
          text: hospital.name
        }
      })
    }
  },
  updated () {
    if (this.hospital === null) {
      this.hospital = this.recieveHospital
    }
  },
  watch: {
    hospital (newVal, oldVal) {
       if (newVal !== oldVal) {
        if (this.multiple && !this.hospital.includes(newVal)) {
          this.hospital.push(newVal)
          this.$emit('pickhospitals', newVal)
        } else {
          this.$emit('pickhospital', newVal)
        }
      }
    },
    recieveHospital (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.hospital = this.recieveHospital || null
      }
    }
  },
  data () {
    return {
      hospital: null,
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
          this.options = this.options.concat(await hospitalsList.map((hospital) => {
            return {
              value: hospital.id,
              text: hospital.name
            }
          }))
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