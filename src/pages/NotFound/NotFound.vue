<template>
  <div class="content content-full" id="not-found">
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
            <a v-on:click="$router.go(-1)">
              Voltar para a página anterior
            </a>
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