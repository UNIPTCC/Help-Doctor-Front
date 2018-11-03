import axios from 'axios'

export default class Service {
  constructor () {
    this.http = axios
  }

  getJWT () {
    return localStorage.getItem('jwt')
  }

  getUser () {
    return localStorage.getItem('user')
  }
}