<template>
<div class="body">
    <div class="container">
        <div class="table-wrapper">
            <h1>Campañas</h1>
            <div class="table-title">
                <div class="row">
                    <div class="col-sm-6">
                    </div>
					<div class="col-sm-6">
                        <a @click="createCampaign()" id="createBtn" href="#deletePrestamoModal" class="btn btn-info" data-toggle="modal"><i id="createI" class="material-icons">&#xE147;</i> <span id="createSpan">Crear Campaña</span></a>
					</div>
                </div>
            </div>
            <table class="table table-striped table-hover" id="mydatatable">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nombre</th>
                        <th>Fecha inicio</th>
						<th>Fecha fin</th>
                        <th>Plazo mín</th>
                        <th>Plazo máx</th>
                        <th>Tasa de interés</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(campaign,index) in campaigns" v-bind:key="index"><!--TODO-->
						<td>{{index + 1}}</td>
                        <td>{{campaign.name}}</td>
                        <!--<td>{{campaign.month}}</td>-->
						<td class="space_2">{{campaign.startDate}}</td>
                        <td class="space_2">{{campaign.endDate}}</td>
                        <td class="space">{{campaign.minimumPeriod}}</td>
                        <td class="space">{{campaign.maximumPeriod}}</td>
                        <td class="space">{{campaign.interestRate}}%</td>
                        <td class="space_2">
                            <a @click="viewCampaign(index)" href="#editCampaignModal" class="edit" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Visualizar">&#xE880;</i></a>
                            <a @click="editCampaign(index)" href="#editCampaignModal" class="edit" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Editar">&#xE254;</i></a>
                            <a @click="deleteCampaign(index)" href="#deleteCampaignModal" class="delete" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Eliminar">&#xE872;</i></a>
                            <a @click="viewLeads(index)" href="#deleteCampaignModal" class="delete" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Leads">&#xE873;</i></a>
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
        ...mapState(['campaigns','token'])
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
        ...mapActions(['setActionCampaign','setCampaignIndex','cleanCampaignCreate','fillLeadsByCampaing']),
        viewCampaign(index){
            this.$router.push('/campaignCreate');
            this.setActionCampaign(0);
            this.setCampaignIndex(index);
        },
        viewLeads(index){
            this.$router.push('/viewLeads');
            this.setCampaignIndex(index);
            adminDA.getLeadsByCampaign(this.campaigns[index].idCampaign,this.token).then((res)=>{
                this.fillLeadsByCampaing(res.data.leads)
            }).catch(error=>{
                Swal.fire({
                    title: 'Error',
                    text: 'Ocurrió un problema eliminando a la campaña',
                    type : 'error'
                })
            });
        },
		createCampaign(){
            this.$router.push('/campaignOptions');
            this.setActionCampaign(1);
            this.cleanCampaignCreate();
        },
        editCampaign(index){
            this.$router.push('/campaignCreate');
            this.setActionCampaign(2);
            this.setCampaignIndex(index);
        },
        deleteCampaign(index){
            Swal.fire({
                title: '¿Está seguro que desea eliminar esta campaña ' + this.campaigns[index].name + '?',
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, eliminar',
                cancelButtonText : 'Cancelar'
            }).then((result) =>{
                if(result.value){
                    adminDA.deleteCampaign(this.campaigns[index].idCampaign,this.token).then((res)=>{
                        Swal.fire({
                            text: 'Campaña eliminada correctamente',
                            type: 'success'
                        })
                    }).catch(error=>{
                        Swal.fire({
                            title: 'Error',
                            text: 'Ocurrió un problema eliminando a la campaña',
                            type : 'error'
                        })
                    });
                }
            })
        }
	}

}
</script>

<style src="@/styles/CRUDCampaign.css" scoped>

</style>