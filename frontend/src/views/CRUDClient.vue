<template>
<div class="body">
    <div class="container">
        <div class="table-wrapper">
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
                        <th>Teléfono</th>
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(person,index) in persons" v-bind:key="index">
						<td>{{index + 1}}</td>
                        <td>{{person.firstName + ' ' + person.fatherLastname}}</td>
                        <td>{{person.email1}}</td>
						<td>{{person.address}}</td>
                        <td>{{person.documentNumber}}</td>
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
        ...mapState(['persons'])
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