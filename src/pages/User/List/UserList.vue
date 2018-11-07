<template>
  <div>
    <header-default />
    <div class="content" id="user-list">
      <b-container>
        <b-row>
          <b-col cols="12">
            <h1 class="title">
              Lista de Usuários
            </h1>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="12">
            <div class="wrapper">
              <router-link class="btn new" to="/usuario/novo">
                Novo <font-awesome-icon icon="plus" />
              </router-link>
            </div>
          </b-col>
        </b-row>
        <custom-table
          :perPage="perPage"
          :totalRows="totalRows"
          :colunms="colunms"
          :items="users"
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
  name: 'UserList',
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
          key: 'role',
          label: 'Permissão',
          sortable: true
        },
        {
          key: 'hospital',
          label: 'Hospital',
          sortable: true
        }
      ],
      users: [
        {
          id: 1,
          name: 'Guilhérme',
          role: 'Médico',
          hospital: 'Hospital 1'
        },
        {
          id: 2,
          name: 'Jonatas',
          role: 'Atendente',
          hospital: 'Hospital 1'
        },
        {
          id: 3,
          name: 'Vinícius',
          role: 'Admin',
          hospital: '-'
        }
      ],
      totalRows: 1,
      perPage: 2
    }
  },
  created() {
    this.totalRows = this.users.length

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
@import "./UserList";
</style>