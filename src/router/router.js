import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../pages/Home/Home'
import NotFound from '../pages/NotFound/NotFound'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'Home',
    meta: {
      title: 'HelpDoctor - Home'
    },
    component: Home
  },
  {
    path: '/',
    redirect: '/home'
  },
  { 
    path: '/404',
    name: 'NotFound',
    meta: {
      title: 'HelpDoctor - 404 Not Found'
    },
    component: NotFound
  },  
  {
    path: '*',
    redirect: '/404'
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
