<template>
<div class="body">
    <div class="container">
        <div class="table-wrapper">
            <div class="table-title">
                <div class="row">
                    <div class="col-sm-6">
                    </div>
					<div class="col-sm-6">                     
						<a id="createBtn" href="#addEmployeeModal" class="btn btn-info" data-toggle="modal" @click=createClient()><i id="createI" class="material-icons">&#xE147;</i> <span id="createSpan">Crear Cliente</span></a>					
					</div>
                </div>
            </div>
            <table class="table table-striped table-hover" id="mydatatable">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nombre</th>
                        <th>Correo electrónico</th>
						<th>Dirección</th>
                        <th>Número de Documento</th>
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(client,index) in clients" v-bind:key="index">
						<td>{{index + 1}}</td>
                        <td>{{client.firstName + ' ' + client.fatherLastname}}</td>
                        <td>{{client.email1}}</td>
						<td>{{client.address}}</td>
                        <td>{{client.documentNumber}}</td>
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
import {mapState, mapActions} from 'vuex'

export default {
    computed:{
        ...mapState(['clients'])
	},
	mounted(){
		$('#mydatatable').DataTable();
	},
	methods:{
        ...mapActions(['setActionClient','setClientIndex']),
		createClient(){
            this.$router.push('/clientCreate');
            this.setActionClient(false);
        },
        editClient(index){
            this.$router.push('/clientCreate');
            this.setActionClient(true);
            this.setClientIndex(index);
        }
	}
}
</script>

<style src="@/styles/CRUDClient.css" scoped>

</style>