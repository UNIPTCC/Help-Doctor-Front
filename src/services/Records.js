import Service from './Service'
const { VUE_APP_HELPDOCTOR_API_URL } = process.env

export default class Records extends Service {
  constructor () {
    super()
    this.base = VUE_APP_HELPDOCTOR_API_URL
  }

  async get (id, hospital, patient) {
    let query = ''
    if (id) {
      query = `/${id}`
    } else if (hospital && patient) {
      query = `/patient/${patient}/hospital/${hospital}`
    } else if (hospital) {
      query = `/hospital/${hospital}`
    } else if (patient) {
      query = `/patient/${patient}`
    }

    try {
      const { data } =  await this.http({
        method: 'GET',
        url: `${VUE_APP_HELPDOCTOR_API_URL}/medical-records${query}`,
        headers: {
          Authorization: `Bearer ${this.getJWT()}`
        }
      })

      return data.data
    } catch (err) {
      // eslint-disable-next-line
      console.error(err)
      throw err
    }
  }

  async create (record) {
    try {
      const { data } =  await this.http({
        method: 'POST',
        url: `${VUE_APP_HELPDOCTOR_API_URL}/medical-records`,
        headers: {
          Authorization: `Bearer ${this.getJWT()}`
        },
        data: record
      })

      return data
    } catch (err) {
      // eslint-disable-next-line
      console.error(err)
      throw err
    }
  }

  async update (id, record) {
    try {
      const { data } =  await this.http({
        method: 'PUT',
        url: `${VUE_APP_HELPDOCTOR_API_URL}/medical-records/${id}`,
        headers: {
          Authorization: `Bearer ${this.getJWT()}`
        },
        data: record
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
        url: `${VUE_APP_HELPDOCTOR_API_URL}/medical-records/${id}`,
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