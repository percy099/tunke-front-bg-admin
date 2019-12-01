<template>
    <div class="container">
        <h2 class = "mb-4 mt-4">Creación de Préstamo</h2>
        <div class="custom-cont">
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
                <button @click="getClient()" class="btn ml-3" id="btnEditAccounts">Buscar Cliente</button>
            </div>
        </div>
        <!-- Tab links -->
        <div class="tab">
        <button id="btnClient" class="tablinks inactive" @click="openData('Client')">Datos del Cliente</button>
        <button id="btnLending" class="tablinks inactive" @click="openData('Lending')">Datos del Préstamo</button>
        </div>

        <!-- Tab content -->
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
                    <input v-model="lendingCreate.documentNumber" type="text" class="form-control" disabled>
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
        <div id="Lending" class="tabcontent">
            <div class="row mt-4">
                <div class="col-6 groupLeftPersonal">
                    <!--<h6>Nombre Cliente</h6>
                    <input v-model="lendingCreate.fullName" type="text" class="form-control" disabled>-->
                    <h6 class="mt-3">Fecha Préstamo</h6>
                    <!--<input v-model="lendingCreate.requestDate" type="text" class="form-control" disabled>-->
                    <input type='date' v-model='myDate' class="form-control" style="width:21em;" disabled>
                    <h6 class="mt-3">Tipo de moneda</h6>
                    <input v-if="selectCampaign == 1" placeholder="Soles" type="text" class="form-control" disabled>
                    <input v-if="selectCampaign == 2" placeholder="Dólares" type="text" class="form-control" disabled>
                    <div>
                        <h6 class="mt-3">Monto Total</h6>
                        <input type="text" class="form-control" 
                        v-model.trim="$v.amount.$model" :class="{
                        'is-invalid' : $v.amount.$error, 'is-valid':!$v.amount.$invalid }">
                        <div class="valid-feedback">Monto Válido!</div>
                        <div class="invalid-feedback">
                            <span v-if="!$v.amount.minValue">Debe ser de al menos {{
                            $v.amount.$params.minValue.min}} </span>
                            <span v-if="!$v.amount.numeric">Debe contener solo números. </span>
                            <span v-if="!$v.amount.required">Cuotas Requerido. </span>
                        </div>
                    </div>
                    <h6 class="mt-3">Tipo de Cuota</h6>
                    <select v-model="selectShare" style="height:2.3em; width:21em;">
                        <option v-for="optionShare in optionsShare" v-bind:value="optionShare.value">
                            {{ optionShare.text }}
                        </option>
                    </select>
                    <div>
                        <h6 class="mt-3">Tasa de interés</h6>
                        <!--<input v-model="lendingCreate.interestRate" type="text" class="form-control mb-5" disabled>
                        <input v-model="interestRateLending"  type="text" class="form-control mb-5">-->

                        <input type="text" id="right2" class="form-control"
                        v-model.trim="$v.interestRateLending.$model" :class="{
                        'is-invalid' : $v.interestRateLending.$error, 'is-valid':!$v.interestRateLending.$invalid }">
                        <div class="valid-feedback">Tasa de interés válida!</div>
                        <div class="invalid-feedback">
                            <span v-if="!$v.interestRateLending.minValue">Debe ser de al menos {{
                            $v.interestRateLending.$params.minValue.min}} </span>
                            <span v-if="!$v.interestRateLending.numeric">Debe contener solo números. </span>
                            <span v-if="!$v.interestRateLending.required">Tasa de interés requerida. </span>
                        </div>
                    </div>
                    
                </div>
                <div class="col-6 groupRightPersonal">
                    <!--h6>Nro. Documento</h6>
                    <input v-model="lendingCreate.documentNumber" type="text" class="form-control" disabled>-->
                    <h6 class="mt-3">Campaña</h6>
                    <select v-model="selectCampaign" id="right2" style="height:2.3em; ">
                        <option v-for="optionCampaign in optionsCampaign" v-bind:value="optionCampaign.value">
                            {{ optionCampaign.text }}
                        </option>
                    </select>
                    <h6 class="mt-3">Número de cuenta</h6>
                    <select v-if="selectCampaign == 1" v-model="selectAccountSoles" id="right2" style="height:2.3em;">
                        <option v-for="accountsByClients in solesAccounts" v-bind:value="accountsByClients.idAccount">
                            {{accountsByClients.accountNumber}}
                        </option>
                    </select>  
                    <div v-if="selectCampaign == 1" class="invalid-feedback">
                        <span v-if="selectAccountSoles == 0 || selectAccountSoles == undefined">Debe seleccionar una cuenta </span>
                    </div>
                    <select v-if="selectCampaign == 2" v-model="selectAccountDolar" id="right2" style="height:2.3em;">
                        <option v-for="accountsByClients in dolarAccounts" v-bind:value="accountsByClients.idAccount">
                            {{accountsByClients.accountNumber}}
                        </option>
                    </select>  
                    <div v-if="selectCampaign == 2" class="invalid-feedback">
                        <span v-if="selectAccountDolar == 0 || selectAccountDolar == undefined">Debe seleccionar una cuenta </span>
                    </div>
                    <h6 class="mt-3">Número de cuotas (mensual)</h6>
                    <input type="text" id="right2" class="form-control"
                    v-model.trim="$v.totalShares.$model" :class="{
                    'is-invalid' : $v.totalShares.$error, 'is-valid':!$v.totalShares.$invalid }">
                    <div class="valid-feedback">Monto Válido!</div>
                    <div class="invalid-feedback">
                        <span v-if="!$v.totalShares.minValue">Debe ser de al menos {{
                        $v.totalShares.$params.minValue.min}} </span>
                        <span v-if="!$v.totalShares.numeric">Debe contener solo números. </span>
                        <span v-if="!$v.totalShares.required">Cuotas Requerido. </span>
                    </div>
                    <h6 class="mt-3">Cuota</h6>
                    <input v-model="calculateShare" type="text" id="right2" class="form-control" disabled>
                    <h6 class="mt-3">Comisión</h6>
                    <input v-model="calculateCommission" type="text" id="right2" class="form-control mb-5" disabled>
                </div>
            </div>
        </div>

        
        <div class="d-flex justify-content-center mt-3">
            <button class="btn mr-3" @click=$router.go(-1)>Cancelar</button>
            <button  @click="saveLending()" class="btn ml-5">Guardar</button>
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
import { required, minLength, maxLength, numeric, minValue, maxValue} from 'vuelidate/lib/validators'


export default {
    components:{
        ClientAccounts
    },
    data(){
        return {dniClient : '',
                enableButton : false,
                selectAccountDolar : 0,
                selectAccountSoles : 0,
                selectAccount : 0,
                selectCampaign : 1,
                totalShares : 0,
                amount : 0,
                selectShare: 1,
                selectCurrency: 1,
                interestRateLending: 0,
                optionsCampaign: [
                { text: 'Campaña Ventanilla Soles', value: 1 },
                { text: 'Campaña Ventanilla Dólares', value: 2 }],
                optionsShare: [
                { text: 'Ordinaria', value: 1 },
                { text: 'Extraordinaria', value: 2 }],
                dolarAccounts : [],
                solesAccounts : [],
                myDate : new Date().toISOString().slice(0,10),
                name : '',
                minLNumber : 0,
                maxLNumber : 0,
                selectedTypeDoc : false,
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
            totalShares: {
                required,
                numeric,
                minValue: minValue(1)
            },
            amount: {
                required,
                numeric,
                minValue: minValue(1)
            },
            interestRateLending: {
                required,
                numeric,
                minValue: minValue(1)
            }
        }
    },
    computed :{
        ...mapState (['lendingCreate','token','editClient','selectedClientIndex','accountsByClient','clientCreate','parameterSetting']),
        calculateShare : function (){
            //let amount = this.lendingCreate.amount;
            let amount = this.amount;
            //let term = this.lendingCreate.totalShares;
            let term = parseInt(this.totalShares);
            let tea = this.interestRateLending;
            let numberExtra = 0;
            let tem =Math.pow(1+(tea/100),1/12)-1;
            console.log("tem: " +tem);
            let commission = 0.25;
            
            //Cuota extraordinaria
            let moment = require('moment');
            let month=moment();
            let countExtraMonths=0;
            for (let i=0;i<term;i++){
              let dateAdded=this.addDays(month,30);  
              month=moment(dateAdded).format("MM");
              if (month=='07' || month=='12'){
                  countExtraMonths=countExtraMonths+1;
              }
              month=dateAdded;
            }
             console.log("fecha: "+countExtraMonths);

             if(this.selectShare==2){
                 numberExtra=countExtraMonths;
             }else if (this.selectShare==1){
                 numberExtra=0;
             }
            //console.log("numero extra: " +numberExtra);
            let shareBase =(amount*(Math.pow(1+tem,term+numberExtra)*tem)) / (Math.pow(1+tem,term+numberExtra)-1);
            //console.log("cuota base: " +shareBase );
            //Cuota final
            let shareNumber =shareBase+ (amount*commission/100);
            let share =shareNumber.toFixed(2);
            //Se mostrara la cuota base
            this.lendingCreate.share=shareBase.toFixed(2);
            
            if(!this.amount || !this.totalShares || !this.interestRateLending) return 0;
            else 
            return this.lendingCreate.share;
        },
        calculateCommission: function (){
            //let amount = this.lendingCreate.amount;
            let amount = this.amount;
            let commission = parseFloat(this.parameterSetting.commissionPercentage);
            let comissionAmount = amount*commission/100;
            this.lendingCreate.commission=comissionAmount;
            return this.lendingCreate.commission;
        },
        isDisabled2: function(){
            if(this.selectedTypeDoc){
                this.enableButton2 = true;
            }
    	      return !this.enableButton2;
        }
        
    },
    methods:{
        ...mapActions (['completeLendingCreate','cleanLendingCreate','completePersonCreate','completeLendingCreateCampaign','cleanClientCreate']),
        fillAccountsPerType(accounts){
            let aux=accounts;
            for(let i = 0; i < aux.length; i++){
                if(aux[i].idCurrency == 1){
                    this.solesAccounts.push({
                        idAccount : aux[i].idAccount,
                        accountNumber : aux[i].accountNumber,
                        idCurrency : aux[i].idCurrency,
                    })
                } else {
                    this.dolarAccounts.push({
                        idAccount : aux[i].idAccount,
                        accountNumber : aux[i].accountNumber,
                        idCurrency : aux[i].idCurrency,
                    })
                }
            }
        },
        addDays:function (dateIn_, n) {
            let moment = require('moment');
            let days = parseInt(n);
            let result = moment(dateIn_).add(days, 'days');
            return result;
        },
         openData :function(dataType) {
            // Declare all variables
            var i, tabcontent, tablinks, btn,buttons;
            switch(dataType){
                case 'Client':
                    btn = 'btnClient';
                break ;
                case 'Lending':
                    btn = 'btnLending';
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
                                this.cleanLendingCreate();
                                this.cleanClientCreate();
                                this.enableButton = false;
                            }else{
                                this.completePersonCreate(res.data);
                                this.completeLendingCreate(res.data);
                                this.clientCreate.documentNumber=res.data.documentNumber;
                                this.clientCreate.email1=res.data.email1;
                                this.clientCreate.cellphone1=res.data.cellphone1;
                                adminDA.getAccountsByClient(this.lendingCreate.idClient,this.token).then((res)=>{
                                    console.log("paso cuentas");
                                    let accountsData = res.data;
                                    accountsData = accountsData.accounts;
                                    //this.fillAccountsByClient(accountsData);
                                    this.fillAccountsPerType(accountsData);
                                }).catch(error =>{  
                                    this.enableButton = false;
                                    this.cleanLendingCreate();
                                    this.cleanClientCreate();
                                    Swal.fire({
                                        title: 'Error',
                                        type: 'error',
                                        text: 'No se encontraron cuentas del cliente'
                                    })
                                });
                                this.enableButton = true;
                            }
                        break;
                        case 2:
                            this.cleanLendingCreate();
                            this.cleanClientCreate();
                            Swal.fire({
                                title : 'Error',
                                type : 'error',
                                text : 'Esta persona no se encuentra registrada como Cliente'
                            })
                            this.enableButton = false;
                        break;
                        case 3:
                            this.cleanLendingCreate();
                            this.cleanClientCreate();
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
                    this.cleanLendingCreate();
                    this.cleanClientCreate();
                    Swal.fire({
                        title: 'Error',
                        type: 'error',
                        text: 'No se encontraron registros del cliente con DNI ' + this.dniClient
                    })
                })
            }
        },
        
        saveLending(){
            //Usas estos 3 valores para completar la creación del lending
            console.log(this.selectAccount);  //Id de la cuenta escogida
            console.log(this.selectCampaign);  //Id de la campaña escogida, solo estos valores necesitas para el back
            console.log(this.selectShare);  //Id del tipo de la cuota

            if(this.selectCampaign == 1){
                this.selectAccount = this.selectAccountSoles;
            } else {
                this.selectAccount = this.selectAccountDolar;
            }

            this.$v.totalShares.$touch();
            this.$v.amount.$touch();
            this.$v.interestRateLending.$touch();
            this.lendingCreate.interestRate =this.interestRateLending;
            console.log(this.lendingCreate.interestRate);
            if (this.$v.totalShares.$invalid || this.$v.amount.$invalid || this.selectAccount == 0 || this.selectAccount == undefined || this.$v.interestRateLending.$invalid) {
            } else {
                adminDA.createLending(this.lendingCreate.idClient,this.totalShares,this.amount,this.lendingCreate.interestRate,this.selectShare,this.selectAccount,this.lendingCreate.share,this.lendingCreate.commission,this.selectCampaign,this.token).then((res) =>{
                    Swal.fire({
                        type: 'success',
                        title: 'Enhorabuena',
                        text: 'Préstamo creado satisfactoriamente'
                    })
                    this.$router.push('/crudLending');
                }).catch(error =>{
                    Swal.fire({
                        title : 'Error',
                        type : 'error',
                        text : 'Error al crear el préstamo'
                    })
                })
            }
        }
    },
    mounted(){
        document.getElementById('Client').style.display = "block";
        document.getElementById('btnClient').classList.add('active');
        this.cleanLendingCreate();
        this.cleanClientCreate();
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