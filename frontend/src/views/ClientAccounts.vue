<template>
    <div class="body">
        <div class="container">
            <div class="table-wrapper">
                <h1>Cuentas de {{clientCreate.firstName + ' ' + clientCreate.fatherLastname}}</h1>
                <div class="table-title">
                    <div class="row">
                        <div class="col-sm-6">
                            <div class="search-box">
                                <div class="input-group">
                                    <span class="input-group-addon"><i class="material-icons">&#xE8B6;</i></span>
                                    <input type="text" class="form-control" placeholder="Ingrese un campo a buscar">
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-6">                     
                            <a id="createBtn" href="#addEmployeeModal" class="btn btn-info" data-toggle="modal" @click=createClient()><i id="createI" class="material-icons">&#xE147;</i> <span id="createSpan">Crear Cuenta</span></a>					
                        </div>
                    </div>
                </div>
                <table class="table table-striped table-hover" id="mydatatable">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Número de Cuenta</th>
                            <th>Balance</th>
                            <th>Número de Tarjeta</th>
                            <th>Moneda</th>
                            <th>Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(account,index) in accounts" v-bind:key="index">
                            <td>{{index + 1}}</td>
                            <td>{{account.accountNumber}}</td>
                            <td>{{account.balance}}</td>
                            <td>{{account.cardNumber}}</td>
                            <td>{{account.currency}}</td>
                            <td>
                                <a @click="editClient(index)" href="#editEmployeeModal" class="edit" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a>
                                <a href="#deleteEmployeeModal" class="delete" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>
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
import { mapState } from 'vuex'
import Swal from 'sweetalert2'

export default {
    name : 'ClientAccounts',
    computed:{
        ...mapState(['token','clientCreate'])
    },
    data(){
        return {
            accounts : [
                {accountNumber : '1234' , balance : 200 , cardNumber : '1410', currency : 'Soles'},
                {accountNumber : '5234' , balance : 50 , cardNumber : '1491', currency : 'Soles'},
                {accountNumber : '1134' , balance : 600 , cardNumber : '1215', currency : 'Dólares'},
                {accountNumber : '1274' , balance : 900 , cardNumber : '1465', currency : 'Soles'}
            ]
        }
    },
    beforeMount(){
        /*adminDA.getAccountsByClient($route.params.idPerson,this.token).then((res)=>{
            accountsData = res.data;
            for(let i=0;i<accountsData.length;i++){
                //TODO PUSH ACCOUNTS
            }
        }).catch(error =>{
            Swal.fire({
            title: 'Error',
            type: 'error',
            text: 'Error obteniendo las cuentas del cliente'
            })
        })*/
    },
    mounted(){
        $('#mydatatable').DataTable();
	},
}
</script>

<style src="@/styles/ClientAccounts.css" scoped>

</style>