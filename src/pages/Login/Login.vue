<template>
    <div class="content content-full" id="login">
      <b-card title="Login">
        <hr class='separator' />
        <b-form v-on:submit.prevent="onSubmit">
          <b-form-input 
            id="email"
            type="email"
            v-model="email"
            required
            placeholder="E-mail"
          />
          <b-form-input 
            id="password"
            type="password"
            v-model="password"
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
        <span id='error-login' v-bind:class="{'show': error}">
          {{error}}
        </span>
      </b-card>
      <!-- <modal-password-reset /> Falta implementar o back-end do reset de senha, até lá manter oculto -->
    </div>
</template>

<script>
import HelpDoctorApi from '../../services/HelpDoctorApi'

const api = new HelpDoctorApi()

export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: '',
      error: false
    }
  },
  methods: {
    onSubmit () {
      (async () => {
        try {
          const { email, password } = this
          const response = await api.authentication(email, password)
          this.error = false
          localStorage.setItem('user', JSON.stringify(response.data.idTokenPayload.user))
          localStorage.setItem('jwt', response.data.token)
        } catch (err) {
          this.error = err.response.parseMessage
        }
      })()
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/globals";
@import "./Login";
</style>