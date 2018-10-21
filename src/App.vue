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
        <a target="_blank" href="mailto:jonatasjosf@gmail.com">
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
  background: $gray;
  /* Global Configs */
  a:hover {
    text-decoration: none;
  }

  /* Global Configs */
  /* Header */
  .navbar {
    background: $gray;
    .navbar-brand {
      margin: 0 auto;
      a {
        color: $black;
        transition: $transition;
        font-family: $comics;
        h1 {
          font-size: 20px;
          transition: $transition;
        }
        &:hover, &:active, &:focus {
          h1 {
            text-shadow: 0 0 5px $black;
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
    p {
      margin: 0 auto;
      color: $black;
      a, span {
        transition: $transition;
      }
      a {
        &:hover, &:active, &:focus {
          font-size: 20px;
        }
      }
    }
  }
  @media (max-width: 991px) {
    footer {
      position: relative;
    }
  }
  /* Footer */
}
</style>
