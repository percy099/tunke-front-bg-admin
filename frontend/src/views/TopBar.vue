<template>
    <div class="cont">
        <div class="item1">
            <div class ="brand-image">
                <img src="@/images/logo_verde.png" height="140">
            </div>
        </div>
        <div class="item2">
            <img src="@/images/cara_feliz.png" height="80" width="90" class="center">
            <h6 id="img-down">Banca de Negocios</h6>
        </div>
        <div class="item3">
            <h3 id="name">Jaime Checa</h3>
            <h5>20151047</h5>
            <button class="button" @click="logOff()">Salir</button>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
    methods :{
        ...mapActions(['setLoginEntry']),
        logOff(){
            this.setLoginEntry(false);
            this.$router.push('/');
        }
    }
}
</script>

<style src="@/styles/TopBar.css" scoped>