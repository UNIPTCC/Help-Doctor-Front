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
  @media (max-width: 991px) {
    background: $blue;
  }
  /* Global Configs */
  a:hover {
    text-decoration: none;
  }
  &.no-scroll {
    @media (max-width: 991px) {
      overflow-y: hidden;
      max-height: 100vh;
    }
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
    padding: 15px 0 15px 200px;
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
  .content-full {
    padding: 0;
  }
  .spin {
    animation: spinner 1.3s linear infinite;
  }
  .loader {
    color: $blue;
    font-size: 40px;
  }
  form {
    input, select, textarea {
      margin: 0 0 15px;
      color: $black;
      font-size: 16px;
      border-radius: $radius;
      background: $white;
      min-height: calc(2.25rem + 2px);
      padding: 0.375rem 1.75rem 0.375rem 0.75rem;
      line-height: 1.5;
      width: 100%;
      border: 1px solid $gray-bg;
      vertical-align: middle;
      display: inline-block;
      &:disabled {
        color: $black-disabled;
        background: $gray-bg;
      }
    }
  }
  /* Global Configs */
  /* Classes */
  .fc-toolbar .fc-state-active, .fc-toolbar .ui-state-active {
    z-index: 1;
  }
  .display-show {
    display: inline-block;
  }
  .display-hide {
    display: none;
  }
  .title {
    color: $blue;
    text-transform: uppercase;
    font-weight: 600;
    margin: 0 auto 30px;
    font-size: 2rem;
  }
  .btn.new {
    width: 90px;
    height: 38px;
    position: relative;
    border: none;
    color: $white;
    background: $blue;
    font-weight: 600;
    border-radius: 4px;
    transition: $transition;
    &.disabled {
      color: $white;
      background: $gray-disable;
      &:hover {
        color: $white;
        background: $gray-disable;
      }
    }
    &:hover {
      background: darken($blue, 25%);
      color: $white;
    }
    &:focus, &:active, &:hover {
      outline: none;
    }
  }
  /* Classes */
}
</style>
