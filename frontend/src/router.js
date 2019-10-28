import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'
import Home from './views/Home.vue'
import CRUDClient from './views/CRUDClient.vue'
import CRUDLending from './views/CRUDLending.vue'
import ClientCreate from './views/ClientCreate.vue'
import ClientAccounts from './views/ClientAccounts.vue'

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
      component: Home
    },
    {
      path: '/crudClient',
      name: 'crudClient',
      component: CRUDClient
    },
    {
      path: '/crudLending',
      name: 'crudLending',
      component: CRUDLending
    },
    {
      path : '/clientCreate',
      name : 'clientCreate',
      component : ClientCreate
    },
    {
      path: '/clientAccounts/:idPerson',
      name : 'clientAccounts',
      component : ClientAccounts
    }
  ]
})
