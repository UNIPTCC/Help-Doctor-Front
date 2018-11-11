<template>
  <div>
    <header-default />
    <div class="content" id="patient-list">
      <b-container v-if="!loading">
        <b-row>
          <b-col cols="12">
            <h1 class="title">
              Lista de Pacientes
            </h1>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="12">
            <div class="wrapper">
              <router-link class="btn new" to="/paciente/novo">
                Novo <font-awesome-icon icon="plus" />
              </router-link>
            </div>
          </b-col>
        </b-row>
        <custom-table
          :perPage="perPage"
          :totalRows="totalRows"
          :colunms="colunms"
          :items="patients"
          sortBy="id"
          editable
        />
      </b-container>
      <font-awesome-icon v-if="loading" icon="circle-notch" class="spin loader" />
    </div>
    <footer-default />
  </div>
</template>

<script>
import 'moment/locale/pt-br'
import Patients from '../../../services/Patients'
const patientsService = new Patients()

export default {
  name: 'PatientList',
  data () {
    return {
      loading: true,
      colunms: [
        {
          key: 'id',
          label: 'ID',
          sortable: true
        },
        {
          key: 'name',
          label: 'Nome',
          sortable: true
        },
        {
          key: 'personal_document',
          label: 'CPF',
          sortable: true
        },
        {
          key: 'birthdayParsed',
          label: 'Data de nascimento',
          sortable: true
        }
      ],
      patients: [],
      totalRows: 0,
      perPage: 10,
      error: false
    }
  },
  created() {
    (async () => {
      await this.getPatients()
    })()
  },
  methods: {
    getPatients () {
      (async () => {
        try {
          this.patients = await patientsService.get()
          await this.parseDates()
          this.totalRows = this.patients.length
          this.loading = false
        } catch (err) {
          this.loading = false
          window.alert('Falha ao obter os pacientes')
        }
      })()
    },
    parseDates () {
      (async () => {
        this.patients = this.patients.map((patient) => {
          const birthdayParsed = this.$moment(patient.birthday).format('LL')
          return {
            birthdayParsed,
            ...patient
          }
        })
      })()
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../../assets/styles/globals";
@import "./PatientList";
</style>