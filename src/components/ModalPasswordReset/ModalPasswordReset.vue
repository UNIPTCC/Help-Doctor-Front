<template>
  <b-modal
    id="modalpassword"
    size="sm"
    title="Esqueci minha senha"
    centered
  >
    <b-form v-on:submit.prevent="onReset">
      <b-form-input 
        id="email-reset"
        type="email"
        v-model="reset.email"
        required
        placeholder="E-mail"
      />
      <b-button type='submit'>
        Resetar Senha
      </b-button>
    </b-form>
    <span id='error-reset'>
      erros aqui
    </span>
  </b-modal>
</template>

<script>
export default {
  name: 'ModalPasswordReset',
  data () {
    return {
      reset: {
        email: ''
      }
    }
  },
  methods: {
    onReset () {
      alert('reset')
    }
  }
}
</script>

<style lang="scss">
@import "../../assets/styles/globals";
@import "./ModalPasswordReset";
</style>