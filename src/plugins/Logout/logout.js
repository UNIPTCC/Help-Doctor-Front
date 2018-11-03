const Logout  = {
  install (Vue, options) {
    const { router } = options

    Vue.prototype.$logout = function () {
      localStorage.removeItem('jwt')
      localStorage.removeItem('user')
      router.push('Login')
    }
  }
}

export default Logout 