<template>
<div>
    <header-default />
    <div class="content" id="user-edit">
      <b-container v-if="!loading">
        <b-row>
          <b-col cols="12">
            <h1 class="title">
              {{title}}
            </h1>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="12">
            <form v-on:submit.prevent="onSubmit">
              <b-row>
                <b-col cols="12" sm="12" md="12" lg="6" xl="6">
                  <b-form-input
                    type='text'
                    v-model.trim='user.name'
                    placeholder='Nome'
                    required
                  />
                </b-col>
                <b-col cols="12" sm="12" md="12" lg="6" xl="6">
                  <b-form-input
                    type='email'
                    v-model.trim='user.email'
                    placeholder='E-mail'
                    required
                  />
                </b-col>
                <b-col cols="12" sm="12" md="12" lg="6" xl="6">
                  <b-form-input
                    type='password'
                    v-model.trim='password'
                    placeholder='Senha'
                  />
                </b-col>
                <b-col cols="12" sm="12" md="12" lg="6" xl="6">
                  <b-form-input
                    type='password'
                    v-model.trim='confirmPassword'
                    placeholder='Confirmação de senha (Preencha apenas se mudar a senha)'
                  />
                </b-col>
                <b-col cols="12" sm="12" md="12" lg="6" xl="6">
                  <b-form-input
                    type='text'
                    v-model.trim='user.personal_document'
                    placeholder='CPF'
                    v-mask="['###.###.###-##']"
                    required
                  />
                </b-col>
                <b-col cols="12" sm="12" md="12" lg="6" xl="6">
                  <b-form-select 
                    v-model="user.genre"
                    :options="genders"
                    required
                  />
                </b-col>
                <b-col cols="12" sm="12" md="12" lg="4" xl="4">
                  <datetime
                    type="date"
                    v-model="user.birthday"
                    format="dd/MM/yyyy"
                    placeholder="Data de nascimento"
                    required
                  />
                </b-col>
                <b-col cols="12" sm="12" md="12" lg="4" xl="4">
                  <hospital-select 
                    :recieveHospital="user.responsable_hospital"
                    v-on:pickhospital="recieveHospital"
                    v-if="roleId === 2"
                    :required="roleId === 2"
                  />
                  <b-form-input
                    type='text'
                    placeholder="Documento de licença Médica"
                    v-model.trim='user.medical_document'
                    v-if="roleId === 3 || roleId === 4"
                    :required="roleId === 3 || roleId === 4"
                  />
                </b-col> 
              </b-row>
              <b-row>
                <b-col cols="12" sm="12" md="12" lg="6" xl="6">
                  <hospital-select
                    :recieveHospital="hospitalIds"
                    v-on:pickhospitals="recieveHospitals"
                    multiple
                    required
                  />
                </b-col> 
                <b-col cols="12" sm="12" md="12" lg="6" xl="6">
                  <role-select
                    :recieveRole="roleId"
                    v-on:pickrole="recieveRole"
                    required
                  />
                </b-col>     
              </b-row>
              <address-form v-on:pickaddress="recieveAddress" :addressObject="user.address" />
              <b-row>
                <b-col class='text-right'>
                  <b-btn class='new' type='submit'>
                    <font-awesome-icon icon="save" /> Salvar
                  </b-btn>
                </b-col>
              </b-row>
            </form>
          </b-col>
        </b-row>
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
  name: 'UserEdit',
  data () {
    return {
      loading: true,
      title: (this.$route.params.id) ? `Editar Usuário` : 'Novo Usuário',
      genders: [
        {
          text: 'Genêro', value: null, disabled: true
        },
        {
          text: 'Masculino', value: 'M'
        },
        {
          text: 'Feminino', value: 'F'
        }
      ],
      user: {
        genre: null,
        roles: null,
        address: {}
      },
      password: '',
      confirmPassword: '',
      hospitalIds: [],
      roleId: null,
      error: false
    }
  },
  created() {
    const { id } = this.$route.params
    if (id) {
      this.getUser(id)
    } else {
      this.loading = false
    }
  },
  methods: {
    getUser (id) {
      (async () => {
        try {
          this.user = await usersService.get(id)
          if (!this.user.address) {
            this.user.address = {}
          }
          if (!this.user.hospitals) {
            this.user.hospitals = {}
          }
          if (!this.user.roles) {
            this.user.roles = {}
          }
          await this.parseHospitals()
          await this.parseRoles()
          this.loading = false
        } catch (err) {
          window.alert('Falha ao obter o Usuário')
          this.$router.push({ name: 'UserList' })
        }
      })()
    },
    onSubmit () {
      (async () => {
        try {
          const { user } = this
          const { id } = this.$route.params
          let response = null
          if (this.verifyPassword()) {
            if (!id) {
              this.user.roles_id
              response = await usersService.create(user)
            } else {
              response = await usersService.update(id, user)
            }
            if (response) {
              this.error = ''
              window.alert("Usuário atualizado com sucesso")
              this.$router.push({ name: 'UserList' })
            }
          } else {
            window.alert('Senha e confirmação de senha devem ser iguais.')
          }
        } catch (err) {
          if (err.response) {
            this.error = err.response.parseMessage
          } else {
            this.error = "Falha do servidor, tente novamente mais tarde :("
          }
          window.alert(this.error)
        }
      })()
    },
    verifyPassword() {
      const { password, confirmPassword } = this
      if (password) {
        if (password === confirmPassword) {
          this.user.password = password
          return true
        } else {
          return false
        }
      }
      return true
    },
    parseHospitals () {
      (async () => {
        this.hospitalIds = await this.user.hospitals.map((hospital) => {
          return hospital.id
        })
      })()
    },
    parseRoles () {
      (async () => {
        if (this.user.roles[0]) {
          this.roleId = await this.user.roles[0].id || null
        }
      })()
    },
    recieveAddress (data) {
      if (!this.user.address) {
        this.user.address = {}
      }
      this.user.address[data.name] = data.value
    },
    recieveHospital (data) {
      this.user.responsable_hospital = data
    },
    recieveHospitals (data) {   
      this.user.hospitals = data
    },
    recieveRole (data) {
      this.roleId = data
      this.user.roles = [
        data
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../../assets/styles/globals";
@import "./UserEdit";
</style>