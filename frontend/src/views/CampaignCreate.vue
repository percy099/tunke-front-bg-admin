<template>
    <div class="container">
            <h2 class = "mb-4 mt-4" v-if="!editCampaign">Creación de Campaña</h2>
            <div v-else class="mt-5">
                <h2 class = "mb-4 mt-4">Edición de Campaña</h2>
            </div>
            <!-- Tab links -->
            <div class="tab">
            <button id="btnCampaign" class="tablinks inactive" @click="openData('Campaign')">Datos de la Campaña</button>
            </div>

        
            <!-- Tab content -->
            <div id="Campaign" class="tabcontent">
                <div class="row mt-4">
                    <div class="col-6 groupLeftPersonal">
                        <h6>Nombre Campaña</h6>
                    
                        <h6 class="mt-3">Fecha Inicio</h6>
                    
                        <h6 class="mt-3">Fecha Fin</h6>
                    
                    </div>
                    <div class="col-6 groupRightPersonal">
                        <h6>Nombre Cliente</h6>
                    
                        <h6 class="mt-3">Fecha Inicio</h6>
                    
                        <h6 class="mt-3">Fecha Fin</h6>
                    
                    </div>
                </div>
            </div>

        <div class="d-flex justify-content-center mt-3">
            <button class="btn mr-3" @click=$router.go(-1)>Volver</button>
             <button @click="saveCampaign()" class="btn ml-5">Guardar</button>
        </div>
    </div>
</template>

<style src="@/styles/ClientCreate.css" scoped>

</style>

<script>
import { mapState, mapActions } from 'vuex';
import * as userDA from '@/dataAccess/userDA.js'
import Swal from 'sweetalert2'
import ClientAccounts from "@/views/ClientAccounts.vue"

export default {
    components:{
        ClientAccounts
    },
    data(){
        return {
            enableButton : false,
        };
    },
    computed :{
        ...mapState (['token','editCampaign']),
    },
    methods:{
        ...mapActions(['']),
         openData :function(dataType) {
            // Declare all variables
            var i, tabcontent, tablinks, btn,buttons;
            switch(dataType){
                case 'Campaign':
                    btn = 'btnCampaign';
                break ;
            }
            // Get all elements with class="tabcontent" and hide them
            tabcontent = document.getElementsByClassName("tabcontent");
            for (i = 0; i < tabcontent.length; i++) {
                tabcontent[i].style.display = "none";
            }

            // Get all elements with class="tablinks" and remove the class "active"
            tablinks = document.getElementsByClassName("tablinks");
            for (i = 0; i < tablinks.length; i++) {
                tablinks[i].className = tablinks[i].className.replace(" active", "");
            }

            // Show the current tab, and add an "active" class to the button that opened the tab
            document.getElementById(dataType).style.display = "block";
            document.getElementById(btn).classList.add('active');
        },
        
        saveCampaign(){
            adminDA.editCampaign(this.clientCreate.idPerson,this.clientCreate.email1,this.clientCreate.email2,this.clientCreate.cellphone1,this.clientCreate.cellphone2,this.token).then((res) =>{
                Swal.fire({
                    type: 'success',
                    title: 'Enhorabuena',
                    text: 'Campaña editada exitosamente'
                })
            }).catch(error =>{
                Swal.fire({
                    title : 'Error',
                    type : 'error',
                    text : 'Error al editar la Campaña'
                })
            })
        },
        
    },
    mounted(){
        document.getElementById('Campaign').style.display = "block";
        document.getElementById('btnCampaign').classList.add('active');
    },
}
</script>