<template>
    <div class="container vld-parent">
        <loading :active.sync="isLoading" 
        :can-cancel="false" 
        :is-full-page="false"></loading>
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
    import Loading from 'vue-loading-overlay';
    import 'vue-loading-overlay/dist/vue-loading.css';

export default {
    data(){
        return {
            isLoading : false
        }
    },
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
        this.isLoading = true;
        userDA.getAllClients(this.token).then((res) =>{
            this.completeClients(res.data);
            userDA.getAllAccounts(this.token).then((res2) =>{
                this.completeAccounts(res2.data);
                userDA.getAllCampaigns(this.token).then((res3) =>{
                    this.completeCampaigns(res3.data);
                    userDA.getAllLendings(this.token).then((res4) =>{
                        this.completeLendings(res4.data);
                        userDA.getAllSalesRecord(this.token).then((res5) =>{
                            this.completeSalesRecords(res5.data);
                            userDA.getAllClientsBlackList(this.token).then((res6) =>{
                                this.completeClientsBlackList(res6.data);
                                userDA.getAllBankAccount(this.token).then((res7) =>{
                                    this.completeBankAccount(res7.data);                                  
                                    userDA.getAllTransactions(this.token).then((res8) =>{
                                        this.completeTransactions(res8.data);
                                        userDA.getAllTransactions(this.token).then((res9) =>{
                                            this.completeTransactionsDollar(res9.data);
                                            userDA.getAllTransactions(this.token).then((res10) =>{
                                                this.completeTransactionsSoles(res10.data);
                                                adminDA.doRequestParameters(this.token).then((res11) =>{
                                                    this.fillParameterSettings(res11.data);
                                                    this.isLoading = false;
                                                }).catch(error=>
                                                {
                                                    this.isLoading = false;
                                                    Swal.fire({
                                                    title: 'Error',
                                                    type: 'error',
                                                    text: 'Error en la captura de parámetros de configuración'
                                                    })
                                                });
                                            }).catch(error =>{
                                                Swal.fire({
                                                    title: 'Error',
                                                    type: 'error',
                                                    text: 'Error obteniendo las transacciones en Soles del banco'
                                                })
                                            });
                                        }).catch(error =>{
                                            Swal.fire({
                                                title: 'Error',
                                                type: 'error',
                                                text: 'Error obteniendo las transacciones en Dólares del banco'
                                            })
                                        });
                                    }).catch(error =>{
                                        Swal.fire({
                                            title: 'Error',
                                            type: 'error',
                                            text: 'Error obteniendo las transacciones del banco'
                                        })
                                    });
                                    
                                }).catch(error =>{
                                    Swal.fire({
                                        title: 'Error',
                                        type: 'error',
                                        text: 'Error obteniendo las cuentas del banco'
                                    })
                                });
                            }).catch(error =>{
                                Swal.fire({
                                    title: 'Error',
                                    type: 'error',
                                    text: 'Error obteniendo los clientes especiales'
                                })
                            });
                        }).catch(error =>{
                            Swal.fire({
                                title: 'Error',
                                type: 'error',
                                text: 'Error obteniendo los expedientes de Venta'
                            })
                        });
                    }).catch(error =>{
                        Swal.fire({
                            title: 'Error',
                            type: 'error',
                            text: 'Error obteniendo los préstamos'
                        })
                    });
                }).catch(error =>{
                    Swal.fire({
                        title: 'Error',
                        type: 'error',
                        text: 'Error obteniendo las campañas'
                    })
                });
            }).catch(error =>{
                Swal.fire({
                    title: 'Error',
                    type: 'error',
                    text: 'Error obteniendo las cuentas'
                })
            });
        }).catch(error =>{
          Swal.fire({
            title: 'Error',
            type: 'error',
            text: 'Error obteniendo los clientes'
          })
        });
    },
    components:{
        Loading
    }
}
</script>