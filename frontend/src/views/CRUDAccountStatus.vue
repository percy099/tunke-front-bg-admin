<template>
    <div class="container">
        <h2 class = "mb-4 mt-4">Estado de Cuenta</h2>
       
        <!-- Tab links -->
        <div class="tab">
        <button id="btnBankAccount" class="tablinks inactive" @click="openData('BankAccount')">Banco Tunke</button>
        
        </div>

        <!-- Tab content -->
        <div id="BankAccount" class="tabcontent">
            <div class="row mt-4">
                <div class="col-5 groupLeftPersonal">
                    <h6 >Cuenta Soles</h6>
                    <input v-model="bankAccounts[0].accountNumber"  type="text" class="form-control" style="width:12em;" disabled>
                    <h6 class="mt-3">Cuenta Dólares</h6>
                    <input v-model="bankAccounts[1].accountNumber"  type="text" class="form-control mb-5" style="width:12em;" disabled>
                </div>
                <div class="col-4 groupCenterPersonal">
                    <h6 class="mr-3">Importe Actual</h6>
                    <input v-model="bankAccounts[0].balance"  type="text" class="form-control" style="width:12em;" disabled>
                    
                    <h6 class="mt-3 mr-3">Importe Actual</h6>
                    <input v-model="bankAccounts[1].balance"  type="text" class="form-control mb-5" style="width:12em;" disabled>
                    
                </div>
                <div class="col groupRightPersonal">
                    <a id="createBtn" href="#viewDetailSoles" class="btn btn-info mt-3" style="height:3em; width:10em;" data-toggle="modal"  @click=viewDetailSoles()><i id="createI" class="material-icons">&#xE147;</i> <span id="createSpan">Ver Detalle</span></a>
                    <br><a id="createBtn" href="#viewDetailDollar" class="btn btn-info" style="height:3em; width:10em; margin-top:2em;" data-toggle="modal"  @click=viewDetailDollar()><i id="createI" class="material-icons">&#xE147;</i> <span id="createSpan">Ver Detalle</span></a>
                </div>
            </div>
        </div>
        <div class="Chart">
        <br><h6 style="text-align:center;">Saldo disponible en las cuentas del Banco - {{ value1 }}</h6>
        <bank-account-soles/>          
        </div>  
      <div class="d-flex justify-content-center mt-3">
            <button class="btn mr-3" id="butt" @click=$router.go(-1)>Volver</button>
      </div>
    
    </div>
</template>

<style src="@/styles/ClientCreate.css" scoped>

</style>

<script>
import { mapState, mapActions } from 'vuex';
import * as userDA from '@/dataAccess/userDA.js'
import * as adminDA from '@/dataAccess/adminDA.js'
import Swal from 'sweetalert2'
import ClientAccounts from "@/views/ClientAccounts.vue"
import BankAccountSoles from '@/util/BankAccountSoles';
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';

export default {
    components: {
        BankAccountSoles
    },
    data () {
      return {
        dataPoints: null,
        height: 20,
        value1: '2019',
        value2: ''
      }
    },
    computed :{
        ...mapState (['bankAccounts','token','transactions','transactionsSoles','transactionsDollar'])
    },
    methods:{
      ...mapActions ([]),
        openData :function(dataType) {
          // Declare all variables
          var i, tabcontent, tablinks, btn,buttons;
          switch(dataType){
              case 'BankAccount':
                  btn = 'btnBankAccount';
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
      
      viewDetailSoles(){
          this.$router.push('/viewDetailSoles');
      },
      viewDetailDollar(){
          this.$router.push('/viewDetailDollar');
      }
    },
    mounted(){
        document.getElementById('BankAccount').style.display = "block";
    }
}
</script>