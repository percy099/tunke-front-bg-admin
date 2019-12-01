<template>
    <div class="body">
        <div class="container">
            <div class="table-wrapper">
                <h1>Cuentas registradas</h1>
                <h3>Cliente : {{clientCreate.firstName + ' ' + clientCreate.fatherLastname}}</h3>
                <div class="table-title">
                    <div class="row">
                        <div class="col-sm-6">
                        </div>
                        <div class="col-sm-6">                     
                            <a id="createBtn" href="#addEmployeeModal" class="btn btn-info" data-toggle="modal" @click="createAccount()"><i id="createI" class="material-icons">&#xE147;</i> <span id="createSpan">Crear Cuenta</span></a>					
                        </div>
                    </div>
                </div>
                <table class="table table-striped table-hover" id="mydatatable">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Número de Cuenta</th>
                            <th>Balance</th>
                            <th>Día de Apertura</th>
                            <th>Moneda</th>
                            <th>Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(account,index) in this.accountsByClient" v-bind:key="index">
                            <td>{{index + 1}}</td>
                            <td>{{account.accountNumber}}</td>
                            <td>{{account.balance}}</td>
                            <td>{{account.openingDate}}</td>
                            <td>{{account.currencyName}}</td>
                            <td>
                                <a @click="deleteAccount(index)" href="#deleteEmployeeModal" class="delete ml-3" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import * as adminDA from '@/dataAccess/adminDA.js'
import { mapState, mapActions } from 'vuex'
import Swal from 'sweetalert2'

export default {
    name : 'clientAccounts',
    methods:{
        ...mapActions(['fillAccountsByClient']),
        updatedClientsAccount: function() {
            adminDA.getAccountsByClient(this.clientCreate.idClient,this.token).then((res)=>{
                let accountsData = res.data;
                accountsData = accountsData.accounts;
                this.fillAccountsByClient(accountsData);
            }).catch(error=>{
                Swal.fire({
                    title :'Error',
                    type : 'error',
                    text : 'Error obteniendo las cuentas del cliente'
                })
            });
        },
        createAccount(){
            const { value: currency } = Swal.fire({
                title: 'Seleccionar moneda',
                input: 'radio',
                inputOptions: {
                    1 : 'Soles',
                    2 : 'Dólares'
                },
                showCancelButton: true,
                confirmButtonText: 'Crear Cuenta',
                inputValidator: (value) => {
                    if (!value) {
                    return 'Debes seleccionar una moneda'
                    }
                    adminDA.doCreateAccount(this.clientCreate.idPerson,value).then((res)=>{
                        this.updatedClientsAccount();
                        Swal.fire({
                            type: 'success',
                            title: 'Enhorabuena',
                            text: 'Cuenta creada satisfactoriamente'
                        })
                    }).catch(error=>{
                        Swal.fire({
                            title: 'Error',
                            type: 'error',
                            text: 'Error al intentar crear la cuenta'
                        })
                    })
                }
            })
        },
        deleteAccount(index){
            Swal.fire({
                title: '¿Está seguro que desea eliminar la cuenta?',
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, eliminar',
                cancelButtonText : 'Cancelar'
            }).then((result) =>{
                if(result.value){
                    adminDA.deleteAccount(this.accountsByClient[index].idAccount,this.token).then((res)=>{
                        console.log("update delete account");
                        this.updatedClientsAccount();
                        Swal.fire({
                            text: 'Cuenta eliminada correctamente',
                            type: 'success'
                        })
                    }).catch(error=>{
                        Swal.fire({
                            title: 'Error',
                            text: 'Ocurrió un problema eliminando la cuenta',
                            type : 'error'
                        })
                    });
                }
            })
        }
    },
    computed:{
        ...mapState(['token','clientCreate','accountsByClient'])
    },
    mounted(){
        $('#mydatatable').DataTable({
            "language" : {
                "sProcessing":     "Procesando...",
                "sLengthMenu":     "Mostrar _MENU_ registros",
                "sZeroRecords":    "No se encontraron resultados",
                "sEmptyTable":     "Ningún dato disponible en esta tabla",
                "sInfo":           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
                "sInfoEmpty":      "Mostrando registros del 0 al 0 de un total de 0 registros",
                "sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",
                "sInfoPostFix":    "",
                "sSearch":         "Buscar:",
                "sUrl":            "",
                "sInfoThousands":  ",",
                "sLoadingRecords": "Cargando...",
                "oPaginate": {
                    "sFirst":    "Primero",
                    "sLast":     "Último",
                    "sNext":     "Siguiente",
                    "sPrevious": "Anterior"
                }
            }
        });
        console.log("id cliente: " + this.clientCreate.idClient);
        this.updatedClientsAccount();
	},
}
</script>

<style src="@/styles/ClientAccounts.css" scoped>

</style>