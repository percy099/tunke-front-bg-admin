<template>
<div class="body">
    <div class="container">
        <div class="table-wrapper">
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
                            <a @click="deleteAccount(index)" href="#deletePrestamoModal" class="delete" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>
</template>


<script>
import {mapState, mapActions} from 'vuex'
import * as adminDA from '@/dataAccess/adminDA.js'
import Swal from 'sweetalert2'

export default {
    computed:{
        ...mapState(['accounts','token'])
    },
    methods :{
        ...mapActions(['cleanAccountCreate']),
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
		$('#mydatatable').DataTable();
	}
}
</script>

<style src="@/styles/CRUDClient.css" scoped>

</style>