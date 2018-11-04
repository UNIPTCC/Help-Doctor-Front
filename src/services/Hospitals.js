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
      query += `?id=${id}`
    } else if (name) {
      query += `?name=${name}`
    }

    try {
      const { data } =  await this.http({
        method: 'GET',
        url: `${VUE_APP_HELPDOCTOR_API_URL}/hospital${query}`,
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

  async create () {
    try {
      const { data } =  await this.http({
        method: 'POST',
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

  async update (id) {
    try {
      const { data } =  await this.http({
        method: 'PUT',
        url: `${VUE_APP_HELPDOCTOR_API_URL}/hospital/${id}`,
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

  async delete (id) {
    try {
      const { data } =  await this.http({
        method: 'DELETE',
        url: `${VUE_APP_HELPDOCTOR_API_URL}/hospital/${id}`,
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