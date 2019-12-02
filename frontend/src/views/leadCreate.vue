<template>
    <div class="container">
        <h2 v-if="editLead == 1" class = "mb-4 mt-4">Creación de Lead</h2>
        <div v-if="editLead == 1" class="custom-cont">
            <div>
                    <input  :placeholder='name' id="dniCreate" 
                    type="text" class="form-control d-inline" :disabled='isDisabled2' :maxlength="maxLNumber" :minlength="minLNumber"
                    v-model.trim="$v.dniClient.$model" :class="{
                    'is-invalid' : $v.dniClient.$error, 'is-valid' : !$v.dniClient.$invalid }">
                    <div v-if="selectedTypeDoc.value == 1" class="valid-feedback">Dni Válido</div>
                    <div v-if="selectedTypeDoc.value == 2" class="valid-feedback">Carnet de Extranjería Válido</div>
                    <div class="invalid-feedback">
                        <span v-if="!$v.dniClient.required && selectedTypeDoc.value == 1">Dni Requerido. </span>
                        <span v-if="!$v.dniClient.required && selectedTypeDoc.value == 2">Carnet de Extranjería Requerido. </span>
                        <span v-if="!$v.dniClient.minLength">Debe ser de al menos de {{
                            $v.dniClient.$params.minLength.min}} dígitos </span>
                        <span v-if="!$v.dniClient.maxLength">Debe ser de al menos de {{
                            $v.dniClient.$params.maxLength.max}} dígitos </span>
                        <span v-if="!$v.dniClient.numeric">Debe contener solo números. </span>
                    </div>
                </div>
                <div>  
                    <v-select class="ml-3" placeholder=" Tipo de documento" v-model="selectedTypeDoc" :required="!selectedTypeDoc" :options="optionsDoc"  label="text"/>
                </div>
                <div>
                    <button @click="getClient()" class="btn ml-3" id="btnEditAccounts">Buscar Persona</button>
                </div>
        </div>
        <div v-else class="mt-5">
            <h2 class = "mb-4 mt-4">Ver Lead</h2>
            <div class="custom-cont">
                <div>
                <input v-model="leadCreate.documentNumber" id="dniCreate" type="text" class="form-control d-inline" disabled>
                </div>
            </div>
        </div>
        <!-- Tab links -->
        <div class="tab">
        <button id="btnClient" class="tablinks inactive" @click="openData('Client')">Datos del Cliente</button>
        <button id="btnLead" class="tablinks inactive" @click="openData('Lead')">Datos del Lead</button>
        </div>

        <!-- Tab content -->
        <div id="Client" class="tabcontent">
           <div class="row mt-4">
                <div v-if="editLead == 1" class="col-6 groupLeftPersonal">
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
                <div v-if="editLead == 1" class="col-6 groupRightPersonal">
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
                <div v-if="editLead == 0" class="col-6 groupLeftPersonal">
                    <h6>Primer Nombre</h6>
                    <input v-model="leadCreate.firstName" type="text" class="form-control" disabled>
                    <h6 class="mt-3">Apellido Paterno</h6>
                    <input v-model="leadCreate.fatherLastname" type="text" class="form-control" disabled>
                    <div class="mt-3">
                        <span class="extraSpan">Fecha de Nacimiento</span><input v-model="leadCreate.birthdate" class="ml-3" type="date" disabled>
                    </div>
                    <h6 class="mt-3">Dirección</h6>
                    <input v-model="leadCreate.address" type="text" class="form-control mb-3" disabled>
                </div>
                <div v-if="editLead == 0" class="col-6 groupRightPersonal">
                    <h6>Segundo Nombre</h6>
                    <input v-model="leadCreate.middleName" id="right1" type="text" class="form-control" disabled>
                    <h6 class="mt-3">Apellido Materno</h6>
                    <input v-model="leadCreate.motherLastname" id="right2" type="text" class="form-control" disabled>
                    <h6 class="mt-3">Nacionalidad</h6>
                    <div>
                        <input v-model="leadCreate.nationality" id="right3" type="text" class="form-control d-inline" disabled>
                        <img class="ml-3" v-bind:src="leadCreate.flag" height="30" width="auto">
                    </div>
                </div>
            </div>
        </div>
        <div id="Lead" class="tabcontent">
            <div class="row mt-4">
                <div v-if="editLead == 1" class="col-6 groupLeftPersonal">
                    <h6>Nombre Campaña</h6>
                    <input v-model="campaignCreate.name" type="text" class="form-control" disabled>
                    <div>
                        <h6 class="mt-3">Monto Mínimo Cliente</h6> 
                        <input type="text" class="form-control"
                        v-model.trim="$v.minimum.$model" :class="{
                        'is-invalid' : $v.minimum.$error, 'is-valid':!$v.minimum.$invalid }">
                        <div class="valid-feedback">Monto Válido!</div>
                        <div class="invalid-feedback">
                            <span v-if="!$v.minimum.minValue">Debe ser de al menos {{
                            $v.minimum.$params.minValue.min}} </span>
                            <span v-if="!$v.minimum.maxValue">Debe ser a lo mucho de {{
                            $v.minimum.$params.maxValue.max}} </span>
                            <span v-if="!$v.minimum.numeric">Debe contener solo números. </span>
                            <span v-if="!$v.minimum.required">Monto Requerido. </span>
                        </div>
                    </div>
                    <div>
                        <h6 class="mt-3">Periodo Mínimo (mensual)</h6> 
                        <input type="text" class="form-control"
                        v-model.trim="$v.minPeriod.$model" :class="{
                        'is-invalid' : $v.minPeriod.$error, 'is-valid':!$v.minPeriod.$invalid }">
                        <div class="valid-feedback">Monto Válido!</div>
                        <div class="invalid-feedback">
                            <span v-if="!$v.minPeriod.minValue">Debe ser de al menos {{
                            $v.minPeriod.$params.minValue.min}} </span>
                            <span v-if="!$v.minPeriod.maxValue">Debe ser a lo mucho de {{
                            $v.minPeriod.$params.maxValue.max}} </span>
                            <span v-if="!$v.minPeriod.numeric">Debe contener solo números. </span>
                            <span v-if="!$v.minPeriod.required">Monto Requerido. </span>
                        </div>
                    </div>
                    <div>
                        <h6 class="mt-3">Tasa de interés (%)</h6> 
                        <input type="text" class="form-control mb-3"
                        v-model.trim="$v.rate.$model" :class="{ 
                        'is-invalid' : $v.rate.$error, 'is-valid':!$v.rate.$invalid }">
                        <div class="valid-feedback">Tasa de interés válida!</div>
                        <div class="invalid-feedback">
                            <span v-if="!$v.rate.minValue">Debe ser de al menos {{
                            $v.rate.$params.minValue.min}} </span>
                            <span v-if="!$v.rate.maxValue">Debe ser a lo mucho de {{
                            $v.rate.$params.maxValue.max}} </span>
                            <span v-if="!$v.rate.numeric">Debe contener solo números. </span>
                            <span v-if="!$v.rate.required">Tasa de interés Requerido. </span>
                        </div>
                    </div>
                </div>
                <div v-if="editLead == 1" class="col-6 groupRightPersonal">
                    <h6>Moneda</h6>
                    <input v-if="campaignCreate.idCurrency == 1" placeholder="Soles" type="text" class="form-control" disabled>
                    <input v-if="campaignCreate.idCurrency == 2" placeholder="Dólares" type="text" class="form-control" disabled>
                    <div>
                        <h6 class="mt-3">Monto Máximo Cliente</h6>
                        <input type="text" class="form-control"
                        v-model.trim="$v.maximum.$model" :class="{
                        'is-invalid' : $v.maximum.$error, 'is-valid':!$v.maximum.$invalid }">
                        <div class="valid-feedback">Monto Válido!</div>
                        <div class="invalid-feedback">
                            <span v-if="!$v.maximum.minValue">Debe ser de al menos {{
                            $v.maximum.$params.minValue.min}} </span>
                            <span v-if="!$v.maximum.maxValue">Debe ser a lo mucho de {{
                            $v.maximum.$params.maxValue.max}} </span>
                            <span v-if="!$v.maximum.numeric">Debe contener solo números. </span>
                            <span v-if="!$v.maximum.required">Monto Requerido. </span>
                        </div>
                    </div>
                    <div>
                        <h6 class="mt-3">Periodo Máximo (mensual)</h6>
                        <input type="text" class="form-control"
                        v-model.trim="$v.maxPeriod.$model" :class="{
                        'is-invalid' : $v.maxPeriod.$error, 'is-valid':!$v.maxPeriod.$invalid }">
                        <div class="valid-feedback">Monto Válido!</div>
                        <div class="invalid-feedback">
                            <span v-if="!$v.maxPeriod.minValue">Debe ser de al menos {{
                            $v.maxPeriod.$params.minValue.min}} </span>
                            <span v-if="!$v.maxPeriod.maxValue">Debe ser a lo mucho de {{
                            $v.maxPeriod.$params.maxValue.max}} </span>
                            <span v-if="!$v.maxPeriod.numeric">Debe contener solo números. </span>
                            <span v-if="!$v.maxPeriod.required">Monto Requerido. </span>
                        </div>
                    </div>
                    
                </div>
                <div v-if="editLead == 0" class="col-6 groupLeftPersonal">
                    <h6>Nombre Campaña</h6>
                    <input v-model="campaignCreate.name" type="text" class="form-control" disabled>
                    <h6 class="mt-3">Monto Mínimo</h6> 
                    <input v-model="leadCreate.minimumLoan" type="text" class="form-control mb-3" disabled>
                    <h6 class="mt-3">Periodo Mínimo (mensual)</h6> 
                    <input v-model="leadCreate.minimumPeriod" type="text" class="form-control mb-3" disabled>
                    <h6 class="mt-3">Tasa de interés (%)</h6> 
                    <input v-model="leadCreate.interestRate" type="text" class="form-control mb-3" disabled>
                </div>
                <div v-if="editLead == 0" class="col-6 groupRightPersonal">
                    <h6>Moneda</h6>
                    <input v-if="campaignCreate.idCurrency == 1" placeholder="Soles" type="text" class="form-control" disabled>
                    <input v-if="campaignCreate.idCurrency == 2" placeholder="Dólares" type="text" class="form-control" disabled>
                    <h6 class="mt-3">Monto Máximo</h6>
                    <input v-model="leadCreate.maximumLoan" type="text" class="form-control mb-3" disabled>
                    <h6 class="mt-3">Periodo Máximo (mensual)</h6>
                    <input v-model="leadCreate.maximumPeriod" type="text" class="form-control mb-3" disabled>
                </div>
            </div>
        </div>

        
        <div class="d-flex justify-content-center mt-3">
            <button class="btn mr-3" @click=$router.go(-1)>Cancelar</button>
            <button v-if="editLead == 1" @click="saveLead()" class="btn ml-5">Guardar</button>
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
import { required, minLength, maxLength, numeric, maxValue, minValue} from 'vuelidate/lib/validators'


export default {
    components:{
        ClientAccounts
    },
    data(){
        return {dniClient : '',
                enableButton : false,
                maximum : 0,
                minimum : 0,
                maxCamp : '',
                minCamp : '',
                maxPeriod : '',
                minPeriod : '',
                rate : '',
                selectedTypeDoc: false,
                minLNumber: 0,
                maxLNumber: 0,
                maxAmount: 0,
                name: "",
                optionsDoc: [
                    { text: 'DNI', value: 1 },
                    { text: 'Carnet de Extranjería', value: 2 }
                ]
                };
    },
    validations() {
        return {
            dniClient: {
                required,
                minLength: minLength(this.minLNumber),
                maxLength: maxLength(this.maxLNumber),
                numeric
            },
            maximum: {
                required,
                minValue: minValue(parseInt(this.minimum) + 1),
                maxValue: maxValue(this.maxAmount),
                numeric
            },
            minimum: {
                required,
                minValue: minValue(1),
                maxValue: maxValue(parseInt(this.maximum) - 1),
                numeric
            },
            maxPeriod: {
                required,
                minValue: minValue(1),
                maxValue: maxValue(10000),
                numeric
            },
            minPeriod: {
                required,
                minValue: minValue(1),
                maxValue: maxValue(10000),
                numeric
            },
            rate: {
                required,
                minValue: minValue(1),
                maxValue: maxValue(100),
                numeric
            }
        }
    },
    computed :{
        ...mapState (['token','clientCreate','campaignCreate','editLead','leadCreate','bankAccounts']),
        cambio(){
            this.auxMinCap = this.minimum;
            console.log(this.auxMinCap);
        },
        isDisabled2: function(){
            if(this.selectedTypeDoc){
                this.enableButton2 = true;
            }
    	      return !this.enableButton2;
        }
    },
    methods:{
        ...mapActions (['completePersonCreate','completeLendingCreateCampaign','cleanClientCreate','completeBankAccount']),
         openData :function(dataType) {
            // Declare all variables
            var i, tabcontent, tablinks, btn,buttons;
            switch(dataType){
                case 'Client':
                    btn = 'btnClient';
                break ;
                case 'Lead':
                    btn = 'btnLead';
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
        getClient(){
            this.$v.dniClient.$touch();
            if (this.$v.dniClient.$invalid) {
            } else {
                userDA.getPersonData(this.dniClient).then((res) =>{
                    switch(res.data.type){
                        case 1:
                            if(res.data.activeLoans==true){
                                Swal.fire({
                                title : 'Error',
                                type : 'error',
                                text : 'El cliente ya tiene un préstamo en proceso o activo'
                                })
                                this.cleanClientCreate();
                                this.enableButton = false;
                            }else{
                                this.completePersonCreate(res.data);
                                this.enableButton = true;
                            }
                        break;
                        case 2:
                            Swal.fire({
                                title : 'Error',
                                type : 'error',
                                text : 'Esta persona no se encuentra registrada como Cliente'
                            })
                            this.enableButton = false;
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
                    if(this.selectedTypeDoc.value == 1){
                        Swal.fire({
                            title: 'Error',
                            type: 'error',
                            text: 'No se encontraron registros de la persona con DNI ' + this.dniPerson
                        })
                    }
                    if(this.selectedTypeDoc.value == 2){
                        Swal.fire({
                            title: 'Error',
                            type: 'error',
                            text: 'No se encontraron registros de la persona con el carnet ' + this.dniPerson
                        })
                    }
                })
            }
        },
        
        saveLead(){
            this.$v.$touch();
            if (this.$v.$invalid || this.maxPeriod - this.minPeriod < 6) {
                if(this.maxPeriod - this.minPeriod < 6){
                    Swal.fire({
                        title: 'Error',
                        type: 'error',
                        text: 'Diferencia entre periodo máximo y mínimo debe ser mayor o igual a 6'
                    })
                }
            } else {
                adminDA.createLead(this.clientCreate.idClient,this.campaignCreate.idCampaign,this.maximum, this.minimum, this.maxPeriod, this.minPeriod, this.rate, this.token).then((res) =>{
                    Swal.fire({
                        type: 'success',
                        title: 'Enhorabuena',
                        text: 'Lead creado satisfactoriamente'
                    })
                }).catch(error =>{
                    Swal.fire({
                        title : 'Error',
                        type : 'error',
                        text : 'Error al crear al lead'
                    })
                })
            }  
        }
    },
    mounted(){
        document.getElementById('Client').style.display = "block";
        document.getElementById('btnClient').classList.add('active');
        this.cleanClientCreate();
        this.maximum = this.campaignCreate.maximumLoan;
        this.minimum = this.campaignCreate.minimumLoan;
        this.maxCamp = this.campaignCreate.maximumLoan;
        this.minCamp = this.campaignCreate.minimumLoan;
        userDA.getAllBankAccount(this.token).then((res) =>{
            this.completeBankAccount(res.data);
            }).catch(error =>{
                Swal.fire({
                    title: 'Error',
                    type: 'error',
                    text: 'Error obteniendo las cuentas del banco'
                })
            });
        console.log(this.bankAccounts[0].balance);
        console.log(this.bankAccounts[1].balance);
        if(this.campaignCreate.idCurrency == 1){
            this.maxAmount = 0.8*this.bankAccounts[0].balance;
        }
        if(this.campaignCreate.idCurrency == 2){
            this.maxAmount = 0.8*this.bankAccounts[1].balance;
        }
        console.log(this.maxAmount);
    },
    updated(){
        if(this.selectedTypeDoc && this.selectedTypeDoc.value==1){
            this.name = "DNI"
            this.minLNumber=8;
            this.maxLNumber=8;
        } if(this.selectedTypeDoc && this.selectedTypeDoc.value==2) {
            this.name = "Carnet de extranjería"
            this.minLNumber=12;
            this.maxLNumber=12;
        }
    }
}
</script>