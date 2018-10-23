<template>
  <div id="app">
    <b-navbar toggleable="md" type="light">
      <b-navbar-brand>
        <router-link to="/">
          <h1>
            HelpDoctor
          </h1>
        </router-link>
      </b-navbar-brand>
    </b-navbar>
    <router-view></router-view>
    <footer>
      <p>
        Desenvolvido por 
        <a target="_blank" href="https://github.com/guimap">
          Guilherme Pereira
        </a> | 
        <a href="mailto:jonatasjosf@gmail.com">
          Jonatas Ferreira
        </a> | 
        <a target="_blank" href="https://github.com/marcbatista">
          Marcello Batista
        </a> | 
        <a target="_blank" href="https://github.com/pinheiroRaafa">
          Rafael Pinheiro
        </a> | 
        <a target="_blank" href="https://github.com/vinimarcili">
          Vinícius Marcili
        </a>
      </p>
    </footer>
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
  background: $white;
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
    background: $white;
    @media (max-width: 991px) {
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
  /* Header */
  .navbar {
    background: $blue;
    .navbar-brand {
      margin: 0 auto;
      a {
        color: $white;
        transition: $transition;
        font-family: $comics;
        figure {
          margin: 0 auto;
          max-width: 15vh;
          border-radius: 50%;
          box-shadow: 0 0 5px 0 $white;
          transition: $transition;
          background: darken($white, 5%);
        }
        h1 {
          font-size: 20px;
          transition: $transition;
        }
        &:hover, &:active, &:focus {
          color: $white;
          figure {
            box-shadow: 0 0 5px 3px $white;
            background: $white;
          }
          h1 {
            text-shadow: 0 0 5px $white;
          }
        }
      }
    }
  }
  /* Header */
  /* Footer */
  footer {
    position: absolute;
    bottom: 0;
    padding: 15px;
    width: 100%;
    background: $blue;
    p {
      line-height: 60px;
      margin: 0 auto;
      color: $white;
      a, span {
        color: $white;
        transition: $transition;
      }
      a {
        &:hover, &:active, &:focus {
          color: $gray-bg;
          font-size: 18px;
        }
      }
    }
    @media (max-width: 991px) {
      position: relative;
    }
  }
  /* Footer */
}
</style>
