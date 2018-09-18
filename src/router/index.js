import Vue from 'vue'
// import { titleVal } from '../util/util'
import store from '../store'
import Router from 'vue-router'
import Index from '@/components/Index/index'
import About from '@/components/About/About'
import Topic from '@/components/Topic/Topic'
import Login from '@/components/Login/Login'
import Publish from '@/components/Publish/Publish'
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/topic/:topicId',
      name: 'Topic',
      component: Topic
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/publish',
      name: 'Publish',
      meta: {
        requireAuth: true
      },
      component: Publish
    }
  ]
})
router.beforeEach((to, from, next) => {
  if (to.matched.some(r => r.meta.requireAuth)) {
    if (store.state.user.accessToken) {
      next()
    } else {
      next({
        path: '/login',
        query: { prePath: to.fullPath }
      })
    }
  } else {
    next()
  }
})
export default router
