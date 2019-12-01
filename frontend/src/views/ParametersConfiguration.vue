<template id='parConfig'>
    <div class="body">
    <div class="card mt-5 mb-5" id="body" style="width: 60%; margin: auto; background-color: #FAFAFA; padding: 20px;">
        <h2>Configuración de Parámetros</h2> 
        <h5>Editar parámetros de configuración</h5>     
        <div class="card-body">
            <form>
                <div class="form-group row">
                    <div class="col-md-7">
                        <div>
                        <label class="mt-4 mb-3 ml-5">Máximo de envíos permitidos del token</label>
                        </div>
                        <div>
                        <label style="margin-right:5vh;" class="mt-4 mb-3 ml-5">Máximo de movimientos</label>
                        </div>
                        <div>
                        <label style="margin-right:5vh;" class="mt-4 mb-3 ml-5">Máximo de cuentas permitidas</label>
                        </div>
                        <div>
                        <label class="mt-4 mb-3 ml-5">Mayoría de edad</label>
                        </div>
                        <div>
                        <label class="mt-4 mb-3 ml-5">Porcentaje comisión</label>
                        </div>
                    </div>                    
                    <div class="col-md-5">
                        <div>
                            <input type="text" class="form-control mt-2 text-center" style="width:50%;" :disabled="disable"
                            v-model.trim="$v.maxTokenSends.$model" :class="{
                            'is-invalid' : $v.maxTokenSends.$error, 'is-valid':!$v.maxTokenSends.$invalid }">
                            <div class="valid-feedback">Valor Válido!</div>
                            <div class="invalid-feedback">
                                <span v-if="!$v.maxTokenSends.minValue">Debe ser de al menos {{
                                $v.maxTokenSends.$params.minValue.min}} </span>
                                <span v-if="!$v.maxTokenSends.maxValue">Debe ser a lo mucho de {{
                                $v.maxTokenSends.$params.maxValue.max}} </span>
                                <span v-if="!$v.maxTokenSends.numeric">Debe contener solo números. </span>
                                <span v-if="!$v.maxTokenSends.required">Monto Requerido. </span>
                            </div>
                        </div>
                        <div>
                            <input type="text" class="form-control mt-2 text-center" style="width:50%;" :disabled="disable"
                            v-model.trim="$v.maxDiaryMovements.$model" :class="{
                            'is-invalid' : $v.maxDiaryMovements.$error, 'is-valid':!$v.maxDiaryMovements.$invalid }">
                            <div class="valid-feedback">Valor Válido!</div>
                            <div class="invalid-feedback">
                                <span v-if="!$v.maxDiaryMovements.minValue">Debe ser de al menos {{
                                $v.maxDiaryMovements.$params.minValue.min}} </span>
                                <span v-if="!$v.maxDiaryMovements.maxValue">Debe ser a lo mucho de {{
                                $v.maxDiaryMovements.$params.maxValue.max}} </span>
                                <span v-if="!$v.maxDiaryMovements.numeric">Debe contener solo números. </span>
                                <span v-if="!$v.maxDiaryMovements.required">Monto Requerido. </span>
                            </div>
                        </div>
                        <div>
                            <input type="text" class="form-control mt-2 text-center" style="width:50%;" :disabled="disable"
                            v-model.trim="$v.maxAccountsNumber.$model" :class="{
                            'is-invalid' : $v.maxAccountsNumber.$error, 'is-valid':!$v.maxAccountsNumber.$invalid }">
                            <div class="valid-feedback">Valor Válido!</div>
                            <div class="invalid-feedback">
                                <span v-if="!$v.maxAccountsNumber.minValue">Debe ser de al menos {{
                                $v.maxAccountsNumber.$params.minValue.min}} </span>
                                <span v-if="!$v.maxAccountsNumber.maxValue">Debe ser a lo mucho de {{
                                $v.maxAccountsNumber.$params.maxValue.max}} </span>
                                <span v-if="!$v.maxAccountsNumber.numeric">Debe contener solo números. </span>
                                <span v-if="!$v.maxAccountsNumber.required">Monto Requerido. </span>
                            </div>
                        </div>
                        <div>
                            <input type="text" class="form-control mt-2 text-center" style="width:50%;" :disabled="disable"
                            v-model.trim="$v.legalAge.$model" :class="{
                            'is-invalid' : $v.legalAge.$error, 'is-valid':!$v.legalAge.$invalid }">
                            <div class="valid-feedback">Valor Válido!</div>
                            <div class="invalid-feedback">
                                <span v-if="!$v.legalAge.minValue">Debe ser de al menos {{
                                $v.legalAge.$params.minValue.min}} </span>
                                <span v-if="!$v.legalAge.maxValue">Debe ser a lo mucho de {{
                                $v.legalAge.$params.maxValue.max}} </span>
                                <span v-if="!$v.legalAge.numeric">Debe contener solo números. </span>
                                <span v-if="!$v.legalAge.required">Monto Requerido. </span>
                            </div>
                        </div>
                        <div>
                            <input type="text" class="form-control mt-2 mb-2 text-center" style="width:50%;" :disabled="disable"
                            v-model.trim="$v.commissionPercentage.$model" :class="{
                            'is-invalid' : $v.commissionPercentage.$error, 'is-valid':!$v.commissionPercentage.$invalid }">
                            <div class="valid-feedback">Valor Válido!</div>
                            <div class="invalid-feedback">
                                <span v-if="!$v.commissionPercentage.minValue">Debe ser de al menos {{
                                $v.commissionPercentage.$params.minValue.min}} </span>
                                <span v-if="!$v.commissionPercentage.maxValue">Debe ser a lo mucho de {{
                                $v.commissionPercentage.$params.maxValue.max}} </span>
                                <span v-if="!$v.commissionPercentage.required">Monto Requerido. </span>
                            </div>
                        </div>
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
import { required, minLength, maxLength, numeric, minValue, maxValue} from 'vuelidate/lib/validators';

export default {
    data(){
        return{
            disable: true,
            maxTokenSends: '',
            maxDiaryMovements: '',
            maxAccountsNumber: '',
            legalAge: '',
            commissionPercentage: ''
        }
    },
    validations:{   
        maxTokenSends: {
            required,
            minValue: minValue(1),
            maxValue: maxValue(50),
            numeric
        },
        maxDiaryMovements: {
            required,
            minValue: minValue(1),
            maxValue: maxValue(50),
            numeric
        },
        maxAccountsNumber: {
            required,
            minValue: minValue(1),
            maxValue: maxValue(1000),
            numeric
        },
        legalAge: {
            required,
            minValue: minValue(1),
            maxValue: maxValue(50),
            numeric
        },
        commissionPercentage: {
            required,
            minValue: minValue(0),
            maxValue: maxValue(1)
        },
    },
    computed:{
        ...mapState(['token','parameterSetting'])
        
    },
    methods:{
        modify(){
            this.disable = false;            
        },
        save(){
            adminDA.editParameters(this.maxTokenSends,this.maxDiaryMovements,this.legalAge,this.maxAccountsNumber,this.commissionPercentage,this.token).then((res) =>{
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
    },
    mounted(){
        this.maxTokenSends = this.parameterSetting.maxTokenSends;
        this.maxDiaryMovements = this.parameterSetting.maxDiaryMovements;
        this.maxAccountsNumber = this.parameterSetting.maxAccountsNumber;
        this.legalAge = this.parameterSetting.legalAge;
        this.commissionPercentage = this.parameterSetting.commissionPercentage;
    }
}
</script>

<style src="@/styles/ParametersConfiguration.css" scoped>

</style>


