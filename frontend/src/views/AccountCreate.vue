<template>
    <div class="container">
        <div>
            <h2 class="mb-4 mt-4">Creación de Cuenta</h2>
            <div class="custom-cont">
                <div>
                    <input  :placeholder='name' id="dniCreate" 
                    type="text" class="form-control d-inline" :disabled='isDisabled2' @keypress="isNumber($event)" :maxlength="maxLNumber" :minlength="minLNumber"
                    v-model.trim="$v.dniPerson.$model" :class="{
                    'is-invalid' : $v.dniPerson.$error, 'is-valid' : !$v.dniPerson.$invalid }">
                    <div v-if="selectedTypeDoc.value == 1" class="valid-feedback">Dni Válido</div>
                    <div v-if="selectedTypeDoc.value == 2" class="valid-feedback">Carnet de Extranjería Válido</div>
                    <div class="invalid-feedback">
                        <span v-if="!$v.dniPerson.required && selectedTypeDoc.value == 1">Dni Requerido. </span>
                        <span v-if="!$v.dniPerson.required && selectedTypeDoc.value == 2">Carnet de Extranjería Requerido. </span>
                        <span v-if="!$v.dniPerson.minLength">Debe ser de al menos de {{
                            $v.dniPerson.$params.minLength.min}} dígitos </span>
                        <span v-if="!$v.dniPerson.maxLength">Debe ser de al menos de {{
                            $v.dniPerson.$params.maxLength.max}} dígitos </span>
                        <span v-if="!$v.dniPerson.numeric">Debe contener solo números. </span>
                    </div>
                </div>
                <div>  
                    <v-select class="ml-3" placeholder=" Tipo de documento" v-model="selectedTypeDoc" :required="!selectedTypeDoc" :options="optionsDoc"  label="text" @input="iterator"/>
                </div>
                <div>
                    <button @click="getPersonCreate()" class="btn ml-3" id="btnEditAccounts">Buscar Persona</button>
                </div>
            </div>
        </div>
        <!-- Tab links -->
        <div class="tab">
            <button id="btnPersonal" class="tablinks inactive" @click="openData('Personal')">Datos del Cliente</button>
            <button id="btnAccount" class="tablinks inactive" @click="openData('Account')">Datos de la Cuenta</button>
        </div>

        <!-- Tab content -->
        <div id="Personal" class="tabcontent">
            <div class="row mt-4">
                <div class="col-6">
                    <h6>Primer Nombre</h6>
                    <input v-model="accountCreate.firstName" type="text" class="form-control" disabled>
                    <h6 class="mt-3">Apellido Paterno </h6>
                    <input v-model="accountCreate.fatherLastname" type="text" class="form-control" disabled>
                    <div class="mt-3">
                        <span>Fecha de Nacimiento</span><input v-model="accountCreate.birthdate" class="ml-5" type="date" disabled>
                    </div>
                    <h6 class="mt-3">Dirección</h6>
                    <input v-model="accountCreate.address" id="inputDir" type="text" class="form-control mb-3" disabled>
                </div>
                <div class="col-6">
                    <h6>Segundo Nombre</h6>
                    <input v-model="accountCreate.middleName" id="right1" type="text" class="form-control" disabled>
                    <h6 class="mt-3">Apellido Materno</h6>
                    <input v-model="accountCreate.motherLastname" id="right2" type="text" class="form-control" disabled>
                    <h6 class="mt-3">Nacionalidad</h6>
                    <div>
                        <input v-model="accountCreate.nationality" id="right3" type="text" class="form-control d-inline" disabled>
                        <img class="ml-3" v-bind:src="accountCreate.flag" height="30" width="auto">
                    </div>
                </div>
            </div>
        </div>

        <div id="Account" class="tabcontent">
            <div class="row mt-4">
                <div class="col-6">
                    <h6 class="ml-3 mb-4">Tipo de Moneda</h6>
                    <div class="ml-5">
                        <span class="mr-sm-6">
                            <input type="radio" @click="dolar = 2" name="option1" value="option2"> Dólares
                        </span>
                        <span class="mr-sm-6 ml-5">
                            <input type="radio" @click="dolar = 1" name="option1" value="option2"> Soles
                        </span>
                    </div>
                    <div class="mt-3">
                    </div>
                </div>
                <div class="col-6">
                    <h6 class="ml-3 mb-3">Tipo de Cuenta</h6>
                    <div>
                        <select v-model="selectType" style="height:2.3em; width:21em;" class="mb-4 ml-5">
                            <option v-for="optionType in optionsType" v-bind:value="optionType.value">
                                {{ optionType.text }}
                            </option>
                        </select>
                    </div>
                </div>
            </div>
        </div>

        <div class="d-flex justify-content-center mt-3">
            <button class="btn mr-3" @click=$router.go(-1)>Cancelar</button>
            <button :disabled='isDisabled' @click="saveAccount()" class="btn ml-5">Guardar</button>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import * as userDA from '@/dataAccess/userDA.js'
import * as adminDA from '@/dataAccess/adminDA.js'
import Swal from 'sweetalert2'
import { required, minLength, maxLength, numeric} from 'vuelidate/lib/validators'

export default {
    data(){
        return {
            dniPerson : '',
            enableButton : false,
            enableButton2 : false,
            dolar : 0,
            optionsType: [
                { text: 'Simple', value: 1 },
                { text: 'Sueldo', value: 2 },
                { text: 'Fantasy', value: 3}
            ],
            optionsDoc: [
                { text: 'DNI', value: 1 },
                { text: 'Carnet de Extranjería', value: 2 }
            ],
            selectType: 1,
            selectedTypeDoc: false,
            minLNumber: 0,
            maxLNumber: 0,
            name: ""
        };
    },
    validations() {
        return {
            dniPerson: {
                required, 
                minLength: minLength(this.minLNumber),
                maxLength: maxLength(this.maxLNumber),
                numeric
            }
        }
    },
    computed :{
        ...mapState (['accountCreate','person','parameterSetting']),
        isDisabled: function(){
            if(this.dolar != 0){
                this.enableButton = true;
            }
    	    return !this.enableButton;
        },
        isDisabled2: function(){
            if(this.selectedTypeDoc){
                this.enableButton2 = true;
            }
    	      return !this.enableButton2;
        }
    },
    methods:{
        ...mapActions (['completeAccountCreate','cleanAccountCreate','fillPer']),
        openData :function(dataType) {
            // Declare all variables
            var i, tabcontent, tablinks, btn,buttons;
            switch(dataType){
                case 'Personal':
                    btn = 'btnPersonal';
                break ;

                case 'Account':
                    btn = 'btnAccount';
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
        isNumber: function(evt) {
            evt = (evt) ? evt : window.event;
            var charCode = (evt.which) ? evt.which : evt.keyCode;
            if (charCode < 48 || charCode > 57) {
              evt.preventDefault();;
            } else {
              return true;
            }

        },
        getPersonCreate(){
            this.$v.$touch();
            if (this.$v.$invalid) {
            } else {
                userDA.getPersonData(this.dniPerson).then((res) =>{
                    switch(res.data.type){
                        case 1:
                            this.completeAccountCreate(res.data);
                            //this.enableButton = true;
                            let person_data = res.data;
                            console.log(person_data);
                            this.fillPer(person_data);
                        break;
                        case 2:
                            Swal.fire({
                                title : 'Error',
                                type : 'error',
                                text : 'Esta persona no es Cliente'
                            });
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
                    this.cleanAccountCreate();
                    Swal.fire({
                        title: 'Error',
                        type: 'error',
                        text: 'No se encontraron registros de la persona con DNI ' + this.dniPerson
                    })
                })
            }
        },
        saveAccount(){
            if(this.person.totalAccounts+1<=this.parameterSetting.maxAccountsNumber){
                console.log(this.selectType);
                
                adminDA.doCreateAccount(this.accountCreate.idPerson, this.dolar, 2, this.selectType).then((res) =>{
                    let response_create = res.data;
                    console.log("response open account",response_create);
                    this.$emit('close');
                    Swal.fire({
                        type: 'success',
                        title: 'Enhorabuena',
                        text: 'Cuenta creada satisfactoriamente'
                    })
                }).catch(error =>{
                    Swal.error({
                        title : 'Error',
                        type : 'error',
                        text : 'Error al crear la cuenta del cliente'
                    })
                })
            }else{
                Swal.fire({
                    title: 'Se superó el límite de cuentas abiertas',
                    type: 'error',
                    text: 'Estimado cliente, usted ya cuenta con muchas cuentas abiertas en Tunke.'
                })
            }
            
            
        },
        iterator: function(){
            let a;
            for(let i = 0; i < 10000; i++){
                a = 10;
                if(i == 1000){
                }
            }
        }

    },
    mounted(){
        document.getElementById('Personal').style.display = "block";
        document.getElementById('btnPersonal').classList.add('active');
        this.cleanAccountCreate();
    },
    beforeMount(){
        this.cleanAccountCreate();
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
        this.iterator();
        console.log(this.$v.dniPerson.$invalid);
        console.log(this.$v.dniPerson.$params.minLength.min);
        console.log(this.selectedTypeDoc.value);
    }
}
</script>

<style src="@/styles/ClientCreate.css" scoped>