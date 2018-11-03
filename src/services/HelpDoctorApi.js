import Service from './Service'
const { VUE_APP_HELPDOCTOR_API_URL } = process.env

export default class HelpDoctorApi extends Service {
  constructor () {
    super()
    this.base = VUE_APP_HELPDOCTOR_API_URL
  }

  /**
   * Metodo para autenticação do usuário na API
   * @param {string} email - email do usuário
   * @param {string} password - senha do usuário
   */
  async authentication (email, password) {
    try {
      const { data } = await this.http({
        method: 'POST',
        url: `${VUE_APP_HELPDOCTOR_API_URL}/oauth/authorize?grant_type=password`,
        data: {
          username: email,
          password: password
        },
        headers: {
          'Content-Type': 'application/json'
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

  /**
   * Pega a lista de hospitais
   */
  async getHospitals () {
    try {
      const { data } =  await this.http({
        method: 'GET',
        url: `${VUE_APP_HELPDOCTOR_API_URL}/hospital`,
        headers: {
          'Content-Type': 'application/json'
          // 'Authorization ': `Bearer ${this.getJWT()}` // TODO descomentar quando o Guilherme normalizar a autorização nessa rota
        }
      })

      return data
    } catch (err) {
      // eslint-disable-next-line
      console.error(err)
      throw err
    }
  }
}