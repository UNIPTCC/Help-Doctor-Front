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
      title: 'HelpDoctor - Hospitais',
      admin: true
    }
  },
  {
    path: '/hospital/new',
    name: 'Hospital - Novo',
    component: HospitalEdit,
    meta: {
      title: 'HelpDoctor - Novo Hospital',
      admin: true
    }
  },
  {
    path: '/hospital/:id',
    name: 'Hospital - Editar',
    component: HospitalEdit,
    meta: {
      title: 'HelpDoctor - Editar Hospital',
      admin: true
    }
  },
    {
    path: '/user',
    name: 'Usuário - Lista',
    component: UserList,
    meta: {
      title: 'HelpDoctor - Usuários',
      admin: true,
      manager: true
    }
  },
  {
    path: '/user/new',
    name: 'Usuário - Novo',
    component: UserEdit,
    meta: {
      title: 'HelpDoctor - Novo Usuário',
      admin: true,
      manager: true
    }
  },
  {
    path: '/user/:id',
    name: 'Usuário - Editar',
    component: UserEdit,
    meta: {
      title: 'HelpDoctor - Editar Usuário',
      admin: true,
      manager: true
    }
  },
  {
    path: '/agenda',
    name: 'Agenda - Lista',
    component: AppointmentList,
    meta: {
      title: 'HelpDoctor - Agendas',
      admin: true,
      manager: true,
      doctor: true
    }
  },
  {
    path: '/agenda/new',
    name: 'Agenda - Novo',
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
    name: 'Agenda - Editar',
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
    name: 'Prontuário - Lista',
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
    path: '/prontuario/new',
    name: 'Prontuário - Novo',
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
    name: 'Prontuário - Editar',
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
    name: 'Paciente - Lista',
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
    path: '/paciente/new',
    name: 'Paciente - Novo',
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
    name: 'Paciente - Editar',
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
  routes
})

const verifyRole = function (record, roleName) {
  return record.meta.hasOwnProperty(roleName)
}

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  const jwt = localStorage.getItem('jwt')
  const user = JSON.parse(localStorage.getItem('user'))
  // let user = {
  //   role: 'clerk'
  // }
  // const jwt = `a`
  if (to.matched.some(record => !record.meta.guest)) {
    if (!jwt || !user) {
        next({
            path: '/login',
            params: { nextUrl: to.fullPath }
        })
    } else {
        if (to.matched.some(record => verifyRole(record, user.role))) {
          next()
        } else {
          next({
            path: '/home'
          })
        }
    }
  } else {
      next() 
  }
})

export default router
