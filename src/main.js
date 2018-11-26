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
  faTimes,
  faUserMd,
  faUser,
  faCalendarAlt,
  faNotesMedical,
  faSignOutAlt,
  faPlus,
  faCircleNotch,
  faCircle,
  faSearch,
  faSave,
  faExclamation
} from '@fortawesome/free-solid-svg-icons'
library.add([
  faDizzy,
  faPencilAlt,
  faHospital,
  faHome,
  faGripVertical,
  faTimes,
  faUserMd,
  faUser,
  faCalendarAlt,
  faNotesMedical,
  faSignOutAlt,
  faPlus,
  faCircleNotch,
  faCircle,
  faSearch,
  faSave,
  faExclamation
])
Vue.component('font-awesome-icon', FontAwesomeIcon)
/* Font Awesome */

/* Vue Resource */
import VueResource from 'vue-resource'
Vue.use(VueResource)
/* Vue Resource */

/* Vue the Mask */
import VueTheMask from 'vue-the-mask'
Vue.use(VueTheMask)
/* Vue the Mask */

/* Vue Moment */
import moment from 'moment'
import 'moment/locale/pt-br'
import VueMoment from 'vue-moment'
Vue.use(VueMoment, {
  moment
})
/* Vue Moment */

/* Vue Date */
import Datetime from 'vue-datetime'
import 'vue-datetime/dist/vue-datetime.css'
Vue.use(Datetime)
/* Vue Date */

/* Vue Full Calendar */
import FullCalendar from 'vue-full-calendar'
import 'fullcalendar/dist/fullcalendar.css'
Vue.use(FullCalendar)
/* Vue Full Calendar */

/* Vue Auto Complete */
import Autocomplete from 'v-autocomplete'
import 'v-autocomplete/dist/v-autocomplete.css'
Vue.use(Autocomplete)
/* Vue Auto Complete */

/* Plugins */
import Logout from './plugins/Logout/logout'
Vue.use(Logout, {
  router
})
/* Plugins */

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

import AddressForm from './components/AddressForm/AddressForm'
Vue.component('address-form', AddressForm)

import StateSelect from './components/StateSelect/StateSelect'
Vue.component('state-select', StateSelect)

import HospitalSelect from './components/HospitalSelect/HospitalSelect'
Vue.component('hospital-select', HospitalSelect)

import RoleSelect from './components/RoleSelect/RoleSelect'
Vue.component('role-select', RoleSelect)

import TypeRecordSelect from './components/TypeRecordSelect/TypeRecordSelect'
Vue.component('type-record-select', TypeRecordSelect)

import PatientSelect from './components/PatientSelect/PatientSelect'
Vue.component('patient-select', PatientSelect)

import MedicalCategorySelect from './components/MedicalCategorySelect/MedicalCategorySelect'
Vue.component('medical-category-select', MedicalCategorySelect)

import RecordSelect from './components/RecordSelect/RecordSelect'
Vue.component('record-select', RecordSelect)

import UserSelect from './components/UserSelect/UserSelect'
Vue.component('user-select', UserSelect)
/* Components */

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
