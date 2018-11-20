import Service from './Service'
const { VUE_APP_HELPDOCTOR_API_URL } = process.env

export default class Appointments extends Service {
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
        url: `${VUE_APP_HELPDOCTOR_API_URL}/appointment${query}`,
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

  async create (appointment) {
    try {
      const { data } =  await this.http({
        method: 'POST',
        url: `${VUE_APP_HELPDOCTOR_API_URL}/appointment`,
        headers: {
          Authorization: `Bearer ${this.getJWT()}`
        },
        data: appointment
      })

      return data
    } catch (err) {
      // eslint-disable-next-line
      console.error(err)
      throw err
    }
  }

  async update (id, appointment) {
    try {
      const { data } =  await this.http({
        method: 'PUT',
        url: `${VUE_APP_HELPDOCTOR_API_URL}/appointment/${id}`,
        headers: {
          Authorization: `Bearer ${this.getJWT()}`
        },
        data: appointment
      })

      return data
    } catch (err) {
      // eslint-disable-next-line
      console.error(err)
      throw err
    }
  }

  async delete (id) {
    try {
      const { data } =  await this.http({
        method: 'DELETE',
        url: `${VUE_APP_HELPDOCTOR_API_URL}/appointment/${id}`,
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