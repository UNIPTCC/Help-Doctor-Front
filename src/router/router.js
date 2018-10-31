import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../pages/Home/Home'
import Login from '../pages/Login/Login'
import NotFound from '../pages/NotFound/NotFound'
import HospitalList from '../pages/Hospital/List/HospitalList'
import HospitalEdit from '../pages/Hospital/Edit/HospitalEdit'

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
