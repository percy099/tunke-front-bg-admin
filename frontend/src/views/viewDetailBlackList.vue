<template>
    <div class="container">
        <div>
            <h2 class="mb-4 mt-4">Clientes Especiales</h2>
        </div>
        <!-- Tab links -->
        <div class="tab">
        <button id="btnClient" class="tablinks inactive" @click="openData('Client')">Datos del Cliente</button>
        <button id="btnPersonal" class="tablinks inactive" @click="openData('Personal')">Datos Personales</button>
        </div>

        <!-- Tab content -->
        <div id="Client" class="tabcontent">
            <div class="row mt-4">
                <div class="col-6 groupLeftPersonal">
                    <h6>Primer Nombre</h6>
                    <input v-model="blackListCreate.firstName" type="text" class="form-control" disabled>
                    <h6 class="mt-3">Apellido Paterno</h6>
                    <input v-model="blackListCreate.fatherLastname" type="text" class="form-control" disabled>
                    <h6 class="mt-3">Tipo de documento</h6>
                    <input v-model="blackListCreate.documentType" type="text" class="form-control" disabled>
                    <div class="mt-3">
                        <span  class="extraSpan">Fecha de Nacimiento</span>
                        <input style="width:21em;" v-model="blackListCreate.birthdate" class="mb-3" type="date" disabled>
                    </div>
                    
                </div>
                <div class="col-6 groupRightPersonal">
                    <h6>Segundo Nombre</h6>
                    <input v-model="blackListCreate.middleName" id="right1" type="text" class="form-control" disabled>
                    <h6 class="mt-3">Apellido Materno</h6>
                    <input v-model="blackListCreate.motherLastname" id="right2" type="text" class="form-control" disabled>
                    <h6 class="mt-3">Número de documento</h6>
                    <input v-model="blackListCreate.documentNumber" id="right2"  type="text" class="form-control" disabled>
                    <h6 class="mt-3">Dirección</h6>
                    <input v-model="blackListCreate.address" id="right2"  type="text" class="form-control mb-3" disabled>
                </div>
            </div>
        </div>

         <div id="Personal" class="tabcontent">
            <div class="row mt-4">
                <div class="col-6 groupLeftPersonal">
                    <h6>Placa Vehículo 1</h6>
                    <input v-model="blackListCreate.vehicle1Plate" type="text" class="form-control" disabled>
                    <h6 class="mt-3">Razón</h6>
                    <input v-model="blackListCreate.reason" type="text" class="form-control mb-3" disabled>
                    
                </div>
                <div class="col-6 groupRightPersonal">
                    <h6>Placa Vehículo 2</h6>
                    <input v-model="blackListCreate.vehicle2Plate" id="right1" type="text" class="form-control mb-3" disabled>
                    
                </div>
            </div>
        </div>
        
        <div class="d-flex justify-content-center mt-3">
            <button class="btn mr-5" @click=$router.go(-1)>Volver</button>
        </div>
    </div>
</template>

<style src="@/styles/ClientCreate.css" scoped>

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
        ...mapState(['clients','token','clientsBlackList','blackListCreate'])
    },
    methods:{
        ...mapActions(['completePersonCreate']),
         openData :function(dataType) {
            // Declare all variables
            var i, tabcontent, tablinks, btn,buttons;
            switch(dataType){
                case 'Personal':
                    btn = 'btnPersonal';
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

    },
    
}
</script>