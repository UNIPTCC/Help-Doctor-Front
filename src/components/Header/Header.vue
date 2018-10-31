<template>
  <div class="header">
    <b-navbar toggleable="md" type="light">
      <b-navbar-brand>
        <router-link to="/">
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
          name: 'Hospitais',
          path: '/hospital',
          icon: 'hospital'
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