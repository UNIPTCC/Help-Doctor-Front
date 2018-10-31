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
  faDizzy,
  faPencilAlt,
  faHospital,
  faHome,
  faGripVertical,
  faTimes
} from '@fortawesome/free-solid-svg-icons'
library.add([
  faDizzy,
  faPencilAlt,
  faHospital,
  faHome,
  faGripVertical,
  faTimes
])
Vue.component('font-awesome-icon', FontAwesomeIcon)
/* Font Awesome */

/* Vue Resource */
import VueResource from 'vue-resource'
Vue.use(VueResource)
/* Vue Resource */

/* Components */
import Header from './components/Header/Header'
Vue.component('header-default', Header)

import MenuMobile from './components/MenuMobile/MenuMobile'
Vue.component('menu-mobile', MenuMobile)

import MenuDestkop from './components/MenuDestkop/MenuDestkop'
Vue.component('menu-desktop', MenuDestkop)

import Footer from './components/Footer/Footer'
Vue.component('footer-default', Footer)

import ModalPasswordReset from './components/ModalPasswordReset/ModalPasswordReset'
Vue.component('modal-password-reset', ModalPasswordReset)

import CustomTable from './components/CustomTable/CustomTable'
Vue.component('custom-table', CustomTable)
/* Components */

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
