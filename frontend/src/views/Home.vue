<template>
    <div class="container">
        <div class="row">
            <div class="col-6">
                <h2 class="mt-5">Mantenimientos:</h2>
                <div class="d-flex flex-column justify-content-center mt-2">
                    <button @click="openWindow('client')" class="btn" :disabled='isDisabled13'>Clientes</button>
                    <button @click="openWindow('lending')" class="btn" :disabled='isDisabled14'>Préstamos</button>
                    <button @click="openWindow('campaign')" class="btn" :disabled='isDisabled13'>Campañas</button>
                    <button @click="openWindow('account')" class="btn" :disabled='isDisabled14'>Cuentas de Ahorro</button>
                    <button @click="openWindow('blackList')" class="btn" :disabled='isDisabled1'>Clientes especiales</button>
                    <button @click="openWindow('salesRecord')" class="btn" :disabled='isDisabled14'>Expedientes de Venta</button> 
                    <button @click="openWindow('accountStatus')" class="btn" :disabled='isDisabled1'>Estado de cuenta</button> 
                </div>
            </div>
            <div class="col-6">
                <h2 class="mt-5">Reportes:</h2>
                <div class="d-flex flex-column justify-content-center mb-3 mt-2">
                    <button  @click="openWindow('reportsA')" class="btn" :disabled='isDisabled123'>Reporte de Cuentas</button>
                    <button  @click="openWindow('reportsL')" class="btn" :disabled='isDisabled123'>Reporte de Préstamos</button>
                </div>
                <h2 class="mt-4">Configuración:</h2>
                <div class="d-flex flex-column justify-content-center">
                    <button  @click="openWindow('parConfig')" class="btn" :disabled='isDisabled1'>Configuración de Parámetros</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style src="@/styles/Home.css" scoped>

</style>

<script>
    import {mapState} from 'vuex'
    import {mapActions} from 'vuex'
    import router from '@/router.js'
    import * as userDA from '@/dataAccess/userDA.js'
    import * as utilsDA from '@/dataAccess/utilsDA.js'
    import * as adminDA from '@/dataAccess/adminDA.js'
    import Swal from 'sweetalert2'

export default {
    methods:{
        ...mapActions(['completeClients','completeLendings','setLoginEntry','completeAccounts','completeSalesRecords','completeCampaigns','completeClientsBlackList','completeBankAccount','completeTransactions','completeTransactionsSoles','completeTransactionsDollar','fillParameterSettings']),
        openWindow(window){
            switch(window){
                case 'client':
                    router.push('/crudClient');
                break;
                case 'lending':
                    router.push('/crudLending');
                break;
                case 'campaign':
                    router.push('/crudCampaign');
                break;
                case 'account':
                    router.push('/crudAccounts');
                break;
                case 'salesRecord':
                    router.push('/crudSalesRecords');
                break;
                case 'blackList':
                    router.push('/crudBlackList');
                break;
                case 'reportsA':
                    router.push('/reportsAccount');
                break;
                case 'reportsL':
                    router.push('/reportsLending');
                break;
                case 'parConfig':
                    router.push('/parametersConfiguration');
                break;
                case 'accountStatus':
                    router.push('/AccountStatus');
                break;
            }
        }
    },
    computed:{
        ...mapState(['token','person','parameterSettings','user']),
        isDisabled1(){
            if(this.user.idProfile!=1) return true;
            return false;
        },
        isDisabled13(){
            if(this.user.idProfile==1 || this.user.idProfile==3) return false;
            return true;
        },
        isDisabled14(){
            if(this.user.idProfile==1 || this.user.idProfile==4) return false;
            return true;
        },
        isDisabled123(){
            if(this.user.idProfile==1 || this.user.idProfile==2 || this.user.idProfile==3) return false;
            return true;
        }
    },
    beforeMount(){
        this.setLoginEntry(true);
        userDA.getAllClients(this.token).then((res) =>{
            this.completeClients(res.data);
        }).catch(error =>{
          Swal.fire({
            title: 'Error',
            type: 'error',
            text: 'Error obteniendo los clientes'
          })
        });
        userDA.getAllAccounts(this.token).then((res) =>{
            this.completeAccounts(res.data);
        }).catch(error =>{
            Swal.fire({
                title: 'Error',
                type: 'error',
                text: 'Error obteniendo las cuentas'
            })
        });
        userDA.getAllCampaigns(this.token).then((res) =>{
            this.completeCampaigns(res.data);
        }).catch(error =>{
            Swal.fire({
                title: 'Error',
                type: 'error',
                text: 'Error obteniendo las campañas'
            })
        });
        userDA.getAllLendings(this.token).then((res) =>{
            this.completeLendings(res.data);
        }).catch(error =>{
            Swal.fire({
                title: 'Error',
                type: 'error',
                text: 'Error obteniendo los préstamos'
              })
        });
        userDA.getAllSalesRecord(this.token).then((res) =>{
            this.completeSalesRecords(res.data);
        }).catch(error =>{
            Swal.fire({
                title: 'Error',
                type: 'error',
                text: 'Error obteniendo los expedientes de Venta'
            })
        });
        userDA.getAllClientsBlackList(this.token).then((res) =>{
            this.completeClientsBlackList(res.data);
        }).catch(error =>{
            Swal.fire({
                title: 'Error',
                type: 'error',
                text: 'Error obteniendo los clientes especiales'
            })
        });
        userDA.getAllBankAccount(this.token).then((res) =>{
            this.completeBankAccount(res.data);
        }).catch(error =>{
            Swal.fire({
                title: 'Error',
                type: 'error',
                text: 'Error obteniendo las cuentas del banco'
            })
        });
        userDA.getAllTransactions(this.token).then((res) =>{
            this.completeTransactions(res.data);
        }).catch(error =>{
            Swal.fire({
                title: 'Error',
                type: 'error',
                text: 'Error obteniendo las transacciones del banco'
            })
        });
        userDA.getAllTransactions(this.token).then((res) =>{
            this.completeTransactionsDollar(res.data);
        }).catch(error =>{
            Swal.fire({
                title: 'Error',
                type: 'error',
                text: 'Error obteniendo las transacciones en Dólares del banco'
            })
        });
        userDA.getAllTransactions(this.token).then((res) =>{
            this.completeTransactionsSoles(res.data);
        }).catch(error =>{
            Swal.fire({
                title: 'Error',
                type: 'error',
                text: 'Error obteniendo las transacciones en Soles del banco'
            })
        });
        adminDA.doRequestParameters(this.token).then((res) =>{
            let response_create = res.data;
            this.fillParameterSettings(response_create);
            console.log("PARAMETROS DE CONFIGURACION")
            console.log(this.parameterSetting);
        }).catch(error=>
        {
            Swal.fire({
            title: 'Error',
            type: 'error',
            text: 'Error en la captura de parámetros de configuración'
            })
        });
}
}
</script>