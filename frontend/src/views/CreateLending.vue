<template>
    <div class="container">
        <h2 class = "mb-4 mt-4">Creación de Préstamo</h2>
        <div class="custom-cont">
            <div>
                <input placeholder="DNI" id="dniCreate" 
                type="text" class="form-control d-inline" maxlength="8"
                v-model.trim="$v.dniClient.$model" :class="{
                'is-invalid' : $v.dniClient.$error, 'is-valid' : !$v.dniClient.$invalid }">
                <div class="valid-feedback">Dni Válido</div>
                <div class="invalid-feedback">
                    <span v-if="!$v.dniClient.required">Dni Requerido. </span>
                    <span v-if="!$v.dniClient.minLength">Debe ser de al menos de {{
                        $v.dniClient.$params.minLength.min}} dígitos.</span>
                    <span v-if="!$v.dniClient.maxLength">Debe ser de al menos de {{
                        $v.dniPerso.$params.maxLength.max}} dígitos.</span>
                    <span v-if="!$v.dniClient.numeric">Debe contener solo números. </span>
                </div>
            </div>
            <div>
                <button @click="getClient()" class="btn ml-3" id="btnEditAccounts">Buscar Cliente</button>
            </div>
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
                    <input v-model="lendingCreate.amount" type="text" class="form-control"> 
                    <h6 class="mt-3">Tipo de Cuota</h6>
                    <select name="TipoCuota" style="height:2.3em; width:21em;" :value="$store.myValue" @input="setSelected">
                        <option value="1">Ordinaria</option>
                        <option value="2">Extraordinaria</option>
                    </select>
                    <h6 class="mt-3">Tasa de interés</h6>
                    <input v-model="lendingCreate.interestRate" type="text" class="form-control mb-5" disabled>
                    
                    
                </div>
                <div class="col-6 groupRightPersonal">
                    <h6>Nro. Documento</h6>
                    <input v-model="lendingCreate.documentNumber" type="text" class="form-control" disabled>
                    <h6 class="mt-3">Campaña</h6>
                    <input v-model="lendingCreate.campaignName" type="text" class="form-control" disabled>
                    <h6 class="mt-3">Número de cuenta</h6>
                    <select v-model="accountsByClient.accountNumber" style="height:2.3em; width:27em;">
                        <option v-for="(accountsByClients,index) in accountsByClient" v-bind:key="index">{{accountsByClients.accountNumber}}</option>
                    </select>   
                    <h6 class="mt-3">Número de cuotas</h6>
                    <input v-model="lendingCreate.totalShares" type="text" class="form-control">
                    <h6 class="mt-3">Cuota</h6>
                    <input v-model="calculateShare" type="text" class="form-control" disabled>
                    <h6 class="mt-3">Comisión</h6>
                    <input v-model="calculateCommission" type="text" class="form-control mb-5" disabled>
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
                    <input v-model="lendingCreate.currency"  type="text" class="form-control mb-5" disabled>
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
import { required, minLength, maxLength, numeric} from 'vuelidate/lib/validators'


export default {
    components:{
        ClientAccounts
    },
    data(){
        return {dniClient : '',
                enableButton : false};
    },
    validations: {
        dniClient: {
            required,
            minLength: minLength(8),
            maxLength: maxLength(8),
            numeric
        }
    },
    computed :{
        ...mapState (['lendingCreate','token','editClient','selectedClientIndex','accountsByClient']),
        calculateShare : function (){
            let amount = this.lendingCreate.amount;
            let term = this.lendingCreate.totalShares;
            let tea = this.lendingCreate.interestRate;
            let tem =Math.pow(1+(tea/100),1/12)-1;
            let commission = 0.25;
            let shareNumber = amount*((1/term)+(tem/100)+(commission/100));
            let share =shareNumber.toFixed(2);
            this.lendingCreate.share=share;

            if(!this.lendingCreate.amount || !this.lendingCreate.totalShares) return 0;
            else 
            return this.lendingCreate.share;
        },
        calculateCommission: function (){
            let amount = this.lendingCreate.amount;
            let commission = 0.25;
            let comissionAmount = amount*commission/100;
            //Which commission?
            this.lendingCreate.commission=commission;
            return this.lendingCreate.commission;
        }
    },
    methods:{
        ...mapActions (['completeLendingCreate','cleanLendingCreate','fillAccountsByClient','completeLendingCreateCampaign']),
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
        getClient(){
            this.$v.$touch();
            if (this.$v.$invalid) {
            } else {
                userDA.getPersonData(this.dniClient).then((res) =>{
                    switch(res.data.type){
                        case 1:
                            this.completeLendingCreate(res.data);
                             adminDA.getAccountsByClient(this.lendingCreate.idClient,this.token).then((res)=>{
                                console.log('Leonella');
                                let accountsData = res.data;
                                accountsData = accountsData.accounts;
                                this.fillAccountsByClient(accountsData);
                            }).catch(error =>{  
                                this.enableButton = false;
                                this.cleanLendingCreate();
                                Swal.fire({
                                    title: 'Error',
                                    type: 'error',
                                    text: 'No se encontraron cuentas del cliente'
                                })
                            });
                            this.enableButton = true;
                        break;
                        case 2:
                            Swal.fire({
                                title : 'Error',
                                type : 'error',
                                text : 'Esta persona no se encuentra registrada como Cliente'
                            })
                            this.enableButton = false;
                        break;
                    }
                }).catch(error =>{
                    this.enableButton = false;
                    this.cleanLendingCreate();
                    Swal.fire({
                        title: 'Error',
                        type: 'error',
                        text: 'No se encontraron registros del cliente con DNI ' + this.dniClient
                    })
                }),
                adminDA.getCampaignByID(this.token).then((res)=>{
                    console.log('Leo');
                    this.completeLendingCreateCampaign(res.data)
                }).catch(error =>{  
                    this.enableButton = false;
                    this.cleanLendingCreate();
                    Swal.fire({
                        title: 'Error',
                        type: 'error',
                        text: 'No se encontraron campañas activas'
                    })
                })
            }
        },
        setSelected(value) {
          this.lendingCreate.idAccount=value;  
        },
        
        saveLending(index){
            console.log('idClient: ' + this.lendingCreate.idClient);
            console.log('totalShares: ' +this.lendingCreate.totalShares);
            console.log('interestRate: ' +this.lendingCreate.interestRate);
            console.log('amount: ' +this.lendingCreate.amount);
            console.log('share: ' +this.lendingCreate.share);
            console.log('comision: ' + this.lendingCreate.commission)
            //Need to capture the idShareType and idAccount values
            //console.log('idAccount1: ' +this.accountsByClient[index].idAccount);
            //console.log('idAccount: ' + this.lendingCreate.idAccount);
            
            adminDA.createLending(this.lendingCreate.idClient,this.lendingCreate.totalShares,this.lendingCreate.amount,this.lendingCreate.interestRate,1,1,this.lendingCreate.share,this.lendingCreate.commission,this.token).then((res) =>{
                Swal.fire({
                    type: 'success',
                    title: 'Enhorabuena',
                    text: 'Préstamo creado satisfactoriamente'
                })
            }).catch(error =>{
                Swal.fire({
                    title : 'Error',
                    type : 'error',
                    text : 'Error al crear al préstamo'
                })
            })
        }
    },
    mounted(){
        document.getElementById('Lending').style.display = "block";
        document.getElementById('btnLending').classList.add('active');
        this.cleanLendingCreate();
        
    }
}
</script>