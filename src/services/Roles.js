import Service from './Service'
const { VUE_APP_HELPDOCTOR_API_URL } = process.env

export default class Roles extends Service {
  constructor () {
    super()
    this.base = VUE_APP_HELPDOCTOR_API_URL
  }

  async get (id) {
    let query = ''
    if (id) {
      query = `/${id}`
    }
    try {
      const { data } =  await this.http({
        method: 'GET',
        url: `${VUE_APP_HELPDOCTOR_API_URL}/role${query}`,
        headers: {
          Authorization: `Bearer ${this.getJWT()}`
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