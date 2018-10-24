<template>
  <div class="custom-table">
    <b-row>
      <b-col>
        <b-form class="filter">
          <b-input v-model="filter" placeholder="Filtrar" />
          <b-btn :disabled="!filter" @click="filter = ''">Limpar</b-btn>
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
          :items="itens"
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
        <p class="pagination-total">
          Total de {{totalRows}} registros encontrados
        </p>
      </b-col>
    </b-row>  
  </div>
</template>

<script>
export default {
  name: 'CustomTable',
  data () {
    return {
      stacked: (window.innerWidth > 991) ? false : true,
      currentPage: 1,
      filter: null
    }
  },
  props: {
    perPage: {
      type: Number,
      required: true
    },
    totalRows: {
      type: Number,
      required: true
    },
    itens: {
      type: Array,
      required: true
    },
    colunms: {
      type: Array,
      required: true
    }
  },
  created() {
    this.totalRows = this.itens.length
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
@import "../../assets/styles/globals";
@import "./CustomTable";
</style>