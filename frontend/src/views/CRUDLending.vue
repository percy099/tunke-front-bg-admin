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
                        <td>{{lending.feesNumber}}</td>
                        <td>{{lending.amount}}</td>
						<td>{{lending.feeType}}</td>
                        <td>{{lending.interestRate}}</td>
                        <td>
                            <a href="#editPrestamoModal" class="edit" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a>
                            <a href="#deletePrestamoModal" class="delete" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>
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
		$('#mydatatable').DataTable();
    },
    methods :{
        ...mapActions
    }
}
</script>

<style src="@/styles/CRUDLending.css" scoped>

</style>