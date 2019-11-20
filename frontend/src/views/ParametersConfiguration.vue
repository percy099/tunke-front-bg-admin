<template id='parConfig'>
    <div class="body">
    <div class="card mt-5 mb-5" id="body" style="width: 60%; margin: auto; background-color: #FAFAFA; padding: 20px;">
        <h2>Configuración de Parámetros</h2> 
        <h5>Editar parámetros de configuración</h5>     
        <div class="card-body">
            <form>
                <div class="form-group row">
                    <div class="col-md-7">
                        <label class="mt-3 ml-5">Máximo de envíos permitidos del token</label>
                        <label style="margin-right:5vh;" class="mt-4 ml-5">Máximo de movimientos</label>
                        <label style="margin-right:5vh;" class="mt-4 ml-5">Máximo de cuentas permitidas</label>
                        <label class="mt-3 ml-5">Mayoría de edad</label><br>
                        <label class="mt-3 ml-5">Porcentaje comisión</label>
                    </div>                    
                    <div class="col-md-5">
                        <input  v-model="parameterSetting.maxTokenSends" :disabled="disable" style="width:50%;" type="text" class="form-control mt-2 text-center">
                        <input  v-model="parameterSetting.maxDiaryMovements" :disabled="disable" style="width:50%;" type="text" class="form-control mt-2 text-center">
                        <input  v-model="parameterSetting.maxAccountsNumber" :disabled="disable" style="width:50%;" type="text" class="form-control mt-2  text-center">
                        <input  v-model="parameterSetting.legalAge" :disabled="disable" style="width:50%;" type="text" class="form-control mt-2 text-center">
                        <input  v-model="parameterSetting.commissionPercentage" :disabled="disable" style="width:50%;" type="text" class="form-control mt-2 text-center">
                    </div>                    
                </div>
            </form>
                <div class="d-flex justify-content-center mt-3">
                    <button class="btn mr-3" id="butt" @click=$router.go(-1)>Cancelar</button>
                    <button class="btn mr-3" @click="modify">Modificar</button>
                    <button class="btn mr-3" @click="save">Guardar</button>
                </div>           
        </div>
    </div>
    </div>
</template>

<script>
import router from "@/router.js";
import { mapState } from "vuex";
import Swal from 'sweetalert2';
import * as adminDA from '@/dataAccess/adminDA.js';

export default {
    data(){
        return{
            disable: true,
        }
    },
    computed:{
        ...mapState(['token','parameterSetting'])
        
    },
    methods:{
        modify(){
            this.disable = false;            
        },
        save(){
            adminDA.editParameters(this.parameterSetting.maxTokenSends,this.parameterSetting.maxDiaryMovements,this.parameterSetting.legalAge,this.parameterSetting.maxAccountsNumber,this.parameterSetting.commissionPercentage,this.token).then((res) =>{
                Swal.fire({
                    type: 'success',
                    title: 'Se ha guardado exitosamente',
                    showConfirmButton: false,
                    timer: 1500
                })
            }).catch(error =>{
                Swal.fire({
                    title : 'Error',
                    type : 'error',
                    text : 'Error al editar al cliente'
                })
            })
            this.disable = true;
        },
        /*editParameterSettings(){
            
        }*/
    }
}
</script>

<style src="@/styles/ParametersConfiguration.css" scoped>

</style>

