<template>
 <div>
    <header-default />
    <div class="content" id="hospital-list">
      <b-container>
        <b-row>
          <b-col cols="12">
            <h1>
              Lista de Hospitais
            </h1>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-form class="filter">
              <b-input v-model="filter" placeholder="Filtrar" />
              <b-btn :disabled="!filter" @click="filter = ''">X</b-btn>
            </b-form>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-table
              responsive
              striped
              hover
              stacked="lg"
              :items="hospitals"
              :fields="colunms"
              :current-page="currentPage"
              :per-page="perPage"
              :filter="filter"
              @filtered="onFiltered"
            />
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="12">
            <b-pagination
              :total-rows="totalRows"
              :per-page="perPage"
              v-model="currentPage"
            />
          </b-col>
        </b-row>
      </b-container>
    </div>
    <footer-default />
  </div>
</template>

<script>
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
      stacked: (window.innerWidth > 991) ? false : true,
      currentPage: 1,
      perPage: 1,
      totalRows: 1,
      filter: null
    }
  },
  created() {
    this.totalRows = this.hospitals.length
  },
  methods: {
    onFiltered (filteredItems) {
      this.totalRows = filteredItems.length
      this.currentPage = 1
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../../assets/styles/globals";
@import "./HospitalList";
</style>