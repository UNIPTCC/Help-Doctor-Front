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
          :class="{editable:editable}"
        >
           <template slot="actions" slot-scope="row">
             <font-awesome-icon icon="pencil-alt" />
           </template>
        </b-table>
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
    },
    editable: {
      type: Boolean,
      required: false
    }
  },
  created() {
    this.totalRows = this.itens.length
    if (this.editable) {
      this.colunms.push({
        key: 'actions',
        label: '',
        sortable: false
      })
    }
  },
  watch: {
    itens (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.totalRows = this.itens.length
      }
    },
    editable (newVal, oldVal) {
      if (newVal !== oldVal) {
        if (this.editable) {
          this.colunms.push({
            key: 'actions',
            label: '',
            sortable: false
          })
        } else {
          this.colunms.pop()
        }
      }
    }
  },
  methods: {
    onFiltered (filteredItems) {
      this.totalRows = filteredItems.length
      this.currentPage = 1
    }
  }
}
</script>

<style lang="scss">
@import "../../assets/styles/globals";
@import "./CustomTable";
</style>