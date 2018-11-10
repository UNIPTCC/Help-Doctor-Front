<template>
  <div>
    <header-default />
    <div class="content" id="hospital-list">
      <b-container v-if="!loading">
        <b-row>
          <b-col cols="12">
            <h1 class="title">
              Lista de Hospitais
            </h1>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="12">
            <div class="wrapper">
              <router-link class="btn new" to="/hospital/novo">
                Novo <font-awesome-icon icon="plus" />
              </router-link>
            </div>
          </b-col>
        </b-row>
        <custom-table
          :perPage="perPage"
          :totalRows="totalRows"
          :colunms="colunms"
          :items="hospitals"
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
import Hospitals from '../../../services/Hospitals'
const hospitalsService = new Hospitals()

export default {
  name: 'HospitalList',
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
@import "../../../assets/styles/globals";
@import "./HospitalList";
</style>