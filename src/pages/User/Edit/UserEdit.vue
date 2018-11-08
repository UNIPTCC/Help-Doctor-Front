<template>
<div>
    <header-default />
    <div class="content" id="user-edit">
      <b-container v-if="!loading">
        <b-row>
          <b-col cols="12">
            <h1 class="title">
              {{title}}
            </h1>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="12">
            <form>
              formulário aqui
            </form>
          </b-col>
        </b-row>
      </b-container>
      <font-awesome-icon v-if="loading" icon="circle-notch" class="spin loader" />
    </div>
    <footer-default />
  </div>
</template>

<script>
export default {
  name: 'UserEdit',
  data () {
    return {
      loading: true,
      title: (this.$route.params.id) ? `Editar Usuário` : 'Novo Usuário',
      user: {},
      error: false
    }
  },
  created() {
    this.loading = false
    if (this.$route.params.id) {
      // TODO implementar metodo
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../../assets/styles/globals";
@import "./UserEdit";
</style>