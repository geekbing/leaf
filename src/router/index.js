import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Index from '@/components/Index'
import NewLeaf from '@/components/NewLeaf'
import Leaf from '@/components/Leaf'
import LeafDetail from '@/components/LeafDetail'
import Share from '@/components/Share'
import Setting from '@/components/Setting'
import Feedback from '@/components/Feedback'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    redirect: {
      name: 'Login'
    }
  }, {
    path: '/login',
    name: 'Login',
    component: Login
  }, {
    path: '/register',
    name: 'Register',
    component: Register
  }, {
    path: '/index',
    component: Index,
    children: [{
      path: '',
      component: Leaf
    }, {
      path: '/new',
      name: 'NewLeaf',
      component: NewLeaf
    }, {
      path: '/leaf',
      name: 'Leaf',
      component: Leaf
    }, {
      path: '/leaf/:id',
      name: 'LeafDetail',
      component: LeafDetail
    }, {
      path: '/share',
      name: 'Share',
      component: Share
    }, {
      path: '/setting',
      name: 'Setting',
      component: Setting
    }, {
      path: '/feedback',
      name: 'Feedback',
      component: Feedback
    }]
  }]
})
