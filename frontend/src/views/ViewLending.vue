<template>
    <div class="container">
        <div>
            <h2 class="mb-4 mt-4">Préstamo</h2>
        </div>
        <!-- Tab links -->
        <div class="tab">
        <button id="btnLending" class="tablinks inactive" @click="openData('Lending')">Datos del Préstamo</button>
        <button id="btnClient" class="tablinks inactive" @click="openData('Client')">Datos del Cliente</button>
        </div>

        <!-- Tab content -->
        <div id="Lending" class="tabcontent">
            <div class="row mt-4">
                <div class="col-6 groupLeftPersonal">
                    <h6>Nombre Cliente</h6>
                    <input v-model="lendingCreate.fullName" type="text" class="form-control" disabled>
                    <h6 class="mt-3">Fecha Préstamo</h6>
                    <input v-model="lendingCreate.requestDate" type="text" class="form-control" disabled>
                    <h6 class="mt-3">Tipo de moneda</h6>
                    <input v-model="lendingCreate.currency" type="text" class="form-control" disabled> 
                    <h6 class="mt-3">Monto Total</h6>
                    <input v-model="lendingCreate.amount" type="text" class="form-control" disabled>
                    <h6 class="mt-3">Tipo de Cuota</h6>
                    <input v-if = "lendingCreate.idShareType==1" placeholder="Ordinario" type="text" class="form-control" disabled>
                     <input v-if = "lendingCreate.idShareType==2"  placeholder="Extraordinario"  type="text" class="form-control" disabled>
                    <h6 class="mt-3">Tasa de interés</h6>
                    <input v-model="lendingCreate.interestRate" type="text" class="form-control mb-5" disabled>
                </div>
                <div class="col-6 groupRightPersonal">
                    <h6>Nro. Documento</h6>
                    <input v-model="lendingCreate.documentNumber" type="text" class="form-control" disabled>
                    <h6 class="mt-3">Campaña</h6>
                    <input v-model="lendingCreate.campaignName" type="text" class="form-control" disabled>
                    <h6 class="mt-3">Número de cuenta</h6>
                    <input v-model="lendingCreate.accountNumber" type="text" class="form-control" disabled>
                    <h6 class="mt-3">Número de cuotas</h6>
                    <input v-model="lendingCreate.totalShares" type="text" class="form-control" disabled>
                    <h6 class="mt-3">Cuota</h6>
                    <input v-model="lendingCreate.share" type="text" class="form-control" disabled>
                    <h6 class="mt-3">Comisión</h6>
                    <input v-model="lendingCreate.commission" type="text" class="form-control mb-5" disabled>
                </div>
            </div>
        </div>

        <div id="Client" class="tabcontent">
            <div class="row mt-4">
                <div class="col-6 groupLeftPersonal">
                    <h6>Nombre Cliente</h6>
                    <input v-model="lendingCreate.fullName" type="text" class="form-control" disabled>
                    <h6 class="mt-3">Número de cuenta</h6>
                    <input v-model="lendingCreate.accountNumber" type="text" class="form-control mb-5" disabled>
                </div>
                <div class="col-6 groupRightPersonal">
                    <h6>Nro. Documento</h6>
                    <input v-model="lendingCreate.documentNumber" type="text" class="form-control" disabled>
                    <h6 class="mt-3">Tipo de moneda</h6>
                    <input v-model="lendingCreate.currency" id="right2" type="text" class="form-control mb-5" disabled>
                </div>
            </div>
        </div>
        <div class="d-flex justify-content-center mt-3">
            <button class="btn mr-3" @click=$router.go(-1)>Volver</button>
        </div>
    </div>
</template>

<style src="@/styles/ViewSalesRecord.css" scoped>

</style>

<script>
import { mapState, mapActions } from 'vuex';
import * as userDA from '@/dataAccess/userDA.js'
import * as adminDA from '@/dataAccess/adminDA.js'
import Swal from 'sweetalert2'
import ClientAccounts from "@/views/ClientAccounts.vue"

export default {
    components:{
        ClientAccounts
    },
    data(){
        return {
            enableButton : false,
            nameClient : ''
        };
    },
    computed :{
        ...mapState (['token','lendingCreate'])
    },
    methods:{
         openData :function(dataType) {
            // Declare all variables
            var i, tabcontent, tablinks, btn,buttons;
            switch(dataType){
                case 'Lending':
                    btn = 'btnLending';
                break ;

                case 'Client':
                    btn = 'btnClient';
                break;
            }
            // Get all elements with class="tabcontent" and hide them
            tabcontent = document.getElementsByClassName("tabcontent");
            for (i = 0; i < tabcontent.length; i++) {
                tabcontent[i].style.display = "none";
            }

            // Get all elements with class="tablinks" and remove the class "active"
            tablinks = document.getElementsByClassName("tablinks");
            for (i = 0; i < tablinks.length; i++) {
                tablinks[i].className = tablinks[i].className.replace(" active", "");
            }

            // Show the current tab, and add an "active" class to the button that opened the tab
            document.getElementById(dataType).style.display = "block";
            document.getElementById(btn).classList.add('active');
        },
    },
    mounted(){
        document.getElementById('Lending').style.display = "block";
        document.getElementById('btnLending').classList.add('active');
    },
    updated(){
        this.nameClient = this.lendingCreate.firstName + " " + this.lendingCreate.fatherLastname;
    }
}
</script>