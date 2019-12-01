<template>
<div class="body">
    <div class="container">
        <div class="table-wrapper">
            <h1>Cuentas de Ahorro</h1>
            <div class="table-title">
                <div class="row">
                    <div class="col-sm-6">
                    </div>
					<div class="col-sm-6">
                        <a id="createBtn" href="#deletePrestamoModal" class="btn btn-info" data-toggle="modal" @click="createAccount()"><i id="createI" class="material-icons">&#xE147;</i> <span id="createSpan">Crear Cuenta</span></a>
					</div>
                </div>
            </div>
            <table class="table table-striped table-hover" id="mydatatable">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nombre Cliente</th>
                        <th>Numero Cuenta</th>
						<th>Balance</th>
                        <th>Día de Apertura</th>
                        <th>Moneda</th>
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(account,index) in accounts" v-bind:key="index"><!--TODO-->
						<td>{{index + 1}}</td>
                        <td>{{account.firstName + ' ' + account.fatherLastname}}</td>
                        <td>{{account.accountNumber}}</td>
						<td>{{account.currencySymbol + ' ' + account.balance}}</td>
                        <td>{{account.openingDate}}</td>
                        <td>{{account.currencyName}}</td>
                        <td>
                            <a @click="deleteAccount(index)" href="#deletePrestamoModal" class="delete" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Eliminar">&#xE872;</i></a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="d-flex justify-content-center mt-3">
            <button class="btn mr-3" id="butt" @click=$router.go(-1)>Volver</button>
        </div>
    </div>
</div>
</template>


<script>
import {mapState, mapActions} from 'vuex'
import * as adminDA from '@/dataAccess/adminDA.js'
import * as userDA from '@/dataAccess/userDA.js'
import Swal from 'sweetalert2'

export default {
    computed:{
        ...mapState(['accounts','token'])
    },
    methods :{
        ...mapActions(['cleanAccountCreate','completeAccounts']),
        updatedAllAccounts: function() {
            userDA.getAllAccounts(this.token).then((res) =>{
                console.log("update accounts");
                this.completeAccounts(res.data);
            }).catch(error =>{
                Swal.fire({
                    title: 'Error',
                    type: 'error',
                    text: 'Error obteniendo las cuentas'
                })
            });
        },
        createAccount(){
            this.cleanAccountCreate();
            this.$router.push('/accountCreate');
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
                    adminDA.deleteAccount(this.accounts[index].idAccount,this.token).then((res)=>{
                        this.updatedAllAccounts();
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
    mounted(){
		$('#mydatatable').DataTable({
            "language" : {
                "sProcessing":     "Procesando...",
                "sLengthMenu":     "Mostrar _MENU_ registros",
                "sZeroRecords":    "No se encontraron resultados",
                "sEmptyTable":     "Ningún dato disponible en esta tabla =(",
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
        this.updatedAllAccounts();
	}
}
</script>

<style src="@/styles/CRUDClient.css" scoped>

</style>