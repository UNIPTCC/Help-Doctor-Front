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
import Queue from '../pages/Queue/Queue';

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
      title: 'HelpDoctor - Prontuários'
    }
  },
  {
    path: '/prontuario/novo',
    name: 'RecordNew',
    component: RecordEdit,
    meta: {
      title: 'HelpDoctor - Novo Prontuário',
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
      title: 'HelpDoctor - Pacientes'
    }
  },
  {
    path: '/paciente/novo',
    name: 'PatientNew',
    component: PatientEdit,
    meta: {
      title: 'HelpDoctor - Novo Paciente'
    }
  },
  {
    path: '/paciente/:id',
    name: 'PatientEdit',
    component: PatientEdit,
    meta: {
      title: 'HelpDoctor - Editar Paciente'
    }
  },
  {
    path: '/atendimento',
    name: 'Queue',
    component: Queue,
    meta: {
      title: 'HelpDoctor - Fila de atendimento',
      admin: true,
      manager: true,
      doctor: true,
      nurse:true
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
  mode: 'history',
  routes
})

const verifyRole = function (record, roleName) {
  return (!record.meta.admin) ? true : record.meta.hasOwnProperty(roleName.toLowerCase()) 
}

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  document.querySelector('#app').classList.remove('no-scroll')
  const jwt = localStorage.getItem('jwt')
  let user = JSON.parse(localStorage.getItem('user'))
  if (user) {
    // Código comentado para testes de rota forçando autenticações e usuários chumbados, comentar a linha de baixo e descomentar a de cima para testar
    // user.roleName = 'recepicionist'
    user.roleName = user.roles[0].name
    localStorage.setItem('user', JSON.stringify(user))
  }

  if (to.matched.some(record => !record.meta.guest)) {
    if (!jwt || !user) {
      next({
        name: 'Login',
        params: { nextUrl: to.fullPath }
      })
    } else {
      if (to.matched.some(record => verifyRole(record, user.roleName))) {
        next()
      } else {
        next({
          name: 'Home'
        })
      }
    }
  } else {
    next() 
  }
})

export default router
