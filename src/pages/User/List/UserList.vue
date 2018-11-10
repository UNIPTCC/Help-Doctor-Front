<template>
  <div>
    <header-default />
    <div class="content" id="user-list">
      <b-container v-if="!loading">
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
      <font-awesome-icon v-if="loading" icon="circle-notch" class="spin loader" />
    </div>
    <footer-default />
  </div>
</template>

<script>
import Users from '../../../services/Users'
const usersService = new Users()

export default {
  name: 'UserList',
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
      users: [],
      totalRows: 0,
      perPage: 10
    }
  },
  created() {
    (async () => {
      await this.getUsers()
    })()
  },
  methods: {
    getUsers () {
      (async () => {
        try {
          this.users = await usersService.get()
          this.loading = false
          this.totalRows = this.users.length
        } catch (err) {
          this.loading = false
          window.alert('Falha ao obter usuários')
        }
      })()
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../../assets/styles/globals";
@import "./UserList";
</style>