<template>
    <div class="content" id="login">
        <b-card title="Login">
          <b-form v-on:submit.prevent="onSubmit">
            <b-form-input 
              id="email"
              type="email"
              v-model="form.email"
              required
              placeholder="E-mail"
            />
            <b-form-input 
              id="password"
              type="password"
              v-model="form.password"
              required
              placeholder="Senha"
            />
            <b-button type='submit'>
              Save
            </b-button>
          </b-form>
          <b-link href="#">
            Esqueci minha senha
          </b-link>
        </b-card>
        <span id='errors'>
          erros aqui
        </span>
    </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      form: {
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