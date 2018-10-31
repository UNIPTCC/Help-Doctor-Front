<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="scss">
@import "./assets/styles/globals";
#app {
  font-family: $default;
  text-align: center;
  min-height: 100vh;
  position: relative;
  background: $gray;
  &.no-scroll {
    overflow-y: hidden;
    max-height: 100vh;
  }
  @media (max-width: 991px) {
    background: $blue;
  }
  /* Global Configs */
  a:hover {
    text-decoration: none;
  }
  .content {
    color: $black;
    min-height: $min-height-container;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow-y: auto;
    overflow-x: hide;
    background: $gray;
    padding-left: 200px;
    @media (max-width: 991px) {
      padding: 15px 0;
      min-height: $min-height-container-tablet;
    }
    @media (max-width: 767px) {
      min-height: $min-height-container-mobile;
    }
    @media (max-height: 750px) {
      min-height: 440px;
    }
  }
  /* Global Configs */
}
</style>
