<template>
    <div id="bl" class="container">
        <h2 class="mt-3">Añadir Leads</h2>
        <div class="row">
            <div class="col-1"></div>
            <div class="col-5">
                <button class="mt-5 ml-5 btn text-white p-3" @click="$router.push('/massiveChargeLeads')">Carga masiva de leads</button>
            </div>
            <div class="col-1"></div>
            <div class="col-5">
                <button class="mt-5 ml-5 btn text-white p-3" @click="$router.push('/leadCreate')">Ingresar DNI del Cliente</button>
            </div>
        </div>
        <button class="btn text-white p-2" id="btnBack" @click="$router.go(-1)">Regresar</button>
    </div>
</template>

<style src="@/styles/BlackListOptions.css" scoped>

</style>