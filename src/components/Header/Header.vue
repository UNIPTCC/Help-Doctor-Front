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
        },
        {
          name: 'Agenda',
          path: '/agenda',
          icon: 'calendar-alt'
        },
        {
          name: 'Prontuários',
          path: '/prontuario',
          icon: 'notes-medical'
        },
        {
          name: 'Pacientes',
          path: '/paciente',
          icon: 'user'
        },
        {
          name: 'Hospitais',
          path: '/hospital',
          icon: 'hospital'
        },
        {
          name: 'Usuários',
          path: '/usuario',
          icon: 'user-md'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/globals";
@import "./Header";
</style>