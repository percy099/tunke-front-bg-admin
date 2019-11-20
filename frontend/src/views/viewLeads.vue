<template>
<div class="body">
    <div class="container">
        <div class="table-wrapper">
            <h1>Leads </h1>
            <div class="table-title">
                <div class="row">
                    <div class="col-sm-6">
                    </div>
					<div class="col-sm-6">
                        <a id="createBtn" href="#addPrestamoModal" class="btn btn-info" data-toggle="modal"  @click=createLead()><i id="createI" class="material-icons">&#xE147;</i> <span id="createSpan">Crear Lead</span></a>
					</div>
                </div>
            </div>
            <table class="table table-striped table-hover" id="mydatatable">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nombre Cliente</th>
                        <th>Numero Documento</th>
						<th>Mínimo Monto</th>
                        <th>Máximo Monto</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(lead,index) in leadsByCampaign" v-bind:key="index"><!--TODO-->
						<td>{{index + 1}}</td>
                        <td>{{lead.firstName + ' ' + lead.fatherLastname}}</td>
                        <td>{{lead.documentNumber}}</td>
						<td>{{lead.minimumLoan}}</td>
                        <td>{{lead.maximumLoan}}</td>
                        <td>
                            <a @click="viewLead(index)" href="#verExpedienteModal" class="delete" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Visualizar">&#xE880;</i></a>
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
import * as adminDA from '@/dataAccess/adminDA.js'
import Swal from 'sweetalert2'

export default {
    computed:{
        ...mapState(['leadsByCampaign','token','editLead'])
    },
    methods :{
        ...mapActions(['setSalesRecordIndex','setActionLead','setLeadIndex']),
        viewLead(index){
            this.$router.push('/leadCreate');
            this.setActionLead(0);
            this.setLeadIndex(index);
        },
        createLead(){
            this.$router.push('/leadCreate');
            this.setActionLead(1);
        },
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
	}
}
</script>

<style src="@/styles/CRUDClient.css" scoped>

</style>