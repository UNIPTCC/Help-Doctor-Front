import Service from './Service'
const { VUE_APP_HELPDOCTOR_API_URL } = process.env

export default class Patients extends Service {
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
        url: `${VUE_APP_HELPDOCTOR_API_URL}/patient${query}`,
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

  async create (patient) {
    try {
      const { data } =  await this.http({
        method: 'POST',
        url: `${VUE_APP_HELPDOCTOR_API_URL}/patient`,
        headers: {
          Authorization: `Bearer ${this.getJWT()}`
        },
        data: patient
      })

      return data
    } catch (err) {
      // eslint-disable-next-line
      console.error(err)
      throw err
    }
  }

  async update (id, patient) {
    try {
      const { data } =  await this.http({
        method: 'PUT',
        url: `${VUE_APP_HELPDOCTOR_API_URL}/patient/${id}`,
        headers: {
          Authorization: `Bearer ${this.getJWT()}`
        },
        data: patient
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
        url: `${VUE_APP_HELPDOCTOR_API_URL}/patient/${id}`,
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