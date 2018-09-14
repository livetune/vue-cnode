import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index/index'
import About from '@/components/About/About'
import Topic from '@/components/Topic/Topic'
Vue.use(Router)

export default new Router({
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
    }
  ]
})
