<template>
  <div class="content" id="not-found">
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
            <router-link to="/login">
              Voltar para o Login
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
@import "./NotFound";
</style>