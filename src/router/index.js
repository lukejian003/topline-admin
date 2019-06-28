import Vue from 'vue'
import Router from 'vue-router'
import nprogress from 'nprogress'
Vue.use(Router)

const router = new Router({
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
    }, {
      name: 'article-list',
      path: '/article',
      component: () => import('@/views/article')
    }]
  },
  {
    name: 'login',
    path: '/login',
    component: () => import('@/views/login')
  }
  ]
})

router.beforeEach((to, from, next) => {
  nprogress.start()
  const userInfo = window.localStorage.getItem('user_info')

  if (to.path !== '/login') {
    if (!userInfo) {
      return next({ name: 'login' })
    } else {
      next()
    }
  } else {
    if (userInfo) {
      next(false)
    } else {
      next()
    }
  }
})

router.afterEach((to, form) => {
  nprogress.done()
})

export default router
