<template>
    <div class="container">
        <div>
            <h2 class="mb-4 mt-4">Expediente de Venta</h2>
        </div>
        <!-- Tab links -->
        <div class="tab">
        <button id="btnSalesRecord" class="tablinks inactive" @click="openData('SalesRecord')">Datos del Expediente</button>
        <button id="btnClient" class="tablinks inactive" @click="openData('Client')">Datos del Cliente</button>
        <button id="btnProduct" class="tablinks inactive" @click="openData('Product')">Producto: {{this.salesRecordCreate.productName}}</button>
        </div>

        <!-- Tab content -->
        <div id="SalesRecord" class="tabcontent">
            <div class="row mt-4">
                <div class="col-6 groupLeftPersonal">
                    <h6>Nombre Producto</h6>
                    <input v-model="salesRecordCreate.productName" type="text" class="form-control" disabled>
                    <h6 class="mt-3">Estado</h6>
                    <input v-model="salesRecordCreate.activeSalesRecord" type="text" class="form-control" disabled>
                    <h6 class="mt-3">Origen</h6>
                    <input v-model="salesRecordCreate.origin" type="text" class="form-control mb-5" disabled>
                </div>
                <div class="col-6 groupRightPersonal">
                    <h6>Nombre Cliente</h6>
                    <input v-model="salesRecordCreate.completeName" type="text" class="form-control" disabled>
                    <h6 class="mt-3">Nro. Documento</h6>
                    <input v-model="salesRecordCreate.documentNumber" type="text" class="form-control" disabled>
                    <h6 class="mt-3">Fecha Expediente</h6>
                    <input v-model="salesRecordCreate.requestDate" type="text" class="form-control mb-5" disabled>
                </div>
            </div>
        </div>

        <div id="Client" class="tabcontent">
            <div class="row mt-4">
                <div class="col-6 groupLeftPersonal">
                    <h6>Primer Nombre</h6>
                    <input v-model="salesRecordCreate.firstName" type="text" class="form-control" disabled>
                    <h6 class="mt-3">Apellido Paterno</h6>
                    <input v-model="salesRecordCreate.fatherLastname" type="text" class="form-control" disabled>
                    <div class="mt-3">
                        <span>Fecha de Nacimiento</span><input v-model="salesRecordCreate.birthdate" class="ml-3" type="date" disabled>
                    </div>
                    <h6 class="mt-3">Dirección</h6>
                    <input v-model="salesRecordCreate.address" type="text" class="form-control mb-3" disabled>
                </div>
                <div class="col-6 groupRightPersonal">
                    <h6>Segundo Nombre</h6>
                    <input v-model="salesRecordCreate.middleName" id="right1" type="text" class="form-control" disabled>
                    <h6 class="mt-3">Apellido Materno</h6>
                    <input v-model="salesRecordCreate.motherLastname" id="right2" type="text" class="form-control" disabled>
                    <h6 class="mt-3">Nacionalidad</h6>
                    <div>
                        <input v-model="salesRecordCreate.nationality" id="right3" type="text" class="form-control d-inline" disabled>
                        <img class="ml-3" v-bind:src="salesRecordCreate.flag" height="30" width="auto">
                    </div>
                </div>
            </div>
        </div>

        <div id="Product" class="tabcontent">
            <div class="row mt-4">
                <div v-if="salesRecordCreate.productName == 'Cuenta'" class="col-6 groupLeftPersonal">
                    <h6>{{this.salesRecordCreate.productName}} activa</h6>
                    <input v-model="salesRecordCreate.activeAccount" type="text" class="form-control" disabled>
                    <h6 class="mt-3">Balance</h6>
                    <input v-model="salesRecordCreate.balance" type="text" class="form-control mb-5" disabled>
                </div>
                <div v-if="salesRecordCreate.productName == 'Cuenta'" class="col-6 groupRigthPersonal">
                    <h6>Fecha Apertura</h6>
                    <input v-model="salesRecordCreate.openingDate" type="text" class="form-control" disabled>
                    <h6 class="mt-3">Fecha Fin</h6>
                    <input v-model="salesRecordCreate.closingDate" type="text" class="form-control mb-5" disabled>
                </div>
                <div v-if="salesRecordCreate.productName == 'Prestamo'" class="col-6 groupLeftPersonal">
                    <h6>{{this.salesRecordCreate.productName}} activa</h6>
                    <input v-model="salesRecordCreate.activeLoan" type="text" class="form-control" disabled>
                    <h6 class="mt-3">Cantidad de cuotas</h6>
                    <input v-model="salesRecordCreate.totalShares" type="text" class="form-control mb-5" disabled>
                </div>
                <div v-if="salesRecordCreate.productName == 'Prestamo'" class="col-6 groupRigthPersonal">
                    <h6>Porcentaje de interés</h6>
                    <input v-model="salesRecordCreate.interestRate" type="text" class="form-control" disabled>
                    <h6 class="mt-3">Tipo de Cuota</h6>
                    <input v-model="salesRecordCreate.shareType" type="text" class="form-control mb-5" disabled>
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
        ...mapState (['token','salesRecordCreate']),
        isDisabled: function(){
    	    return !this.enableButton;
        }
    },
    methods:{
         openData :function(dataType) {
            // Declare all variables
            var i, tabcontent, tablinks, btn,buttons;
            switch(dataType){
                case 'SalesRecord':
                    btn = 'btnSalesRecord';
                break ;

                case 'Client':
                    btn = 'btnClient';
                break;

                case 'Product':
                    btn = 'btnProduct';
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
        document.getElementById('SalesRecord').style.display = "block";
        document.getElementById('btnSalesRecord').classList.add('active');
    },
    updated(){
        this.nameClient = this.salesRecordCreate.firstName + " " + this.salesRecordCreate.fatherLastname;
    }
}
</script>