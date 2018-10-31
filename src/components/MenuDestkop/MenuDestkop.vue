<template>
  <div id="menu-desktop">
    <ul>
      <li v-for="(item, index) in items" :key="index" v-on:click="setActive('about')">
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
  name: 'MenuDestkop',
  props: {
    items: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/globals";
@import "./MenuDestkop";
</style>