import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from '../pages/HomePage/HomePage'
import NotFound from '../pages/NotFound/NotFound'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'HomePage',
    meta: {
      title: 'HelpDoctor - Home'
    },
    component: HomePage
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
