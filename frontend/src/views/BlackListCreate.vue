<template>
    <div class="container" id="bl">
        <h2 class="mt-3">Añadir Personas a la BlackList</h2>
        <div class="row" id="row1">
            <div class="col-4"></div>
            <div class="col-2">
                <h3>DNI/Carnet de Extranjeria</h3>
            </div>
            <div class="col-6">
                <input type="text" class="form-control" v-model="dni">
            </div>
        </div>
        <div class="row mt-4">
            <div class="col-4"></div>
            <div class="col-2">
                <h3>Motivo</h3>
            </div>
            <div class="col-6">
                <input type="text" class="form-control" v-model="reason">
            </div>
        </div>
        <div class="row mt-5">
            <div class="col-5"> 
                <button class="btn text-white p-2" @click="$router.go(-1)">Regresar</button>
            </div>
            <div class="col-5">
                <button class="btn text-white p-2" id="btnAdd" @click="createBlackList">Añadir</button>
            </div>
        </div>
    </div>
</template>

<style scoped src="@/styles/BlackListCreate.css">
    
</style>

<script>

import * as adminDA from '@/dataAccess/adminDA.js'
import { mapState } from 'vuex'
import Swal from 'sweetalert2'

export default {
    data(){
        return {
            dni :'',
            reason : ''
        }
    },
    computed:{
        ...mapState(['token'])
    },
    methods:{
        createBlackList(){
            adminDA.createBlacklist(this.token,this.dni,this.reason).then((res)=>{
                Swal.fire({
                    type : 'success',
                    text : 'Añadido a la Blacklist correctamente'
                });
                this.$router.push('/home');
            }).catch(error=>{
                Swal.fire({
                    title : 'Error',
                    type : 'error',
                    text : error
                });
            });
        }
    }
}
</script>