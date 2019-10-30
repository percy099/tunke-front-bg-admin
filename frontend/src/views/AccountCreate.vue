<template>
    <div class="container">
        <div>
            <h2>Creación de Cuenta</h2>
            <input v-model="dniPerson" placeholder="DNI" id="dniCreate" type="text" class="form-control d-inline">
            <button @click="getPersonCreate()" class="btn ml-3">Buscar Persona</button>
        </div>
        <!-- Tab links -->
        <div class="tab mt-4">
            <button id="btnPersonal" class="tablinks inactive" @click="openData('Personal')">Datos del Cliente</button>
            <button id="btnAccount" class="tablinks inactive" @click="openData('Account')">Datos de la Cuenta</button>
        </div>

        <!-- Tab content -->
        <div id="Personal" class="tabcontent">
            <div class="row mt-4">
                <div class="col-6">
                    <h6>Primer Nombre</h6>
                    <input v-model="accountCreate.firstName" type="text" class="form-control" disabled>
                    <h6 class="mt-3">Apellido Paterno</h6>
                    <input v-model="accountCreate.fatherLastname" type="text" class="form-control" disabled>
                    <div class="mt-3">
                        <span>Fecha de Nacimiento</span><input v-model="accountCreate.birthdate" class="ml-5" type="date" disabled>
                    </div>
                    <h6 class="mt-3">Dirección</h6>
                    <input v-model="accountCreate.address" id="inputDir" type="text" class="form-control mb-3" disabled>
                </div>
                <div class="col-6">
                    <h6>Segundo Nombre</h6>
                    <input v-model="accountCreate.middleName" type="text" class="form-control" disabled>
                    <h6 class="mt-3">Apellido Materno</h6>
                    <input v-model="accountCreate.motherLastname" type="text" class="form-control" disabled>
                    <h6 class="mt-3">Nacionalidad</h6>
                    <div>
                        <input v-model="accountCreate.nationality" type="text" class="form-control d-inline" disabled>
                        <img class="ml-3" v-bind:src="accountCreate.flag" height="30" width="auto">
                    </div>
                </div>
            </div>
        </div>

        <div id="Account" class="tabcontent">
            <div class="row mt-4">
                <div class="col-6">
                    <span class="mr-sm-6">
                        <input type="radio" @click="dolar = true" name="option1" value="option2"> Dólares
                    </span>
                </div>
                <div class="col-6">
                    <span class="mr-sm-6">
                        <input type="radio" @click="dolar = false" name="option1" value="option2"> Soles
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

export default {
    data(){
        return {
            dniPerson : '',
            enableButton : false,
            dolar : true
        };
    },
    computed :{
        ...mapState (['accountCreate']),
        isDisabled: function(){
    	    return !this.enableButton;
        }
    },
    methods:{
        ...mapActions (['completeAccountCreate','cleanAccountCreate']),
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
            userDA.getPersonData(this.dniPerson).then((res) =>{
                switch(res.data.type){
                    case 1:
                        this.completeAccountCreate(res.data);
                        this.enableButton = true;
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
        },
        saveAccount(){
            let currency = 1;
            if(this.dolar == true) currency = 2;
            adminDA.doCreateAccount(this.accountCreate.idPerson, currency).then((res) =>{
                alert('Cliente creado satisfactoriamente');
            }).catch(error =>{
                Swal.error({
                    title : 'Error',
                    type : 'error',
                    text : 'Error al crear la cuenta del cliente'
                })
            })
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