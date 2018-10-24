<template>
 <div>
    <header-default />
    <div class="content" id="hospital-list">
      <b-container>
        <b-row>
          <b-col cols="12">
            <h1 class="title">
              Lista de Hospitais
            </h1>
          </b-col>
        </b-row>
        <custom-table
          :perPage="perPage"
          :totalRows="totalRows"
          :colunms="colunms"
          :itens="hospitals"
        />
      </b-container>
    </div>
    <footer-default />
  </div>
</template>

<script>
import HelpDoctorApi from '../../../services/HelpDoctorApi' // Exemplo de request

export default {
  name: 'HospitalList',
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
        }
      ],
      hospitals: [
        {
          id: 1,
          name: 'Hospital 1',
        },
        {
          id: 2,
          name: 'Hospital 2',
        },
        {
          id: 3,
          name: 'Order Hospital 3',
        }
      ],
      totalRows: 1,
      perPage: 2
    }
  },
  created() {
    this.totalRows = this.hospitals.length

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

<style lang="scss">
@import "../../../assets/styles/globals";
@import "./HospitalList";
</style>