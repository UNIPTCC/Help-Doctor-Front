import Service from './Service'
const { VUE_APP_HELPDOCTOR_API_URL } = process.env

export default class Hospitals extends Service {
  constructor () {
    super()
    this.base = VUE_APP_HELPDOCTOR_API_URL
  }

  async get (id, name) {
    let query = ''
    if (id) {
      query = `/${id}`
    } else if (name) {
      query = `?name=${name}`
    }

    try {
      const { data } =  await this.http({
        method: 'GET',
        url: `${VUE_APP_HELPDOCTOR_API_URL}/hospital${query}`,
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

  async create (hospital) {
    try {
      const { data } =  await this.http({
        method: 'POST',
        url: `${VUE_APP_HELPDOCTOR_API_URL}/hospital`,
        headers: {
          Authorization: `Bearer ${this.getJWT()}`
        },
        data: {
          name: hospital.name,
          address: hospital.addressHospital
        }
      })

      return data
    } catch (err) {
      // eslint-disable-next-line
      console.error(err)
      throw err
    }
  }

  async update (id, hospital) {
    try {
      const { data } =  await this.http({
        method: 'PUT',
        url: `${VUE_APP_HELPDOCTOR_API_URL}/hospital/${id}`,
        headers: {
          Authorization: `Bearer ${this.getJWT()}`
        },
        data: {
          name: hospital.name,
          address: hospital.addressHospital
        }
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
        url: `${VUE_APP_HELPDOCTOR_API_URL}/hospital/${id}`,
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