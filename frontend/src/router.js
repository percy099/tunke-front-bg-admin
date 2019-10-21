import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'
import CRUD from './views/CRUD.vue'
import CRUDLending from './views/CRUDLending.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/home',
      name: 'home',
      component: () => import(/* webpackChunkName: "about"  */'./views/Home.vue')
    },
    {
      path: '/crud',
      name: 'crud',
      component: CRUD
    },
    {
      path: '/crudLending',
      name: 'crudLending',
      component: CRUDLending
    }
  ]
})
