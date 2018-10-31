<template>
  <div id="menu-mobile" v-bind:class="{ 'open': open }">
    <button v-on:click="openMenu">
      <font-awesome-icon :icon="icon" />
    </button>
    <ul>
      <li v-for="(item, index) in items" :key="index">
        <router-link :to="{ path: item.path }">
          <font-awesome-icon v-if="item.icon" :icon="item.icon" />
          {{ item.name }}
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
      icon: 'th'
    }
  },
  methods: {
    openMenu () {
      this.open = !this.open
      this.icon = (this.open) ? 'times' : 'th'
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/globals";
@import "./MenuMobile";
</style>