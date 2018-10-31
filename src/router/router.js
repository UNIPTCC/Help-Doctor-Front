import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../pages/Home/Home'
import Login from '../pages/Login/Login'
import NotFound from '../pages/NotFound/NotFound'
import HospitalList from '../pages/Hospital/List/HospitalList'
import HospitalEdit from '../pages/Hospital/Edit/HospitalEdit'
import UserList from '../pages/User/List/UserList'
import UserEdit from '../pages/User/Edit/UserEdit'
import PatientList from '../pages/Patient/List/PatientList'
import PatientEdit from '../pages/Patient/Edit/PatientEdit'
import RecordList from '../pages/Record/List/RecordList'
import RecordEdit from '../pages/Record/Edit/RecordEdit'
import AppointmentList from '../pages/Appointment/List/AppointmentList'
import AppointmentEdit from '../pages/Appointment/Edit/AppointmentEdit'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '*',
    redirect: '/404'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title: 'HelpDoctor - Login',
      guest: true
    }
  },
  { 
    path: '/404',
    name: 'NotFound',
    component: NotFound,
    meta: {
      title: 'HelpDoctor - 404 Not Found',
      guest: true
    }
  },
  {
    path: '/hospital',
    name: 'Hospital - Lista',
    component: HospitalList,
    meta: {
      title: 'HelpDoctor - Hospitais'
    }
  },
  {
    path: '/hospital/:id',
    name: 'Hospital - Editar',
    component: HospitalEdit,
    meta: {
      title: 'HelpDoctor - Editar Hospital'
    }
  },
    {
    path: '/user',
    name: 'Usuário - Lista',
    component: UserList,
    meta: {
      title: 'HelpDoctor - Usuários'
    }
  },
  {
    path: '/user/:id',
    name: 'Usuário - Editar',
    component: UserEdit,
    meta: {
      title: 'HelpDoctor - Editar Usuário'
    }
  },
  {
    path: '/agenda',
    name: 'Agenda - Lista',
    component: AppointmentList,
    meta: {
      title: 'HelpDoctor - Agendas'
    }
  },
  {
    path: '/agenda/:id',
    name: 'Agenda - Editar',
    component: AppointmentEdit,
    meta: {
      title: 'HelpDoctor - Editar Agenda'
    }
  },
    {
    path: '/prontuario',
    name: 'Prontuário - Lista',
    component: RecordList,
    meta: {
      title: 'HelpDoctor - Prontuários'
    }
  },
  {
    path: '/prontuario/:id',
    name: 'Prontuário - Editar',
    component: RecordEdit,
    meta: {
      title: 'HelpDoctor - Editar Prontuário'
    }
  },
    {
    path: '/paciente',
    name: 'Paciente - Lista',
    component: PatientList,
    meta: {
      title: 'HelpDoctor - Pacientes'
    }
  },
  {
    path: '/paciente/:id',
    name: 'Paciente - Editar',
    component: PatientEdit,
    meta: {
      title: 'HelpDoctor - Editar Paciente'
    }
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: {
      title: 'HelpDoctor - Home'
    }
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
})

export default router
