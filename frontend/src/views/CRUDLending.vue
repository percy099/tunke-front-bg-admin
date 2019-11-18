<template>
<div class="body">
    <div class="container">
        <div class="table-wrapper">
            <h1>Préstamos</h1>
            <div class="table-title">
                <div class="row">
                    <div class="col-sm-6">
                    </div>
					<div class="col-sm-6">
                        <a id="createBtn" href="#addPrestamoModal" class="btn btn-info" data-toggle="modal"  @click=createLending()><i id="createI" class="material-icons">&#xE147;</i> <span id="createSpan">Crear Préstamo</span></a>
					</div>
                </div>
            </div>
            <table class="table table-striped table-hover" id="mydatatable">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nombre Cliente</th>
                        <th>Monto</th>
                        <th>Cuota</th>
                        <th>Núm. cuotas</th>
						<th>Tipo cuota</th>
                        <th>Tasa interés</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(lending,index) in lendings" v-bind:key="index"><!--TODO-->
						<td>{{index + 1}}</td>
                        <td>{{lending.fullName}}</td>
                        <td>{{lending.amount}}</td>
                        <td>{{lending.share}}</td>
                        <td>{{lending.totalShares}}</td>
						<td v-if = "lending.idShareType==1">Ordinaria</td>
                        <td v-if = "lending.idShareType==2">Extraordinaria</td>
                        <td>{{lending.interestRate}}%</td>
                        <td>
                            <a @click="viewLending(index)" href="#editPrestamoModal" class="edit" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Ver Detalle">&#xE254;</i></a>
                            <a @click="deleteClient(index)" href="#deletePrestamoModal" class="delete" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Eliminar">&#xE872;</i></a>
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

export default {
    computed:{
        ...mapState(['lendings','token',])
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
    methods :{
        ...mapActions(['setLendingIndex']),
        createLending(){
            this.$router.push('/createLending');
        },
        viewLending(index){
            this.$router.push('/viewLending');
            this.setLendingIndex(index);
            console.log(this.lendingCreate)
        },
         deleteLending(index){
            Swal.fire({
                title: '¿Está seguro que desea eliminar el préstamo del cliente ' + this.lendings[index].fullName + '?',
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, eliminar',
                cancelButtonText : 'Cancelar'
            }).then((result) =>{
                if(result.value){
                    adminDA.deleteLending(this.lendings[index].idLoan,this.token).then((res)=>{
                        Swal.fire({
                            text: 'Préstamo eliminado correctamente',
                            type: 'success'
                        })
                    }).catch(error=>{
                        Swal.fire({
                            title: 'Error',
                            text: 'Ocurrió un problema eliminando el préstamo',
                            type : 'error'
                        })
                    });
                }
            })
        }
    }
}
</script>

<style src="@/styles/CRUDLending.css" scoped>

</style>