import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
 
/* Bootstrap */
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue)
/* Bootstrap */

/* Font Awesome */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { 
  faDizzy
} from '@fortawesome/free-solid-svg-icons'
library.add([
  faDizzy
])
Vue.component('font-awesome-icon', FontAwesomeIcon)
/* Font Awesome */

/* Vue Resource */
import VueResource from 'vue-resource'
Vue.use(VueResource)
/* Vue Resource */

/* Components */
// Para adicionar componentes globalmente siga o código comentado abaixo
// import SearchForm from './components/SearchForm/SearchForm'
// Vue.component('search-form', SearchForm)
/* Components */

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
