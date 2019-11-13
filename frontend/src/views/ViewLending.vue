<template>
    <div class="container">
        <div>
            <h2 class="mb-4 mt-4">Préstamo</h2>
        </div>
        <!-- Tab links -->
        <div class="tab">
        <button id="btnClient" class="tablinks inactive" @click="openData('Client')">Datos del Cliente</button>
        <button id="btnLending" class="tablinks inactive" @click="openData('Lending')">Datos del Préstamo</button>
        </div>

        <!-- Tab content -->
        <div id="Lending" class="tabcontent">
            <div class="row mt-4">
                <div class="col-6 groupLeftPersonal">
                    <!--<h6>Nombre Cliente</h6>
                    <input v-model="lendingCreate.fullName" type="text" class="form-control" disabled>-->
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
                    <!--<h6>Nro. Documento</h6>
                    <input v-model="lendingCreate.documentNumber" type="text" class="form-control" disabled>-->
                    <h6 class="mt-3">Campaña</h6>
                    <input v-model="lendingCreate.campaignName" id="right2" type="text" class="form-control" disabled>
                    <h6 class="mt-3">Número de cuenta</h6>
                    <input v-model="lendingCreate.accountNumber" id="right2" type="text" class="form-control" disabled>
                    <h6 class="mt-3">Número de cuotas</h6>
                    <input v-model="lendingCreate.totalShares" id="right2" type="text" class="form-control" disabled>
                    <h6 class="mt-3">Cuota</h6>
                    <input v-model="lendingCreate.share" id="right2" type="text" class="form-control" disabled>
                    <h6 class="mt-3">Comisión</h6>
                    <input v-model="lendingCreate.commission" id="right2" type="text" class="form-control mb-5" disabled>
                </div>
            </div>
        </div>

        <div id="Client" class="tabcontent">
            <div class="row mt-4">
                <div class="col-6 groupLeftPersonal">
                    <h6>Primer Nombre</h6>
                    <input v-model="clientCreate.firstName" type="text" class="form-control" disabled>
                    <h6 class="mt-3">Apellido Paterno</h6>
                    <input v-model="clientCreate.fatherLastname" type="text" class="form-control" disabled>
                    <div class="mt-3">
                        <span >Fecha de Nacimiento</span>
                        <br><input v-model="clientCreate.birthdate"  type="date" style="height:2.3em; width:21em;" disabled>
                    </div>
                    <h6 class="mt-2">Nro. Documento</h6>
                    <input v-model="clientCreate.documentNumber" type="text" class="form-control" disabled>
                    <h6 class="mt-3">Correo electrónico</h6>
                    <input v-model="clientCreate.email1"  type="text" class="form-control mb-5" disabled>
                </div>
                <div class="col-6 groupRightPersonal">
                    <h6>Segundo Nombre</h6>
                    <input v-model="clientCreate.middleName" id="right1" type="text" class="form-control" disabled>
                    <h6 class="mt-3">Apellido Materno</h6>
                    <input v-model="clientCreate.motherLastname" id="right2" type="text" class="form-control" disabled>
                    <h6 class="mt-3">Nacionalidad</h6>
                    <div>
                        <input v-model="clientCreate.nationality" id="right3" type="text" class="form-control d-inline" disabled>
                        <img class="ml-3" v-bind:src="clientCreate.flag" height="30" width="auto">
                    </div>
                    <h6 class="mt-3">Dirección</h6>
                    <input v-model="clientCreate.address" type="text" class="form-control" disabled>
                    <h6 class="mt-3">Teléfono</h6>
                    <input v-model="clientCreate.cellphone1" id="right2" type="text" class="form-control mb-5" disabled>   
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
        ...mapState (['token','lendingCreate','clientCreate'])
    },
    methods:{
        ...mapActions(['completePersonCreate']),
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
        document.getElementById('Client').style.display = "block";
        document.getElementById('btnClient').classList.add('active');
        
        adminDA.getClientByID(this.lendingCreate.idClient,this.token).then((res) =>{
            this.clientCreate.documentNumber=res.data.documentNumber;
            this.clientCreate.email1=res.data.email1;
            this.clientCreate.cellphone1=res.data.cellphone1;
            this.completePersonCreate(res.data);
        }).catch(error =>{  
                Swal.fire({
                    title: 'Error',
                    type: 'error',
                    text: 'No se pudo cargar la información del cliente'
            })
        });
    },
    updated(){
        this.nameClient = this.lendingCreate.firstName + " " + this.lendingCreate.fatherLastname;
    }
}
</script>