<template>
  <div>
    <header-default />
    <div class="content" id="record-list">
      <b-container v-if="!loading">
        <b-row>
          <b-col cols="12">
            <h1 class="title">
              Lista de Prontuários
            </h1>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="12">
            <div class="wrapper">
              <router-link class="btn new" to="/prontuario/novo">
                Novo <font-awesome-icon icon="plus" />
              </router-link>
            </div>
          </b-col>
        </b-row>
        <custom-table
          :perPage="perPage"
          :colunms="colunms"
          :items="records"
          :editable="canEdit()"
          sortBy="id"
        />
      </b-container>
      <font-awesome-icon v-if="loading" icon="circle-notch" class="spin loader" />
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
      loading: true,
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
      perPage: 10
    }
  },
  created() {
    this.loading = false
  },
  methods: {
    canEdit () {
      const user = JSON.parse(localStorage.getItem('user'))
      return user.roleName !== 'RECEPTIONIST'
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../../assets/styles/globals";
@import "./RecordList";
</style>