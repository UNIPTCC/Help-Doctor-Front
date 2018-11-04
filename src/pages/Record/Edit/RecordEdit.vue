<template>
<div>
    <header-default />
    <div class="content" id="record-edit">
      <b-container>
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
    </div>
    <footer-default />
  </div>
</template>

<script>
export default {
  name: 'RecordEdit',
  data () {
    return {
      title: (this.$route.params.id) ? `Editar Prontuário` : 'Novo Prontuário',
      record: {},
      error: false
    }
  },
  created() {
    if (this.$route.params.id) {
      // TODO implementar metodo
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../../assets/styles/globals";
@import "./RecordEdit";
</style>