<template>
<div class="body">
    <div class="container">
        <div class="table-wrapper">
            <h1>Clientes Especiales</h1>
            <div class="table-title">
                <div class="row">
                    <div class="col-sm-6">
                    </div>
					<div class="col-sm-6">     
                        <a id="createBtn" href="#addEmployeeModal" class="btn btn-info" data-toggle="modal" @click="$router.push('/massiveCharge')"><i id="createI" class="material-icons">&#xE147;</i> <span id="createSpan">Carga masiva de datos</span></a>		                
						<!--<a id="createBtn" href="#addEmployeeModal" class="btn btn-info" data-toggle="modal" @click="$router.push('/blackListCreate')"><i id="createI" class="material-icons">&#xE147;</i> <span id="createSpan">Añadir Cliente Especial</span></a>-->					
					</div>
                </div>
            </div>
            <table class="table table-striped table-hover" id="mydatatable">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nombre</th>
                        <th>Tipo de Documento</th>
                        <th>Número de Documento</th>
                        <th>Razón</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(client,index) in clientsBlackList" v-bind:key="index">
						<td>{{index + 1}}</td>
                        <td>{{client.firstName + ' ' + client.fatherLastname}}</td>
                        <td>{{client.documentType}}</td>
                        <td>{{client.documentNumber}}</td>
                        <td>{{client.reason}}</td>
                        <td>
                            <a @click="viewBlackList(index)" href="#editEmployeeModal" class="edit" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Visualizar">&#xE880;</i></a>
                            <!--<a @click="deleteClient(index)" href="#deleteEmployeeModal" class="delete" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Eliminar">&#xE872;</i></a>-->
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
import * as userDA from '@/dataAccess/userDA.js'

export default {
    computed:{
        ...mapState(['clients','token','clientsBlackList','blackListCreate'])
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
        this.updatedClientsBlackList();
	},
	methods:{
        ...mapActions(['setActionClient','setClientIndex','completeClientsBlackList','setBlackListIndex']),
        updatedClientsBlackList: function() {
            userDA.getAllClientsBlackList(this.token).then((res) =>{
                console.log("update Clients BlackList");
                this.completeClientsBlackList(res.data);
            }).catch(error =>{
                Swal.fire({
                    title: 'Error',
                    type: 'error',
                    text: 'Error obteniendo los clientes especiales'
                })
            });
        },
        viewBlackList(index){
            this.$router.push('/viewDetailBlackList');
            this.setBlackListIndex(index);
        },
        /*deleteClientBlackList(index){
            Swal.fire({
                title: '¿Está seguro que desea eliminar al cliente especial' + this.clientsBlackList[index].firstName + ' ' + this.clientsBlackList[index].fatherLastname + '?',
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, eliminar',
                cancelButtonText : 'Cancelar'
            }).then((result) =>{
                if(result.value){
                    adminDA.deleteClientBlackList(this.clientsBlackList[index].idPerson,this.token).then((res)=>{
                        this.updatedClientsBlackList();
                        Swal.fire({
                            text: 'Cliente especial eliminado correctamente',
                            type: 'success'
                        })
                    }).catch(error=>{
                        Swal.fire({
                            title: 'Error',
                            text: 'Ocurrió un problema eliminando al cliente especial',
                            type : 'error'
                        })
                    });
                }
            })
        }*/
	}
}
</script>

<style src="@/styles/CRUDBlackList.css" scoped>

</style>