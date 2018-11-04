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
          editable
        />
      </b-container>
    </div>
    <footer-default />
  </div>
</template>

<script>
import Hospitals from '../../../services/Hospitals'
const hospitalsService = new Hospitals()

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
      hospitals: [],
      totalRows: 0,
      perPage: 10,
      error: false
    }
  },
  created() {
    (async () => {
      await this.getHospitals()
    })()
  },
  methods: {
    getHospitals () {
      (async () => {
        try {
          this.hospitals = await hospitalsService.get()
          this.totalRows = this.hospitals.length
        } catch (err) {
          this.error = 'Falha ao obter hospitais'
        }
      })()
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../../assets/styles/globals";
@import "./HospitalList";
</style>