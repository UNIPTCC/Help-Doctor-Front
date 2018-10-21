<template>
  <div id="not-found" class="content">
    <b-container>
      <b-row>
        <b-col cols="12">
          <font-awesome-icon icon="dizzy" />
          <h2>
            Página não encontrada
          </h2>
          <p>
            Parece que a página que você estava tentando acessar não existe.
          </p>
          <b-button variant="outline-success">
            <router-link to="/">
              Voltar para a Home
            </router-link>
          </b-button>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
  export default {
    name: 'NotFound'
  }
</script>

<style lang="scss" scoped>
@import "../../assets/styles/globals";
#not-found{
  svg {
    font-size: 10vh;
    margin: 15px auto;
  }
  h2 {
    margin: 0 auto 15px;
    text-transform: uppercase;
  }
  p {
    margin: 0;
  }
  button {
    margin: 15px auto;
    border-color: $black;
    transition: $transition;
    a {
      transition: $transition;
      color: $black;
    }
    &:hover {
      background: $gray;
      border-color: $gray;
      a {
        color: $white;
      }
    }
  }
}
</style>