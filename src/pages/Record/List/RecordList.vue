<template>
  <div>
    <header-default />
    <div class="content" id="record-list">
      <b-container>
        <b-row>
          <b-col cols="12">
            <h1 class="title">
              Lista de Prontuários
            </h1>
          </b-col>
        </b-row>
        <custom-table
          :perPage="perPage"
          :totalRows="totalRows"
          :colunms="colunms"
          :itens="records"
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
  name: 'RecordList',
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
          label: 'Nome do Paciente',
          sortable: true
        },
        {
          key: 'date',
          label: 'Data',
          sortable: true
        },
        {
          key: 'hopsital',
          label: 'Hospital',
          sortable: true
        }
      ],
      records: [
        {
          id: 1,
          name: 'Vitor Montanha',
          hopsital: 'Hospital 1',
          date: '04/09/1998'
        },
        {
          id: 2,
          name: 'Humberto II',
          hopsital: 'Hospital 1',
          date: '21/04/1960'
        },
        {
          id: 3,
          name: 'Catia Izilda',
          hopsital: 'Hospital 2',
          date: '30/03/1970'
        }
      ],
      totalRows: 1,
      perPage: 2
    }
  },
  created() {
    this.totalRows = this.records.length

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
@import "./RecordList";
</style>