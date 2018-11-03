import Service from './Service'
const { VUE_APP_HELPDOCTOR_API_URL } = process.env

export default class HelpDoctorApi extends Service {
  constructor () {
    super()
    this.base = VUE_APP_HELPDOCTOR_API_URL
  }

  /**
   * Metodo para autenticação do usuário na API
   */
  async authentication (email, password) {
    try {
      if (!email) throw new Error(400, "E-mail obrigatório")
      if (!password) throw new Error(400, "Senha obrigatória")

      return await this.http({
        method: 'post',
        url: `${VUE_APP_HELPDOCTOR_API_URL}/oauth/authorize?grant_type=password`,
        data: {
          username: email,
          password: password
        },
        headers: {
          'Content-Type': 'application/json'
        }
      })
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