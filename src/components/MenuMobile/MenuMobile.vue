<template>
  <div id="menu-mobile">
    <div id="menu-desktop">
      <ul>
        <li v-for="(item, index) in items" :key="index">
          <router-link :to="{ path: item.path }">
            <font-awesome-icon v-if="item.icon" :icon="item.icon" />
            {{ item.name }}
          </router-link>
        </li>
      </ul>
    </div>
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
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/globals";
@import "./MenuMobile";
</style>