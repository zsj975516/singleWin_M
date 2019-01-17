import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login-page',
      component: ()=>import('../views/Login')
    },
    {
      path: '/home',
      name: 'home-page',
      component: ()=>import('../views/Home')
    },
    {
      path: '*',
      redirect: '/login'
    }
  ]
})
