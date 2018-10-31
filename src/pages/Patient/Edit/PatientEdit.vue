<template>
<div>
    <header-default />
    <div class="content" id="patient-edit">
      <b-container>
        <b-row>
          <b-col cols="12">
            <h1 class="title">
              Editar de Paciente 'nome'
            </h1>
          </b-col>
        </b-row>
      </b-container>
    </div>
    <footer-default />
  </div>
</template>

<script>
export default {
  name: 'PatientEdit',
  data () {
    return {
      patient: {
        
      }
    }
  },
  created() {
    // $route.params.id -> para pegar o ID da url
  }
}
</script>

<style lang="scss" scoped>
@import "../../../assets/styles/globals";
@import "./PatientEdit";
</style>