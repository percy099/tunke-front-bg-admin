<template>
    <div class="container">
        <div>
            <h2 v-if="editCampaign == 0" class="mb-4 mt-4">Visualizar Campaña</h2>
            <h2 v-if="editCampaign == 1" class="mb-4 mt-4">Crear Campaña</h2>
            <h2 v-if="editCampaign == 2" class="mb-4 mt-4">Editar Campaña</h2>
        </div>
        <!-- Tab links -->
        <div class="tab">
            <button id="btnCampaign" class="tablinks inactive" @click="openData('Campaign')">Datos de la Campaña</button>
        </div>

        <!-- Tab content -->
        <div id="Campaign" class="tabcontent">
            <div class="row mt-4">
                <div v-if="editCampaign == 0" class="col-6 groupLeftPersonal">
                    <h6>Nombre Campaña</h6>
                    <input v-model="campaignCreate.name" type="text" class="form-control" disabled>
                    <h6 class="mt-3">Fecha de creación</h6>
                    <input v-model="campaignCreate.creationDate" type="date" class="form-control" disabled>
                    <h6 class="mt-3">Fecha de cierre</h6>
                    <input v-model="campaignCreate.endDate" type="date" class="form-control mb-3" disabled>
                    <!--<h6 class="mt-3">Préstamo Rango</h6>
                    <input v-model="campaignCreate.loanRange" type="text" class="form-control" disabled>
                    <h6 class="mt-3">Tasa de interés</h6>
                    <input v-model="campaignCreate.interestRate" type="text" class="form-control mb-5" disabled>-->
                </div>
                <div v-if="editCampaign == 0" class="col-6 groupRightPersonal">
                    <h6>Mes activo</h6>
                    <input v-model="campaignCreate.month" type="text" class="form-control" disabled>
                    <h6 class="mt-3">Fecha de inicio</h6>
                    <input v-model="campaignCreate.startDate" type="date" class="form-control" disabled>
                    <h6 class="mt-3">Tipo de moneda</h6>
                    <input v-if = "campaignCreate.idCurrency==1" placeholder="Soles" type="text" class="form-control mb-5" disabled>
                     <input v-if = "campaignCreate.idCurrency==2"  placeholder="Dólares"  type="text" class="form-control mb-5" disabled>
                    <!--<h6 class="mt-3">Rango de meses</h6>
                    <input v-model="campaignCreate.periodRange" type="text" class="form-control" disabled>
                    <h6 class="mt-3">Campaña activa</h6>
                    <input v-model="campaignCreate.active" type="text" class="form-control mb-5" disabled>-->
                </div>
                <div v-if="editCampaign == 1" class="col-6 groupLeftPersonal">
                    <h6>Nombre Campaña</h6>
                    <input type="text" class="form-control"
                    v-model.trim="$v.name.$model" :class="{
                    'is-invalid' : $v.name.$error, 'is-valid':!$v.name.$invalid }">
                    <div class="valid-feedback">Nombre Válido!</div>
                    <div class="invalid-feedback">
                        <span v-if="!$v.name.required">Nombre Requerido. </span>
                    </div>
                    <h6 class="mt-3">Moneda</h6>
                    <select v-model="selectCurrency" style="height:2.3em; width:21em;" class="mb-4">
                        <option v-for="optionCurrency in optionsCurrency" v-bind:value="optionCurrency.value">
                            {{ optionCurrency.text }}
                        </option>
                    </select>
                    <!--<h6 class="mt-3">Monto mínimo</h6>
                    <input v-model="campaignCreate.minimumLoan" type="text" class="form-control">
                    <h6 class="mt-3">Periodo mínimo</h6>
                    <input v-model="campaignCreate.minimumPeriod" type="text" class="form-control">
                    <h6 class="mt-3">Tasa de interés</h6>
                    <input v-model="campaignCreate.interestRate" type="text" class="form-control mb-5">-->
                </div>
                <div v-if="editCampaign == 1" class="col-6 groupRightPersonal">
                    <h6>Mes activo</h6>
                    <input v-model="dateAux" type="month" class="form-control">
                    <!--<h6 class="mt-3">Fecha Fin</h6>
                    <input v-model="dateAux" type="month" class="form-control">
                    <h6 class="mt-3">Monto máximo</h6>
                    <input v-model="campaignCreate.maximumLoan" type="text" class="form-control">
                    <h6 class="mt-3">Periodo máximo</h6>
                    <input v-model="campaignCreate.maximumPeriod" type="text" class="form-control">-->
                    
                </div>
                <div v-if="editCampaign == 2" class="col-6 groupLeftPersonal">
                    <h6>Nombre Campaña</h6>
                    <input type="text" class="form-control"
                    v-model.trim="$v.name.$model" :class="{
                    'is-invalid' : $v.name.$error, 'is-valid':!$v.name.$invalid }">
                    <div class="valid-feedback">Nombre Válido!</div>
                    <div class="invalid-feedback">
                        <span v-if="!$v.name.required">Nombre Requerido. </span>
                    </div>
                    <h6 class="mt-3">Fecha de creación</h6>
                    <input v-model="campaignCreate.creationDate" type="date" class="form-control mb-5" disabled>
                    <!--<h6 class="mt-3">Moneda</h6>
                    <select v-model="selectCurrency" style="height:2.3em; width:21em;" class="mb-4">
                        <option v-for="optionCurrency in optionsCurrency" v-bind:value="optionCurrency.value">
                            {{ optionCurrency.text }}
                        </option>
                    </select>-->
                    <!--<h6 class="mt-3">Monto mínimo</h6>
                    <input v-model="campaignCreate.minimumLoan" type="text" class="form-control">
                    <h6 class="mt-3">Plazo mínimo</h6>
                    <input v-model="campaignCreate.minimumPeriod" type="text" class="form-control">-->
                </div>
                <div v-if="editCampaign == 2" class="col-6 groupRightPersonal">
                    <h6>Mes activo</h6>
                    <input v-model="campaignCreate.month" type="text" class="form-control" disabled>
                    <!--<h6>Tasa de interés</h6>
                    <input v-model="campaignCreate.interestRate" type="text" class="form-control">
                    <h6 class="mt-3">Monto Máximo</h6>
                    <input v-model="campaignCreate.maximumLoan" type="text" class="form-control">
                    <h6 class="mt-3">Plazo máximo</h6>
                    <input v-model="campaignCreate.maximumPeriod" type="text" class="form-control mb-5">-->
                </div>
            </div>
        </div>

        <div class="d-flex justify-content-center mt-3">
            <button class="btn mr-3" @click=$router.go(-1)>Volver</button>
             <button v-if="this.editCampaign == 1" @click="saveCampaign()" class="btn ml-5">Guardar</button>
             <button v-if="this.editCampaign == 2" @click="editCampaigns()" class="btn ml-5">Editar</button>
        </div>
    </div>
</template>

<style src="@/styles/CampainCreate.css" scoped>

</style>

<script>
import { mapState, mapActions } from 'vuex';
import * as userDA from '@/dataAccess/userDA.js'
import Swal from 'sweetalert2'
import ClientAccounts from "@/views/ClientAccounts.vue"
import * as adminDA from '@/dataAccess/adminDA.js'
import { required, minLength, maxLength, numeric, email} from 'vuelidate/lib/validators'

export default {
    components:{
        ClientAccounts
    },
    data(){
        return {
            enableButton : false,
            dateAux : '',
            selectCurrency : 1,
            optionsCurrency: [
                { text: 'Soles', value: 1 },
                { text: 'Dólares', value: 2 }
            ],
            name : ''
        };
    },
    validations: {
        name: {
            required
        }
    },
    computed :{
        ...mapState (['token','campaignCreate','editCampaign','prueba']),
    },
    methods:{
        ...mapActions (['setPrueba']),
       /* ...mapActions(['']),*/
         openData :function(dataType) {
            // Declare all variables
            var i, tabcontent, tablinks, btn,buttons;
            switch(dataType){
                case 'Campaign':
                    btn = 'btnCampaign';
                break ;
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

        saveCampaign(){
            this.$v.name.$touch();
            if (this.$v.name.$invalid) {
            } else {
                this.campaignCreate.startDate = this.dateAux.substring(0,4) + '-' + this.dateAux.substring(5,7) + '-01';
                console.log(this.campaignCreate.startDate);
                var flag;
                if(this.dateAux.substring(5,6) == '0'){
                    var monthAux = this.dateAux.substring(6,7);
                    flag = true;
                } else {
                    var monthAux = this.dateAux.substring(5,7);
                    flag = false;
                }
                var month = new Array();
                month[0] = "Enero";
                month[1] = "Febrero";
                month[2] = "Marzo";
                month[3] = "Abril";
                month[4] = "Mayo";
                month[5] = "Junio";
                month[6] = "Julio";
                month[7] = "Agosto";
                month[8] = "Setiembre";
                month[9] = "Octubre";
                month[10] = "Noviembre";
                month[11] = "Diciembre";
                this.campaignCreate.month = month[monthAux - 1];
                console.log(this.campaignCreate.month);
                var maxDay = new Array();
                maxDay[0] = "31";
                maxDay[1] = "28";
                maxDay[2] = "31";
                maxDay[3] = "30";
                maxDay[4] = "31";
                maxDay[5] = "30";
                maxDay[6] = "31";
                maxDay[7] = "31";
                maxDay[8] = "30";
                maxDay[9] = "31";
                maxDay[10] = "30";
                maxDay[11] = "31";
                maxDay[12] = "29"; 
                
                if(parseInt(this.dateAux.substring(0,4)) % 4 == 0 && parseInt(monthAux) == 2){
                    if(flag){
                        this.campaignCreate.endDate = this.dateAux.substring(0,4) + '-0' + monthAux + '-' + maxDay[12];
                    } else {
                        this.campaignCreate.endDate = this.dateAux.substring(0,4) + '-' + monthAux + '-' + maxDay[12];
                    }
                } else {
                    if(flag){
                        this.campaignCreate.endDate = this.dateAux.substring(0,4) + '-0' + monthAux + '-' + maxDay[monthAux - 1];
                    } else {
                        this.campaignCreate.endDate = this.dateAux.substring(0,4) + '-' + monthAux + '-' + maxDay[monthAux - 1];
                    }
                }
                console.log(this.campaignCreate.endDate);
                
                adminDA.createCampaign(this.name,this.campaignCreate.month,
                this.campaignCreate.startDate,this.campaignCreate.endDate,/*this.campaignCreate.minimumLoan, this.campaignCreate.maximumLoan,
                this.campaignCreate.minimumPeriod, this.campaignCreate.maximumPeriod, this.campaignCreate.interestRate,*/ this.selectCurrency, this.token).then((res) =>{
                    Swal.fire({
                        type: 'success',
                        title: 'Enhorabuena',
                        text: 'Campaña creada satisfactoriamente'
                    })
                }).catch(error =>{
                    Swal.fire({
                        title : 'Error',
                        type : 'error',
                        text : 'Error al crear la campaña'
                    })
                })
            }
            
            
        },
        
        editCampaigns(){
            this.$v.name.$touch();
            if (this.$v.name.$invalid) {
            } else {
                adminDA.editCampaign(this.campaignCreate.idCampaign,this.name,this.campaignCreate.month,
                this.campaignCreate.startDate,this.campaignCreate.endDate,/*this.campaignCreate.minimumLoan, this.campaignCreate.maximumLoan,
                this.campaignCreate.minimumPeriod, this.campaignCreate.maximumPeriod, this.campaignCreate.interestRate,*/ this.selectCurrency, this.token).then((res) =>{
                    Swal.fire({
                        type: 'success',
                        title: 'Enhorabuena',
                        text: 'Campaña editada satisfactoriamente'
                    })
                }).catch(error =>{
                    Swal.fire({
                        title : 'Error',
                        type : 'error',
                        text : 'Error al editar la campaña'
                    })
                })
            }
        }
    },
    mounted(){
        document.getElementById('Campaign').style.display = "block";
        document.getElementById('btnCampaign').classList.add('active');
        if(this.editCampaign == 2){
            this.name = this.campaignCreate.name;
        }
    },
    updated(){
        if(this.campaignCreate.name == "" || this.campaignCreate.maximumLoan == "" || this.campaignCreate.minimumLoan == ""){
            this.setPrueba(false)
            console.log(this.prueba)
        } else {
            this.setPrueba(true)
            console.log(this.prueba)
        }
    }
}
</script>