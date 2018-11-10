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
          key: 'roleString',
          label: 'Permissão',
          sortable: true
        },
        {
          key: 'hospitalString',
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
          await this.parseHospitals()
          await this.parseRoles()
          this.loading = false
          this.totalRows = this.users.length
        } catch (err) {
          this.loading = false
          window.alert('Falha ao obter usuários')
        }
      })()
    },
    parseRoles () {
       (async () => {
        this.users = this.users.map((user) => {
          const roleString = null
          return {
            roleString,
            ...user
          }
        })
      })()
    },
    parseHospitals () {
      (async () => {
        this.users = await this.users.map((user) => {
          const hospitalString = user.hospitals.map((hospital) => {
            return (hospital.id === user.responsable_hospital) ? hospital.name : false
          }) || ((user.hospitals.length > 0) ? user.hospitals[0].name : '')
          return {
            hospitalString: (hospitalString[0]) ? hospitalString[0] : hospitalString,
            ...user
          }
        })
      })()
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../../assets/styles/globals";
@import "./UserList";
</style>