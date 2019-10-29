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
                        <td>{{account.name}}</td>
                        <td>{{account.number}}</td>
						<td>{{account.balance}}</td>
                        <td>{{account.openingDate}}</td>
                        <td>{{account.type}}</td>
                        <td>
                            <a href="#editPrestamoModal" class="edit" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a>
                            <a href="#deletePrestamoModal" class="delete" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>
</template>


<script>
import {mapState} from 'vuex'

export default {
    computed:{
        ...mapState([''])
    },
    data(){
        return {
            accounts : [
                {name : 'Jaime Checa' , number : 'DFGC-1234-DF45-DF09' , balance : '1410', openingDate : '19/08/2018', type : 'Soles'},
                {name : 'Leonella Huayta' , number : 'DFGC-1234-DF45-DF09' , balance : '2000', openingDate : '18/12/2017', type : 'Soles'},
                {name : 'Percy Quezada' , number : 'DFGC-1234-DF45-DF09' , balance : '3000', openingDate : '19/03/2016', type : 'Dólares'},
                {name : 'Solange Palomino' , number : 'DFGC-1234-DF45-DF09' , balance : '1223', openingDate : '19/01/1989', type : 'Soles'},
                {name : 'Ronaldo Tunque' , number : 'DFGC-1234-DF45-DF09' , balance : '9237', openingDate : '19/10/2012', type : 'Dolares'},
            ]

        }
    },
    methods :{
        createAccount(){
            this.$router.push('/accountCreate');
        }
    },
    mounted(){
		$('#mydatatable').DataTable();
	}
}
</script>

<style src="@/styles/CRUDClient.css" scoped>

</style>