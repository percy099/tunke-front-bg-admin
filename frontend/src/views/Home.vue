<template>
    <div class="container">
        <div class="row">
            <div class="col-6">
                <h2 class="mt-5">Mantenimientos:</h2>
                <div class="d-flex flex-column justify-content-center mt-2">
                    <button @click="openWindow('client')" class="btn">Clientes</button>
                    <button @click="openWindow('lending')" class="btn">Préstamos</button>
                    <button @click="openWindow('campaign')" class="btn">Campañas</button>
                    <button @click="openWindow('account')" class="btn">Cuentas de Ahorro</button>
                    <button class="btn">Clientes especiales</button>
                    <button class="btn">Expedientes de Venta</button> 
                </div>
            </div>
            <div class="col-6">
                <h2 class="mt-5">Reportes:</h2>
                <div class="d-flex flex-column justify-content-center mb-3 mt-2">
                    <button class="btn">Reporte de Cuentas</button>
                    <button class="btn">Reporte de Préstamos</button>
                </div>
                <h2 class="mt-4">Configuración:</h2>
                <div class="d-flex flex-column justify-content-center">
                    <button class="btn">Configuración de Parámetros</button>
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
    import Swal from 'sweetalert2'

export default {
    methods:{
        ...mapActions(['completeClients','completeLendings','setLoginEntry','completeAccounts']),
        openWindow(window){
            switch(window){
                case 'client':
                    router.push('/crudClient');
                break;
                case 'lending':
                    router.push('/crudLending');
                break;
                case 'campaign':
                    router.push('crudCampaign');
                break;
                case 'account':
                    router.push('/crudAccounts');
                break;
            }
        }
    },
    computed:{
        ...mapState(['token']),
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

        /*
        userDA.getAllAccounts(this.token).then((res) =>{
            this.completeAccounts(res.data);
        }).catch(error =>{
          Swal.fire({
            title: 'Error',
            type: 'error',
            text: 'Error obteniendo los clientes'
          })
        })
        */
    }
}
</script>