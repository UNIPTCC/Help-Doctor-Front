import Service from './Service'
const { VUE_APP_HELPDOCTOR_API_URL } = process.env

export default class HelpDoctorApi extends Service {
  constructor () {
    super()
    this.base = VUE_APP_HELPDOCTOR_API_URL
  }


  // Exemplo de request
  async getStatus () {
    try {
    return await this.http.get(`${VUE_APP_HELPDOCTOR_API_URL}/status`, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    } catch (err) {
      return err
    }
  }

}