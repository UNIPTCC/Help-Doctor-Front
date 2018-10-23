<template>
    <div class="content" id="login">
      <b-card title="Login">
        <hr class='separator' />
        <b-form v-on:submit.prevent="onSubmit">
          <b-form-input 
            id="email"
            type="email"
            v-model="login.email"
            required
            placeholder="E-mail"
          />
          <b-form-input 
            id="password"
            type="password"
            v-model="login.password"
            required
            placeholder="Senha"
          />
          <b-button type='submit'>
            Entrar
          </b-button>
        </b-form>
        <b-link v-b-modal.modalpassword>
          Esqueci minha senha
        </b-link>
        <span id='error-login'>
          erros aqui
        </span>
      </b-card>
      <modal-password-reset />
    </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      login: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    onSubmit () {
      alert('login')
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/globals";
@import "./Login";
</style>