import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Validate from '@/components/Validate'
import poster from '@/components/poster'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/validate',
      name: 'Validate',
      component: Validate
    },
    {
      path: '/poster',
      name: 'poster',
      component: poster
    }
  ]
})
