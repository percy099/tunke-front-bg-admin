<template>
<div class="body">
    <div class="container">
        <div class="table-wrapper">
            <div class="table-title">
                <div class="row">
                    <div class="col-sm-6">
                    </div>
					<div class="col-sm-6">                     
						<a id="createBtn" href="#addEmployeeModal" class="btn btn-info" data-toggle="modal" @click=createClient()><i id="createI" class="material-icons">&#xE147;</i> <span id="createSpan">Crear Cliente</span></a>					
					</div>
                </div>
            </div>
            <table class="table table-striped table-hover" id="mydatatable">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nombre</th>
                        <th>Correo electrónico</th>
						<th>Dirección</th>
                        <th>Número de Documento</th>
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(client,index) in clients" v-bind:key="index">
						<td>{{index + 1}}</td>
                        <td>{{client.firstName + ' ' + client.fatherLastname}}</td>
                        <td>{{client.email1}}</td>
						<td>{{client.address}}</td>
                        <td>{{client.documentNumber}}</td>
                        <td>
                            <a @click="editClient(index)" href="#editEmployeeModal" class="edit" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a>
                            <a @click="deleteClient(index)" href="#deleteEmployeeModal" class="delete" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>
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
        ...mapState(['clients','token'])
	},
	mounted(){
		$('#mydatatable').DataTable();
	},
	methods:{
        ...mapActions(['setActionClient','setClientIndex']),
        createAccount(){
            const { value: currency } = Swal.fire({
                title: 'Seleccionar moneda',
                input: 'radio',
                inputOptions: {
                    1 : 'Soles',
                    2 : 'Dólares'
                },
                showCancelButton: true,
                confirmButtonText: 'Crear Cuenta',
                inputValidator: (value) => {
                    if (!value) {
                    return 'Debes seleccionar una moneda'
                    }
                    adminDA.doCreateAccount(this.clientCreate.idPerson,value).then((res)=>{
                        Swal.fire({
                            type: 'success',
                            title: 'Enhorabuena',
                            text: 'Cuenta creada satisfactoriamente'
                        })
                    }).catch(error=>{
                        Swal.fire({
                            title: 'Error',
                            type: 'error',
                            text: 'Error al intentar crear la cuenta'
                        })
                    })
                }
            })
        }
	}
}
</script>