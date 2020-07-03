import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/views/login/index'

import Whiteboard from '@/views/whiteboard/index'
// import Test1 from '@/pages/login/test1'
// import Test2 from '@/pages/login/test2'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '',
      redirect: '/login'
    },
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/whiteboard',
      name: 'whiteboard',
      component: Whiteboard
    }
  ]
})
