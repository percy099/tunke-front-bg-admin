<template>
    <div class="container">
        <div class="mt-5" v-if="!editClient">
            <h2>Creación de Cliente</h2>
            <input v-model="dniPerson" placeholder="DNI" id="dniCreate" type="text" class="form-control d-inline">
            <button @click="getPersonCreate()" class="btn ml-3">Buscar Persona</button>
        </div>
        <div v-else class="mt-5">
            <h2>Edición de Cliente</h2>
            <h5>DNI :</h5>
            <input v-model="clientCreate.documentNumber" id="dniCreate" type="text" class="form-control d-inline" disabled>
            <button id="btnEditAccounts" @click="editClientAccounts()" class="btn ml-3">Editar Cuentas</button>
        </div>
        <!-- Tab links -->
        <div class="tab mt-4">
        <button id="btnPersonal" class="tablinks inactive" @click="openData('Personal')">Datos Personales</button>
        <button id="btnContact" class="tablinks inactive" @click="openData('Contact')">Datos de Contacto</button>
        <button id="btnValidation" class="tablinks inactive" @click="openData('Validation')">Datos de Validación</button>
        </div>

        <!-- Tab content -->
        <div id="Personal" class="tabcontent">
            <div class="row mt-4">
                <div class="col-6 groupLeftPersonal">
                    <h6>Primer Nombre</h6>
                    <input v-model="clientCreate.firstName" type="text" class="form-control" disabled>
                    <h6 class="mt-3">Apellido Paterno</h6>
                    <input v-model="clientCreate.fatherLastname" type="text" class="form-control" disabled>
                    <div class="mt-3">
                        <span>Fecha de Nacimiento</span><input v-model="clientCreate.birthdate" class="ml-3" type="date" disabled>
                    </div>
                    <h6 class="mt-3">Dirección</h6>
                    <input v-model="clientCreate.address" type="text" class="form-control mb-3" disabled>
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
                </div>
            </div>
        </div>

        <div id="Contact" class="tabcontent">
            <div class="row mt-4">
                <div class="col-6 groupLeftPersonal">
                    <h6>E-mail primario</h6>
                    <input v-model="clientCreate.email1" type="text" class="form-control" :disabled='isDisabled'>
                    <h6 class="mt-3">E-mail secundario</h6>
                    <input v-model="clientCreate.email2" type="text" class="form-control" :disabled='isDisabled'>
                    <h6 class="mt-3">Teléfono primario</h6>
                    <input v-model="clientCreate.cellphone1" type="text" class="form-control" :disabled='isDisabled'>
                    <h6 class="mt-3">Teléfono secundario</h6>
                    <input v-model="clientCreate.cellphone2" type="text" class="form-control mb-5" :disabled='isDisabled'>
                </div>
            </div>
        </div>

        <div id="Validation" class="tabcontent">
            <div class="row mt-4">
                <div class="col-6 groupLeftPersonal">
                    <h6>Placa Vehículo 1</h6>
                    <input v-model="clientCreate.vehicle1Plate" type="text" class="form-control" disabled>
                    <h6 class="mt-5">Placa Vehículo 2</h6>
                    <input v-model="clientCreate.vehicle2Plate" type="text" class="form-control mb-5" disabled>
                </div>
            </div>
        </div>
        <div class="d-flex justify-content-center mt-3">
            <button class="btn mr-3" @click=$router.go(-1)>Cancelar</button>
            <button :disabled='isDisabled' v-if="!editClient" @click="saveClient()" class="btn ml-5">Guardar</button>
            <button v-if="editClient" @click="editClientAct()" class="btn ml-5">Editar</button>
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
        return {dniPerson : '',
                enableButton : false};
    },
    computed :{
        ...mapState (['clientCreate','token','editClient','selectedClientIndex']),
        isDisabled: function(){
    	    return !this.enableButton;
        }
    },
    methods:{
        ...mapActions (['completePersonCreate','cleanClientCreate','fillAccountsByClient']),
         openData :function(dataType) {
            // Declare all variables
            var i, tabcontent, tablinks, btn,buttons;
            switch(dataType){
                case 'Personal':
                    btn = 'btnPersonal';
                break ;

                case 'Contact':
                    btn = 'btnContact';
                break;

                case 'Validation':
                    btn = 'btnValidation';
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
        getPersonCreate(){
            userDA.getPersonData(this.dniPerson).then((res) =>{
                switch(res.data.type){
                    case 1:
                        Swal.fire({
                            title : 'Error',
                            type : 'error',
                            text : 'Esta persona ya se encuentra registrada como Cliente'
                        })
                        this.enableButton = false;
                    break;
                    case 2:
                        this.completePersonCreate(res.data);
                        this.enableButton = true;
                    break;
                    case 3:
                        Swal.fire({
                            title : 'Error',
                            type : 'error',
                            text : 'Esta persona se encuentra en la BlackList'
                        })
                        this.enableButton = false;
                    break;
                }
            }).catch(error =>{
                this.enableButton = false;
                this.cleanClientCreate();
                Swal.fire({
                    title: 'Error',
                    type: 'error',
                    text: 'No se encontraron registros de la persona con DNI ' + this.dniPerson
                })
            })
        },
        saveClient(){
            //TODO
            adminDA.createClient(this.clientCreate.idPerson,this.clientCreate.email1,this.clientCreate.email2,this.clientCreate.cellphone1,this.clientCreate.cellphone2,this.token).then((res) =>{
                Swal.fire({
                    type: 'success',
                    title: 'Enhorabuena',
                    text: 'Cliente creado satisfactoriamente'
                })
            }).catch(error =>{
                Swal.fire({
                    title : 'Error',
                    type : 'error',
                    text : 'Error al crear al cliente'
                })
            })
        },
        editClientAct(){
            adminDA.editClient(this.clientCreate.idClient,this.clientCreate.email1,this.clientCreate.email2,this.clientCreate.cellphone1,this.clientCreate.cellphone2,this.token).then((res) =>{
                Swal.fire({
                    type: 'success',
                    title: 'Enhorabuena',
                    text: 'Cliente editado satisfactoriamente'
                })
            }).catch(error =>{
                Swal.fire({
                    title : 'Error',
                    type : 'error',
                    text : 'Error al editar al cliente'
                })
            })
        },
        editClientAccounts(){
            adminDA.getAccountsByClient(this.clientCreate.idClient,this.token).then((res)=>{
                let accountsData = res.data;
                accountsData = accountsData.accounts;
                this.fillAccountsByClient(accountsData);
                this.$router.push({ name: 'clientAccounts', params: { idClient: this.clientCreate.idClient }})
            }).catch(error=>{
                Swal.fire({
                    title :'Error',
                    type : 'error',
                    text : 'Error obteniendo las cuentas del cliente'
                })
            });
        }
    },
    mounted(){
        document.getElementById('Personal').style.display = "block";
        document.getElementById('btnPersonal').classList.add('active');
        if(!this.editClient) {
            this.cleanClientCreate();
        }
        else{
            this.enableButton = true;
        }
    }
}
</script>