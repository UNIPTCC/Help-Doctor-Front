<template>
  <div>
    <header-default />
    <div class="content" id="patient-list">
      <b-container>
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
          :itens="patients"
          editable
        />
      </b-container>
    </div>
    <footer-default />
  </div>
</template>

<script>
// import HelpDoctorApi from '../../../services/HelpDoctorApi' // Exemplo de request

export default {
  name: 'PatientList',
  data () {
    return {
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
          key: 'document',
          label: 'CPF',
          sortable: true
        },
        {
          key: 'birthday',
          label: 'Data de nascimento',
          sortable: true
        }
      ],
      patients: [
        {
          id: 1,
          name: 'Vitor Montanha',
          document: '330.315.510-01',
          birthday: '04/09/1998'
        },
        {
          id: 2,
          name: 'Humberto II',
          document: '870.622.620-56',
          birthday: '21/04/1960'
        },
        {
          id: 3,
          name: 'Catia Izilda',
          document: '111.319.140-66',
          birthday: '30/03/1970'
        }
      ],
      totalRows: 1,
      perPage: 2
    }
  },
  created() {
    this.totalRows = this.patients.length

    // this.api = new HelpDoctorApi() // Exemplo de request

    // this.getStatus() // Exemplo de request
  },
  methods: {
    // getStatus () {
    //   (async () => {
    //     let status = await this.api.getStatus()
    //     console.log(status)
    //   })()
    // }
  }
}
</script>

<style lang="scss" scoped>
@import "../../../assets/styles/globals";
@import "./PatientList";
</style>