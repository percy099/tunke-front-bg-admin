import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'
import Home from './views/Home.vue'
import CRUDClient from './views/CRUDClient.vue'
import CRUDLending from './views/CRUDLending.vue'
import ViewLending from './views/ViewLending.vue'
import CreateLending from './views/CreateLending.vue'
import CRUDAccounts from './views/CRUDAccounts.vue'
import CRUDCampaign from './views/CRUDCampaign.vue'
import ClientCreate from './views/ClientCreate.vue'
import ClientAccounts from './views/ClientAccounts.vue'
import AccountCreate from './views/AccountCreate.vue'
import CampaignCreate from './views/CampaignCreate.vue'
import CRUDSalesRecords from './views/CRUDSalesRecords.vue'
import CRUDBlackList from './views/CRUDBlackList.vue'
import ViewSaleRecord from './views/ViewSaleRecord.vue'
import ReportsAccount from './views/ReportsAccount.vue'
import ReportsLending from './views/ReportsLending.vue'
import BlackListOptions from './views/BlackListOptions.vue'
import BlackListCreate from './views/BlackListCreate.vue'
import MassiveCharge from './views/MassiveCharge.vue'
import CampaignOptions from './views/CampaignOptions.vue'
import MassiveChargeCampaign from './views/MassiveChargeCampaign.vue'
import ParametersConfiguration from './views/ParametersConfiguration.vue'
import CRUDAccountStatus from './views/CRUDAccountStatus.vue'
import ViewDetailSoles from './views/ViewDetailSoles.vue'
import ViewDetailDollar from './views/ViewDetailDollar.vue'
import leadCreate from './views/leadCreate.vue'
import viewLeads from './views/viewLeads.vue'
import MassiveChargeLeads from './views/MassiveChargeLeads.vue'
import leadOptions from './views/leadOptions.vue'

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
      path: '/viewLending',
      name: 'viewLending',
      component: ViewLending
    },
    {
      path : '/createLending',
      name : 'createLending',
      component : CreateLending
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
      path : '/campaignCreate',
      name : 'campaignCreate',
      component : CampaignCreate
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
    },
    {
      path : '/blackListOptions',
      name : 'blackListOptions',
      component : BlackListOptions
    },
    {
      path : '/massiveCharge',
      name : 'massiveCharge',
      component : MassiveCharge
    },
    {
      path : '/campaignOptions',
      name : 'campaignOptions',
      component : CampaignOptions
    },
    {
      path : '/massiveChargeCampaign',
      name : 'massiveChargeCampaign',
      component : MassiveChargeCampaign
    },
    {
      path: '/blackListCreate',
      name : 'blackListCreate',
      component : BlackListCreate
    },
    {
      path : '/parametersConfiguration',
      name : 'parametersConfiguration',
      component : ParametersConfiguration
    },
    {
      path : '/AccountStatus',
      name : 'accountStatus',
      component : CRUDAccountStatus
    },
    {
      path : '/ViewDetailSoles',
      name : 'viewDetailSoles',
      component : ViewDetailSoles
    },
    {
      path : '/ViewDetailDollar',
      name : 'viewDetailDollar',
      component : ViewDetailDollar
    },
    {
      path : '/leadCreate',
      name : 'leadCreate',
      component : leadCreate
    },
    {
      path : '/viewLeads',
      name : 'viewLeads',
      component : viewLeads
    },
    {
      path : '/massiveChargeLeads',
      name : 'massiveChargeLeads',
      component : MassiveChargeLeads
    },
    {
      path : '/leadOptions',
      name : 'leadOptions',
      component : leadOptions
    }
  ]
})
