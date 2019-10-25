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
                        <a href="#deleteEmployeeModal" class="btn btn-info" data-toggle="modal"><i class="material-icons">&#xE15C;</i> <span>Eliminar</span></a>
                        <a href="#editEmployeeModal" class="btn btn-info" data-toggle="modal"><i class="material-icons">&#xE3C9;</i> <span>Editar</span></a>                        
						<a href="#addEmployeeModal" class="btn btn-info" data-toggle="modal" @click=createClient()><i class="material-icons">&#xE147;</i> <span>Crear</span></a>					
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
                        <td>{{person.firstName}}</td>
                        <td>{{person.email1}}</td>
						<td>{{person.address}}</td>
                        <td>{{person.documentNumber}}</td>
                        <td>
                            <a href="#editEmployeeModal" class="edit" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a>
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
import {mapState} from 'vuex'

export default {
    computed:{
        ...mapState(['persons'])
	},
	mounted(){
		$('#mydatatable').DataTable();
	},
	methods:{
		createClient(){
			this.$router.push('/clientCreate');
		}
	}
}
</script>

<style src="@/styles/CRUDClient.css" scoped>

</style>