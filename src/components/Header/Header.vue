<template>
  <div class="header">
    <b-navbar toggleable="md" type="light">
      <b-navbar-brand>
        <router-link to="/home">
          <h1>
            HelpDoctor
          </h1>
        </router-link>
      </b-navbar-brand>
    </b-navbar>
    <div class="wrapper-menu">
      <menu-mobile :items="menu" />
      <menu-desktop :items="menu" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {
      menu: [
        {
          name: 'Home',
          path: '/home',
          icon: 'home'
        }
      ],
      appointmentsMenu: {
        name: 'Consultas',
        path: '/consulta',
        icon: 'calendar-alt'
      },
      queueMenu: {
        name: 'Atendimento',
        path: '/atendimento',
        icon: 'exclamation'
      },
      recordsMenu: {
        name: 'Prontuários',
        path: '/prontuario',
        icon: 'notes-medical'
      },
      patientsMenu: {
        name: 'Pacientes',
        path: '/paciente',
        icon: 'user'
      },
      hospitalsMenu: {
        name: 'Hospitais',
        path: '/hospital',
        icon: 'hospital'
      },
      usersMenu: {
        name: 'Usuários',
        path: '/usuario',
        icon: 'user-md'
      }
    }
  },
  created () {
    this.parseMenus()
  },
  methods: {
    parseMenus () {
      const { 
        appointmentsMenu,
        queueMenu,
        recordsMenu,
        patientsMenu,
        hospitalsMenu,
        usersMenu
      } = this
      const { roleName } = JSON.parse(localStorage.getItem('user'))
      switch (roleName) {
        case 'ADMIN':
          this.menu = this.menu.concat(appointmentsMenu, queueMenu, recordsMenu, patientsMenu, hospitalsMenu, usersMenu)
          break
        case 'MANAGER':
          this.menu = this.menu.concat(appointmentsMenu, queueMenu, recordsMenu, patientsMenu, usersMenu)
          break
        case 'DOCTOR':
          this.menu = this.menu.concat(appointmentsMenu, queueMenu, recordsMenu, patientsMenu)
          break
        case 'NURSE':
          this.menu = this.menu.concat(recordsMenu, queueMenu, patientsMenu)
          break
        case 'RECEPTIONIST':
          this.menu = this.menu.concat(recordsMenu, patientsMenu)
          break
        default:
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/globals";
@import "./Header";
</style>