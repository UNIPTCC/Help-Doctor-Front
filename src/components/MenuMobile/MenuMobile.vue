<template>
  <div id="menu-mobile" v-bind:class="{ 'open': open }">
    <button v-on:click="openMenu">
      <font-awesome-icon :icon="icon" />
    </button>
    <ul>
      <li v-for="(item, index) in items" :key="index">
        <router-link v-on:click="openMenu()" :to="{ path: item.path }">
          <div class="wrapper">
            <font-awesome-icon v-if="item.icon" :icon="item.icon" />
            {{ item.name }}
          </div>
        </router-link>
      </li>
    </ul>
    <a class="exit" v-on:click="$logout">
      <font-awesome-icon icon="sign-out-alt" />
      Sair
    </a>
  </div>
</template>

<script>
export default {
  name: 'MenuMobile',
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      open: false,
      icon: 'grip-vertical'
    }
  },
  methods: {
    openMenu () {
      this.open = !this.open
      this.icon = (this.open) ? 'times' : 'grip-vertical'
      if (this.open) {
        document.querySelector('#app').classList.add('no-scroll')
      } else {
        document.querySelector('#app').classList.remove('no-scroll')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/globals";
@import "./MenuMobile";
</style>