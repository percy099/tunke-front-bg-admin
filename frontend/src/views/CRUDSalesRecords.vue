<template>
<div class="body">
    <div class="container">
        <div class="table-wrapper">
            <div class="table-title">
            </div>
            <table class="table table-striped table-hover" id="mydatatable">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nombre Cliente</th>
                        <th>Producto</th>
						<th>Fecha Solicitud</th>
                        <th>Origen</th>
                        <th>Estado</th>
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(salesRecord,index) in salesRecords" v-bind:key="index"><!--TODO-->
						<td>{{index + 1}}</td>
                        <td>{{salesRecord.firstName + ' ' + salesRecord.fatherLastname}}</td>
                        <td>{{salesRecord.productName}}</td>
						<td>{{salesRecord.requestDate}}</td>
                        <td>{{salesRecord.origin}}</td>
                        <td>{{salesRecord.nameRecordStatus}}</td>
                        <td>
                            <a @click="viewSalesRecord(index)" href="#verExpedienteModal" class="delete" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE880;</i></a>
                            <a v-if="salesRecord.productName == 'Prestamo' && salesRecord.nameRecordStatus == 'En proceso'" @click="editSalesRecord(index)" href="#editarExpedienteModal" class="delete" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE254;</i></a>
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
import * as adminDA from '@/dataAccess/adminDA.js'
import Swal from 'sweetalert2'

export default {
    computed:{
        ...mapState(['salesRecords','token','salesRecordCreate'])
    },
    methods :{
        ...mapActions(['setSalesRecordIndex']),
        viewSalesRecord(index){
            this.$router.push('/viewSaleRecord');
            this.setSalesRecordIndex(index);
            console.log(this.salesRecordCreate)
        },
        editSalesRecord(index){
            this.setSalesRecordIndex(index);
            const { value: currency } = Swal.fire({
                title: 'Seleccionar estado',
                input: 'radio',
                inputOptions: {
                    1 : 'Aprobado',
                    2 : 'Desaprobado',
                },
                showCancelButton: true,
                confirmButtonText: 'Cambiar Estado',
                inputValidator: (value) => {
                    if (!value) {
                    return 'Debes seleccionar un estado'
                    }
                    console.log(this.salesRecordCreate.idSalesRecord)
                    adminDA.doEditSalesRecord(this.salesRecordCreate.idSalesRecord,parseInt(value), this.token).then((res)=>{
                        Swal.fire({
                            type: 'success',
                            title: 'Enhorabuena',
                            text: 'Expediente editado correctamente'
                        })
                    }).catch(error=>{
                        Swal.fire({
                            title: 'Error',
                            type: 'error',
                            text: error
                        })
                    })
                }
            })
        }
    },
    mounted(){
		$('#mydatatable').DataTable();
	}
}
</script>

<style src="@/styles/CRUDClient.css" scoped>

</style>