<template>
<div class="body">
    <div class="container">
        <div class="table-wrapper">
            <div class="table-title">
                <div class="row">
                    <div class="col-sm-6">
                    </div>
					<div class="col-sm-6">
                        <a id="createBtn" href="#deletePrestamoModal" class="btn btn-info" data-toggle="modal"><i id="createI" class="material-icons">&#xE147;</i> <span id="createSpan">Crear Préstamo</span></a>
					</div>
                </div>
            </div>
            <table class="table table-striped table-hover" id="mydatatable">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nombre Cliente</th>
                        <th>Número de cuotas</th>
                        <th>Monto</th>
						<th>Tipo cuota</th>
                        <th>Tasa interés</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(lending,index) in lendings" v-bind:key="index"><!--TODO-->
						<td>{{index + 1}}</td>
                        <td>{{lending.firstName + ' ' + lending.fatherLastname}}</td>
                        <td>{{lending.totalShares}}</td>
                        <td>{{lending.amount}}</td>
						<td v-if = "lending.idShareType==1">Ordinaria</td>
                        <td v-if = "lending.idShareType==2">Extraordinaria</td>
                        <td>{{lending.interestRate}}</td>
                        <td>
                            <a href="#editPrestamoModal" class="edit" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Editar">&#xE254;</i></a>
                            <a href="#deletePrestamoModal" class="delete" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Eliminar">&#xE872;</i></a>
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
        ...mapState(['lendings'])
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
        ...mapActions
    }
}
</script>

<style src="@/styles/CRUDLending.css" scoped>

</style>