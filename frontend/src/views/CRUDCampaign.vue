<template>
<div class="body">
    <div class="container">
        <div class="table-wrapper">
            <div class="table-title">
                <div class="row">
                    <div class="col-sm-6">
                    </div>
					<div class="col-sm-6">
                        <a id="createBtn" href="#deletePrestamoModal" class="btn btn-info" data-toggle="modal"><i id="createI" class="material-icons">&#xE147;</i> <span id="createSpan">Crear Campaña</span></a>
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
                        <th>Cuotas mínimas</th>
                        <th>Cuotas máximas</th>
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
                        <td>{{campaign.interestRate}}%</td>
                        <td>
                            <a @click="editCampaign(index)" href="#editCampaignModal" class="edit" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a>
                            <a href="#deleteCampaignModal" class="delete" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>
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
import Swal from 'sweetalert2'
import * as adminDA from '@/dataAccess/adminDA.js'


export default {
    computed:{
        ...mapState(['campaigns','token'])
	},
	mounted(){
		$('#mydatatable').DataTable();
    },

    methods:{
        ...mapActions(['setActionCampaign','setCampaingIndex']),
		createCampaign(){
            this.$router.push('/campaignCreate');
            this.setActionCampaign(false);
        },
        editCampaign(index){
            this.$router.push('/campaignCreate');
            this.setActionCampaign(true);
            this.setCampaingIndex(index);
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