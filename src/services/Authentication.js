import Service from './Service'
const { VUE_APP_HELPDOCTOR_API_URL } = process.env

export default class Authentication extends Service {
  constructor () {
    super()
    this.base = VUE_APP_HELPDOCTOR_API_URL
  }

  async login (email, password) {
    try {
      const { data } = await this.http({
        method: 'POST',
        url: `${VUE_APP_HELPDOCTOR_API_URL}/oauth/authorize?grant_type=password`,
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          username: email,
          password: password
        }
      })
      return data
    } catch (err) {
      // eslint-disable-next-line
      console.error(err)
      const { status } = err.response

      switch (status) {
        case 400:
          err.response.parseMessage = "E-mail e Senha são obrigatórios"
          break
        case 401:
          err.response.parseMessage = "Login ou senha inválido(s)"
          break
        default:
          err.response.parseMessage = "Falha do servidor, tente novamente mais tarde :("
      }
      throw err
    }
  }
}