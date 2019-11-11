import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'
import Home from './views/Home.vue'
import CRUDClient from './views/CRUDClient.vue'
import CRUDLending from './views/CRUDLending.vue'
import CRUDAccounts from './views/CRUDAccounts.vue'
import CRUDCampaign from './views/CRUDCampaign.vue'
import ClientCreate from './views/ClientCreate.vue'
import ClientAccounts from './views/ClientAccounts.vue'
import AccountCreate from './views/AccountCreate.vue'
import EditCampaign from './views/EditCampaign.vue'
import CRUDSalesRecords from './views/CRUDSalesRecords.vue'
import CRUDBlackList from './views/CRUDBlackList.vue'
import ViewSaleRecord from './views/ViewSaleRecord.vue'
import ReportsAccount from './views/ReportsAccount.vue'
import ReportsLending from './views/ReportsLending.vue'



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
      path : '/crudAccounts',
      name : 'crudAccounts',
      component : CRUDAccounts
    },
    {
      path: '/clientAccounts/:idClient',
      name : 'clientAccounts',
      component : ClientAccounts
    },
    {
      path : '/accountCreate',
      name : 'accountCreate',
      component : AccountCreate
    },
    {
      path : '/crudSalesRecords',
      name : 'crudSalesRecords',
      component : CRUDSalesRecords
    },
    {
      path : '/crudBlackList',
      name : 'crudBlackList',
      component : CRUDBlackList
    },
    {
      path : '/viewSaleRecord',
      name : 'viewSaleRecord',
      component : ViewSaleRecord
    },
    {
      path : '/crudCampaign',
      name : 'crudCampaign',
      component : CRUDCampaign
    },
    {
      path : '/editCampaign',
      name : 'editCampaign',
      component : EditCampaign
    },
    {
      path : '/reportsAccount',
      name : 'reportsAccount',
      component : ReportsAccount
    },
    {
      path : '/reportsLending',
      name : 'reportsLending',
      component : ReportsLending
    }
  ]
})
