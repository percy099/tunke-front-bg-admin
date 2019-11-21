<template>
    <div class="container">
        <div>
            <h2 class="mb-4 mt-4">Creación de Cuenta</h2>
            <div class="custom-cont">
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
                    <span class="mr-sm-6">
                        <input type="radio" @click="dolar = 2" name="option1" value="option2"> Dólares
                    </span>
                </div>
                <div class="col-6">
                    <span class="mr-sm-6">
                        <input type="radio" @click="dolar = 1" name="option1" value="option2"> Soles
                    </span>
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
            dolar : 0
        };
    },
    validations: {
        dniPerson: {
            required,
            minLength: minLength(8),
            maxLength: maxLength(8),
            numeric
        }
    },
    computed :{
        ...mapState (['accountCreate','person','parameterSetting']),
        isDisabled: function(){
            if(this.dolar != 0){
                this.enableButton = true;
            }
    	    return !this.enableButton;
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
                adminDA.doCreateAccount(this.accountCreate.idPerson, this.dolar, 2).then((res) =>{
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

    },
    mounted(){
        document.getElementById('Personal').style.display = "block";
        document.getElementById('btnPersonal').classList.add('active');
        this.cleanAccountCreate();
    },
    beforeMount(){
        this.cleanAccountCreate();
    }
}
</script>

<style src="@/styles/ClientCreate.css" scoped>