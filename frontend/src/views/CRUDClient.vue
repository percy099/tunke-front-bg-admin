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
                        <th>Acciones</th>
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
                            <a @click="editClient(index)" href="#editEmployeeModal" class="edit" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Editar">&#xE254;</i></a>
                            <a @click="deleteClient(index)" href="#deleteEmployeeModal" class="delete" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Eliminar">&#xE872;</i></a>
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
import Swal from 'sweetalert2'
import * as adminDA from '@/dataAccess/adminDA.js'

export default {
    computed:{
        ...mapState(['clients','token'])
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
        },
        deleteClient(index){
            Swal.fire({
                title: '¿Está seguro que desea eliminar al cliente ' + this.clients[index].firstName + ' ' + this.clients[index].fatherLastname + '?',
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, eliminar',
                cancelButtonText : 'Cancelar'
            }).then((result) =>{
                if(result.value){
                    adminDA.deleteClient(this.clients[index].idClient,this.token).then((res)=>{
                        Swal.fire({
                            text: 'Cliente eliminado correctamente',
                            type: 'success'
                        })
                    }).catch(error=>{
                        Swal.fire({
                            title: 'Error',
                            text: 'Ocurrió un problema eliminando al cliente',
                            type : 'error'
                        })
                    });
                }
            })
        }
	}
}
</script>

<style src="@/styles/CRUDClient.css" scoped>

</style>