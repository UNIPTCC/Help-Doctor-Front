const User  = {
  install (Vue) {
    Vue.prototype.$user = function () {
      return JSON.parse(localStorage.getItem('user'))
    }()
  }
}

export default User 