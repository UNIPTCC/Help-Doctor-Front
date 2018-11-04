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
    name: 'HospitalList',
    component: HospitalList,
    meta: {
      title: 'HelpDoctor - Hospitais',
      admin: true
    }
  },
  {
    path: '/hospital/novo',
    name: 'HospitalNew',
    component: HospitalEdit,
    meta: {
      title: 'HelpDoctor - Novo Hospital',
      admin: true
    }
  },
  {
    path: '/hospital/:id',
    name: 'HospitalEdit',
    component: HospitalEdit,
    meta: {
      title: 'HelpDoctor - Editar Hospital',
      admin: true
    }
  },
    {
    path: '/usuario',
    name: 'UserList',
    component: UserList,
    meta: {
      title: 'HelpDoctor - Usuários',
      admin: true,
      manager: true
    }
  },
  {
    path: '/usuario/novo',
    name: 'UserNew',
    component: UserEdit,
    meta: {
      title: 'HelpDoctor - Novo Usuário',
      admin: true,
      manager: true
    }
  },
  {
    path: '/usuario/:id',
    name: 'UserEdit',
    component: UserEdit,
    meta: {
      title: 'HelpDoctor - Editar Usuário',
      admin: true,
      manager: true
    }
  },
  {
    path: '/agenda',
    name: 'AppointmentList',
    component: AppointmentList,
    meta: {
      title: 'HelpDoctor - Agendas',
      admin: true,
      manager: true,
      doctor: true
    }
  },
  {
    path: '/agenda/novo',
    name: 'AppointmentNew',
    component: AppointmentEdit,
    meta: {
      title: 'HelpDoctor - Nova Agenda',
      admin: true,
      manager: true,
      doctor: true
    }
  },
  {
    path: '/agenda/:id',
    name: 'AppointmentEdit',
    component: AppointmentEdit,
    meta: {
      title: 'HelpDoctor - Editar Agenda',
      admin: true,
      manager: true,
      doctor: true
    }
  },
    {
    path: '/prontuario',
    name: 'RecordList',
    component: RecordList,
    meta: {
      title: 'HelpDoctor - Prontuários',
      admin: true,
      manager: true,
      doctor: true,
      nurse:true,
      clerk: true
    }
  },
  {
    path: '/prontuario/novo',
    name: 'RecordNew',
    component: RecordEdit,
    meta: {
      title: 'HelpDoctor - Novo Prontuário',
      admin: true,
      manager: true,
      doctor: true,
      nurse:true,
      clerk: true
    }
  },
  {
    path: '/prontuario/:id',
    name: 'RecordEdit',
    component: RecordEdit,
    meta: {
      title: 'HelpDoctor - Editar Prontuário',
      admin: true,
      manager: true,
      doctor: true,
      nurse:true
    }
  },
    {
    path: '/paciente',
    name: 'PatientList',
    component: PatientList,
    meta: {
      title: 'HelpDoctor - Pacientes',
      admin: true,
      manager: true,
      doctor: true,
      nurse:true,
      clerk: true
    }
  },
  {
    path: '/paciente/novo',
    name: 'PatientNew',
    component: PatientEdit,
    meta: {
      title: 'HelpDoctor - Novo Paciente',
      admin: true,
      manager: true,
      doctor: true,
      nurse:true,
      clerk: true
    }
  },
  {
    path: '/paciente/:id',
    name: 'PatientEdit',
    component: PatientEdit,
    meta: {
      title: 'HelpDoctor - Editar Paciente',
      admin: true,
      manager: true,
      doctor: true,
      nurse:true,
      clerk: true
    }
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: {
      title: 'HelpDoctor - Home',
      admin: true,
      manager: true,
      doctor: true,
      nurse:true,
      clerk: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

 // eslint-disable-next-line
const verifyRole = function (record, roleName) {
  return record.meta.hasOwnProperty(roleName)
}

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  const jwt = localStorage.getItem('jwt')
  const user = JSON.parse(localStorage.getItem('user'))
  // Código comentado para testes de rota forçando autenticações e usuários chumbados
  // let user = {
  //   role: 'clerk'
  // }
  // const jwt = `a`
  if (to.matched.some(record => !record.meta.guest)) {
    if (!jwt || !user) {
      next({
        name: 'Login',
        params: { nextUrl: to.fullPath }
      })
    } else {
      // TODO comentários sobre a lógica de roles no sistema, normalizar com o Guilherme
      // if (to.matched.some(record => verifyRole(record, user.role))) {
        next()
      // } else {
      //   next({
      //     name: 'Home'
      //   })
      // }
    }
  } else {
    next() 
  }
})

export default router
