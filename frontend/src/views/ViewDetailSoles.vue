<template>
<div class="body">
    <div class="container">
        <h2 class = "mb-4 mt-4">Transacciones Cuenta Soles</h2>
        <div class="table-wrapper">
            
            <table class="table table-striped table-hover" id="mydatatable">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Fecha</th>
                        <th>Monto</th>
                        <th>Cuenta Destino</th>
                        <!--<th>Acciones</th>-->
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(transaction,index) in transactionsSoles"  v-bind:key="index"><!--TODO-->
						<td>{{index + 1}}</td>
                        <td >{{transaction.datetime}}</td>
                        <td >{{transaction.amount}}</td>
                        <td style="width: 18em;">{{transaction.accountNumber}}</td>
                        <!--<td>
                            <a @click="viewLending(index)" href="#editPrestamoModal" class="edit" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Ver Detalle">&#xE254;</i></a>
                            <!--a @click="deleteClient(index)" href="#deletePrestamoModal" class="delete" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Eliminar">&#xE872;</i></a>-->
                        <!--</td>-->
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
import * as userDA from '@/dataAccess/userDA.js'
import * as adminDA from '@/dataAccess/adminDA.js'
import Swal from 'sweetalert2'
import ClientAccounts from "@/views/ClientAccounts.vue"
import { required, minLength, maxLength, numeric} from 'vuelidate/lib/validators'

export default {
    data(){
        return {dniClient : '',
                myDate : new Date().toISOString().slice(0,10) 
                };
    },
    computed:{
        ...mapState(['token','transactionsSoles'])
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
        ...mapActions(['setLendingIndex','completePersonCreate']),
        
    }
}
</script>

<style src="@/styles/CRUDLending.css" scoped>

</style>