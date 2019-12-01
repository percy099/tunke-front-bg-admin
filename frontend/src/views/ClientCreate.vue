<template>
    <div class="container">
        <h2 class = "mb-4 mt-4" v-if="!editClient">Creación de Cliente</h2>
        <div class="custom-cont" v-if="!editClient">
            <div>
                <input placeholder="DNI" id="dniCreate" 
                type="text" class="form-control d-inline" maxlength="8"
                v-model.trim="$v.dniPerson.$model" :class="{
                'is-invalid' : $v.dniPerson.$error, 'is-valid' : !$v.dniPerson.$invalid }">
                <div class="valid-feedback">Dni Válido</div>
                <div class="invalid-feedback">
                    <span v-if="!$v.dniPerson.required">Dni Requerido. </span>
                    <span v-if="!$v.dniPerson.minLength">Debe ser de al menos de {{
                        $v.dniPerson.$params.minLength.min}} dígitos </span>
                    <span v-if="!$v.dniPerson.maxLength">Debe ser de al menos de {{
                        $v.dniPerso.$params.maxLength.max}} dígitos </span>
                    <span v-if="!$v.dniPerson.numeric">Debe contener solo números. </span>
                </div>
            </div>
            <div>
                <button @click="getPersonCreate()" class="btn ml-3" id="btnEditAccounts">Buscar Persona</button>
            </div>
        </div>
        <div v-else class="mt-5">
            <h2 class = "mb-4 mt-4">Edición de Cliente</h2>
            <div class="custom-cont">
                <div>
                <input v-model="clientCreate.documentNumber" id="dniCreate" type="text" class="form-control d-inline" disabled>
                </div>
                <div>
                <button id="btnEditAccounts" @click="editClientAccounts()" class="btn ml-3">Editar Cuentas</button>
                </div>
            </div>
        </div>
        <!-- Tab links -->
        <div class="tab">
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
                        <span class="extraSpan">Fecha de Nacimiento</span><input v-model="clientCreate.birthdate" class="ml-3" type="date" disabled>
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
                    <div>
                        <input type="text" class="form-control" :disabled='isDisabled'
                        v-model.trim="$v.email1.$model" :class="{
                        'is-invalid' : $v.email1.$error, 'is-valid':!$v.email1.$invalid }">
                        <div class="valid-feedback">Email Válido!</div>
                        <div class="invalid-feedback">
                            <span v-if="!$v.email1.email">Formato inadecuado</span>
                            <span v-if="!$v.email1.required">Email Principal Requerido.</span>
                        </div>
                    </div>
                    <h6 class="mt-3">E-mail secundario</h6>
                    <div>
                        <input type="text" class="form-control" :disabled='isDisabled'
                        v-model.trim="$v.email2.$model" :class="{
                        'is-invalid' : $v.email2.$error, 'is-valid':!$v.email2.$invalid && email2 != ''}">
                        <div v-if="email2 != ''" class="valid-feedback">Email Válido!</div>
                        <div class="invalid-feedback">
                            <span v-if="!$v.email2.email">Formato inadecuado</span>
                        </div>
                    </div>
                    <h6 class="mt-3">Teléfono primario</h6>
                    <div>
                        <input type="text" class="form-control" :disabled='isDisabled'
                        v-model.trim="$v.phone1.$model" :class="{
                        'is-invalid' : $v.phone1.$error || zero == true, 'is-valid':!$v.phone1.$invalid && zero != true}">
                        <div class="valid-feedback">Teléfono Válido</div>
                        <div class="invalid-feedback">
                            <span v-if="!$v.phone1.required">Télefono Principal Requerido. </span>
                            <span v-if="!$v.phone1.minLength">Debe ser de {{
                            $v.phone1.$params.minLength.min}} dígitos. </span>
                            <span v-if="!$v.phone1.maxLength">Debe ser de {{
                            $v.phone1.$params.maxLength.max}} dígitos. </span>
                            <span v-if="!$v.phone1.numeric">Debe contener solo números. </span>
                            <span v-if="zero == true"> No debe empezar de 0</span>
                        </div>
                    </div>
                    <h6 class="mt-3">Teléfono secundario</h6>
                    <div class="mb-5" style="box-sizing: border-box;">
                        <input type="text" class="form-control" :disabled='isDisabled'
                        v-model.trim="$v.phone2.$model" :class="{
                        'is-invalid' : $v.phone2.$error || zero2 == true, 'is-valid':!$v.phone2.$invalid && phone2 != '' && zero2 != true}">
                        <div class="valid-feedback">Teléfono Válido!</div>
                        <div class="invalid-feedback">
                            <span v-if="!$v.phone2.minLength">Debe ser de al menos {{
                            $v.phone2.$params.minLength.min}} dígitos. </span>
                            <span v-if="!$v.phone2.maxLength">Debe ser a lo mucho de {{
                            $v.phone2.$params.maxLength.max}} letters. </span>
                            <span v-if="!$v.phone2.numeric">Debe contener solo números. </span>
                            <span v-if="zero2 == true"> No debe empezar de 0</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div id="Validation" class="tabcontent">
            <div class="row mt-4">
                <div class="col-6 groupLeftPersonal">n
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
import { required, minLength, maxLength, numeric, email} from 'vuelidate/lib/validators'

export default {
    components:{
        ClientAccounts
    },
    data(){
        return {dniPerson : '',
                email1 :'',
                email2 : '',
                phone1 : '',
                phone2 : '',
                enableButton : false,
                zero : false,
                zero2 : false};
    },
    validations: {
        dniPerson: {
            required,
            minLength: minLength(8),
            maxLength: maxLength(8),
            numeric
        },
        phone1: {
            required,
            minLength: minLength(9),
            maxLength: maxLength(9),
            numeric
        },
        phone2: {
            minLength: minLength(9),
            maxLength: maxLength(9),
            numeric
        },
        email1: {
            required,
            email
        },
        email2: {
            email
        }
    },
    computed :{
        
        ...mapState (['clientCreate','token','editClient','selectedClientIndex','prueba']),
        isDisabled: function(){
    	    return !this.enableButton;
        }
    },
    methods:{
        ...mapActions (['completePersonCreate','cleanClientCreate','fillAccountsByClient','setPrueba']),
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
            this.$v.dniPerson.$touch();
            if (this.$v.dniPerson.$invalid) {
            } else {
                console.log('hola');
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
            }
        },
        saveClient(){
            this.$v.email1.$touch();
            this.$v.email2.$touch();
            this.$v.phone1.$touch();
            this.$v.phone2.$touch();
            if(this.$v.email1.$invalid || this.$v.email2.$invalid || this.$v.phone1.$invalid || this.$v.phone2.$invalid || this.zero == true || this.zero2 == true){
                this.openData('Contact');
            } else {
                this.clientCreate.email1 = this.email1;
                this.clientCreate.email2 = this.email2;
                this.clientCreate.cellphone1 = this.phone1;
                this.clientCreate.cellphone2 = this.phone2;
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
            }
        },
        editClientAct(){
            this.$v.email1.$touch();
            this.$v.email2.$touch();
            this.$v.phone1.$touch();
            this.$v.phone2.$touch();
            if(this.$v.email1.$invalid || this.$v.email2.$invalid || this.$v.phone1.$invalid || this.$v.phone2.$invalid || this.zero == true || this.zero2 == true){
                console.log('No pasó');
                console.log(this.email1);
                
                this.openData('Contact');
                
            } else {
                console.log('Si pasó');
                console.log(this.email1);
                
                this.clientCreate.email1 = this.email1;
                this.clientCreate.email2 = this.email2;
                this.clientCreate.cellphone1 = this.phone1;
                this.clientCreate.cellphone2 = this.phone2;
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
                
            }
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
        this.email1 = this.clientCreate.email1;
        this.email2 = this.clientCreate.email2;
        this.phone1 = this.clientCreate.cellphone1;
        this.phone2 = this.clientCreate.cellphone2;
    },
    updated(){
        if(this.phone1.substring(0,1) === '0'){
            this.zero = true;
            console.log(this.zero);
        } else {
            this.zero = false;
            console.log(this.zero);
        }

        if(this.phone2.substring(0,1) === '0'){
            this.zero2 = true;
        } else {
            this.zero2 = false;
        }
    }
}
</script>