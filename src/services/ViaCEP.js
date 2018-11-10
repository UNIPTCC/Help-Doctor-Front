import Service from './Service'

export default class ViaCEP extends Service {
  constructor () {
    super()
    this.base = 'https://viacep.com.br/ws/'
  }
  
  async get (zipcode) {
    try {
      const { data } =  await this.http({
        method: 'GET',
        url: `${this.base}/${zipcode}/json`
      })
      return data
    } catch (err) {
      // eslint-disable-next-line
      console.error(err)
      throw err
    }
  }
}