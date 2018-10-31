<template>
  <div id="menu-mobile" v-bind:class="{ 'open': open }">
    <button v-on:click="openMenu">
      <font-awesome-icon :icon="icon" />
    </button>
    <ul>
      <li v-for="(item, index) in items" :key="index">
        <router-link :to="{ path: item.path }">
          <div class="wrapper">
            <font-awesome-icon v-if="item.icon" :icon="item.icon" />
            {{ item.name }}
          </div>
        </router-link>
      </li>
    </ul>
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
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/globals";
@import "./MenuMobile";
</style>