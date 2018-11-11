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
          <b-button :disabled="loading" type="submit">
            Entrar
          </b-button>
        </b-form>
        <!--
        <b-link v-b-modal.modalpassword>
          Esqueci minha senha
        </b-link>
        *** Falta implementar o back-end do reset de senha, até lá manter oculto ***
        -->
        <span id='error-login' v-if="!loading" v-bind:class="{'show': error}">
          {{error}}
        </span>
        <font-awesome-icon v-if="loading" icon="circle-notch" class="spin loader" />
      </b-card>
      <!--
      <modal-password-reset />
      *** Falta implementar o back-end do reset de senha, até lá manter oculto ***
      -->
    </div>
</template>

<script>
import Authentication from '../../services/Authentication'
const authenticationService = new Authentication()

export default {
  name: 'Login',
  data () {
    return {
      loading: false,
      email: '',
      password: '',
      error: false
    }
  },
  methods: {
    onSubmit () {
      (async () => {
        try {
          this.loading = true
          const { email, password } = this
          const response = await authenticationService.login(email, password)
          this.error = ''

          localStorage.setItem('user', JSON.stringify(response.idTokenPayload.user))
          localStorage.setItem('jwt', response.token)

          if (response.token) {
            if (this.$route.params.nextUrl) {
              this.$router.push(this.$route.params.nextUrl)
            } else {
              this.$router.push({ name: 'PatientList' })
            }
          }
        } catch (err) {
          this.loading = false
          if (err.response) {
            this.error = err.response.parseMessage
          } else {
            this.error = "Falha do servidor, tente novamente mais tarde :("
          }
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