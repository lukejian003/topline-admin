import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  routes: [{
    name: '',
    path: '/',
    component: () => import('@/views/layout'),
    children: [{
      name: 'home',
      path: '',
      component: () => import('@/views/home')
    }, {
      name: 'publish',
      path: '/publish',
      component: () => import('@/views/publish')
    }]
  },
  {
    name: 'login',
    path: '/login',
    component: () => import('@/views/login')
  }
  ]
})
