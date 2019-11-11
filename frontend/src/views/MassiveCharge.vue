<template>
    <div id="bl" class="container">
        <h2 class="mt-3">Añadir Personas a la BlackList</h2>
        <div class="row">
            <div class="col-4"></div>
            <div class="col-8">
                <input class="mt-5" @change="uploadFile" type="file" id="fileUploader" name="fileUploader" accept=".xls, .xlsx"> <br>
                <button class="btn text-white p-2 mt-3 ml-4" :disabled='isDisabled' @click="chargeFile">Subir archivo</button>
            </div>
        </div>
        <div class="row mt-3">
            <div class="col-4"></div>
            <div class="col-3">

            </div>
        </div>  
        <button class="btn text-white p-2" id="btnBack" @click="$router.go(-1)">Regresar</button>      
    </div>
</template>

<script>

import XLSX from 'xlsx'
import * as adminDA from '@/dataAccess/adminDA.js'
import Swal from 'sweetalert2'
import { mapState } from 'vuex';

export default {
    data(){
        return {
            newBlackListClients : [],
            enableButton : false
        };
    },
    computed:{
        ...mapState(['token']),
        isDisabled: function(){
    	    return !this.enableButton;
        }
    },
    methods:{
        uploadFile(e){
            var files = e.target.files;
            var f = files[0];
            var reader = new FileReader();
            let a = this.enableButton;
            var vm = this;
            reader.onload = function(e){
                var data = new Uint8Array(e.target.result);
                var workbook = XLSX.read(data,{
                type : 'array'
                });
                let sheetName = workbook.SheetNames[0];
                let worksheet = workbook.Sheets[sheetName];
                vm.newBlackListClients = XLSX.utils.sheet_to_json(worksheet);
            }
            reader.readAsArrayBuffer(f);
            this.enableButton = true;
      },
      chargeFile(){
          adminDA.chargeBlackList(this.token,this.newBlackListClients).then((res)=>{
              Swal.fire({
                  type : 'success',
                  text : 'Clientes cargados correctamente'
              });
              this.$router.push('/home');
          }).catch(error=>{
              Swal.fire({
                  title : 'Error',
                  type : 'error',
                  text : 'Ocurrió un error cargando el archivo'
              });
          });
      }
    }
}
</script>

<style src="@/styles/MassiveCharge.css" scoped>

</style>