<template>
    <div id="bl" class="container">
        <h2 class="mt-3">Añadir Campañas</h2>
        <div class="row">
            <div class="col-1"></div>
            <div class="col-5">
                <button class="mt-5 ml-5 btn text-white p-3" @click="$router.push('/massiveChargeCampaign')">Carga masiva de datos</button>
            </div>
            <div class="col-1"></div>
            <div class="col-5">
                <button class="mt-5 ml-5 btn text-white p-3" @click="createCampaign">Crear una campaña</button>
            </div>
        </div>
        <button class="btn text-white p-2" id="btnBack" @click="$router.go(-1)">Regresar</button>
    </div>
</template>

<style src="@/styles/CampaignOptions.css" scoped>

</style>

<script>
import { mapActions } from 'vuex';
export default {
    methods:{
        ...mapActions(['setActionCampaign','setCampaignIndex','cleanCampaignCreate']),
        createCampaign(){
            this.$router.push('/campaignCreate');
            this.setActionCampaign(1);
            this.cleanCampaignCreate();
        }
    }
}
</script>