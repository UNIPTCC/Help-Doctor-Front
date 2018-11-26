import Service from './Service'
const { VUE_APP_HELPDOCTOR_API_URL } = process.env

export default class Users extends Service {
  constructor () {
    super()
    this.base = VUE_APP_HELPDOCTOR_API_URL
  }

  async get (id, type) {
    let query = ''
    if (id) {
      query = `/${id}`
    } else if (type) {
      query = `?type=${type}`
    }

    try {
      const { data } =  await this.http({
        method: 'GET',
        url: `${VUE_APP_HELPDOCTOR_API_URL}/user${query}`,
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

  async create (user) {
    try {
      const { data } =  await this.http({
        method: 'POST',
        url: `${VUE_APP_HELPDOCTOR_API_URL}/user`,
        headers: {
          Authorization: `Bearer ${this.getJWT()}`
        },
        data: user
      })

      return data
    } catch (err) {
      // eslint-disable-next-line
      console.error(err)
      throw err
    }
  }

  async update (id, user) {
    try {
      const { data } =  await this.http({
        method: 'PUT',
        url: `${VUE_APP_HELPDOCTOR_API_URL}/user/${id}`,
        headers: {
          Authorization: `Bearer ${this.getJWT()}`
        },
        data: user
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
        url: `${VUE_APP_HELPDOCTOR_API_URL}/user/${id}`,
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