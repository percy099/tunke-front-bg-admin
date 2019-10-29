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
                        <tr v-for="(account,index) in accounts" v-bind:key="index">
                            <td>{{index + 1}}</td>
                            <td>{{account.accountNumber}}</td>
                            <td>{{account.balance}}</td>
                            <td>{{account.openingDate}}</td>
                            <td>{{account.currencyName}}</td>
                            <td>
                                <a href="#deleteEmployeeModal" class="delete ml-3" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>
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
    methods:{
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
        }
    },
    computed:{
        ...mapState(['token','clientCreate'])
    },
    data(){
        return {
            accounts : []
        }
    },
    beforeMount(){
        adminDA.getAccountsByClient(this.clientCreate.idClient,this.token).then((res)=>{
            let accountsData = res.data;
            accountsData = accountsData.accounts;
            this.accounts = [];
            for(let i=0;i<accountsData.length;i++){
                //TODO PUSH ACCOUNTS
                this.accounts.push({
                    idAccount: accountsData[i].idAccount,
                    accountNumber : accountsData[i].accountNumber,
                    balance: accountsData[i].balance,
                    openingDate: accountsData[i].openingDate,
                    closingDate: accountsData[i].closingDate,
                    cardNumber: accountsData[i].cardNumber,
                    idAccountType: accountsData[i].idAccountType,
                    idProduct: accountsData[i].idProduct,
                    idCurrency : accountsData[i].idCurrency,
                    idClient: accountsData[i].idClient,
                    currencyName : accountsData[i].currencyName
                });
            }
        }).catch(error =>{
            Swal.fire({
            title: 'Error',
            type: 'error',
            text: 'Error obteniendo las cuentas del cliente'
            })
        })
    },
    mounted(){
        $('#mydatatable').DataTable();
	},
}
</script>

<style src="@/styles/ClientAccounts.css" scoped>

</style>