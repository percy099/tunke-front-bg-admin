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
                        <th>Plazo mínimo</th>
                        <th>Plazo máximo</th>
                        <th>Tasa de interés</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(campaign,index) in campaigns" v-bind:key="index"><!--TODO-->
						<td>{{index + 1}}</td>
                        <td>{{campaign.name}}</td>
                        <td>{{campaign.month}}</td>
						<td>{{campaign.startDate}}</td>
                        <td>{{campaign.endDate}}</td>
                        <td>{{campaign.minTerm}}</td>
                        <td>{{campaign.maxTerm}}</td>
                        <td>{{campaign.interestRate}}</td>
                        <td>
                            <a href="#editCampaignModal" class="edit" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a>
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
import {mapState} from 'vuex'

export default {
    computed:{
        ...mapState(['campaigns'])
	},
	mounted(){
		$('#mydatatable').DataTable();
	}
}
</script>

<style src="@/styles/CRUDCampaign.css" scoped>

</style>