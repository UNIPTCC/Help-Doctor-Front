<template>
  <div id="patient-select">
    <v-autocomplete
      :input-attrs="config"
      :items="options"
      v-model="patient"
      :get-label="getLabel"
      :component-item="template"
      :min-len="0"
      @update-items="filterPatients"
    />
  </div>
</template>

<script>
import PatientAutoCompleteTemplate from './PatientAutoCompleteTemplate.vue'
import Patients from '../../services/Patients'
const patientsService = new Patients()

export default {
  name: 'PatientSelect',
  props: {
    disabled: Boolean,
    loading: Boolean,
    recievePatient: [Object, Boolean],
    required: Boolean
  },
  created () {
    if (this.recievePatient) {
      this.patient = this.recievePatient
    }
    this.getPatients()
  },
  watch: {
    patient (newVal, oldVal) {
       if (newVal !== oldVal && newVal) {
        this.$emit('pickpatient', newVal)
      }
    }
  },
  data () {
    return {
      patient: {
        name: '',
        id: 0,
        personal_document: ''
      },
      options: [],
      patients: [],
      config: {
        placeholder: 'Procurar o paciente',
        required: this.required,
        disabled: this.disabled
      },
      template: PatientAutoCompleteTemplate
    }
  },
  methods: {
    getLabel (item) {
      return (item) ? item.name : ''
    },
    getPatients () {
      (async () => {
        try {
          const patientsList = await patientsService.get()
          this.patients = patientsList.map((patient) => {
            return {
              id: patient.id,
              name: patient.name,
              personal_document: patient.personal_document
            }
          })
          this.loading = false
        } catch (err) {
          this.loading = false
          window.alert('Falha ao obter pacientes')
        }
      })()
    },
    filterPatients (search) {
      if (search) {
        search = search.toLowerCase()
        const filter = this.patients.filter((patient) => {
          const name = patient.name.toLowerCase()
          return name.search(search.toLowerCase()) !== -1
        })
        if (filter) {
          this.options = filter
        } else {
          this.options = this.patients
        }
      }
    }
  }
}
</script>

<style lang="scss">
@import "../../assets/styles/globals";
@import "./PatientSelect";
</style>