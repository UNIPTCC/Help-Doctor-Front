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
        // Comentado para não aparecer, já que precisa de possivel desenvolvimento e não vai dar tempo
        // {
        //   name: 'Home',
        //   path: '/home',
        //   icon: 'home'
        // }
      ],
      appointmentsMenu: {
          name: 'Agenda',
          path: '/agenda',
          icon: 'calendar-alt'
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
        recordsMenu,
        patientsMenu,
        hospitalsMenu,
        usersMenu
      } = this
      const { roleName } = this.$user
      switch (roleName) {
        case 'ADMIN':
          this.menu = this.menu.concat(appointmentsMenu, recordsMenu, patientsMenu, hospitalsMenu, usersMenu)
          break
        case 'MANAGER':
          this.menu = this.menu.concat(appointmentsMenu, recordsMenu, patientsMenu, usersMenu)
          break
        case 'DOCTOR':
          this.menu = this.menu.concat(appointmentsMenu, recordsMenu, patientsMenu)
          break
        case 'NURSE':
          this.menu = this.menu.concat(recordsMenu, patientsMenu)
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