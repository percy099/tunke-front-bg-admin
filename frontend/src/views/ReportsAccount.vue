<template>
  <div class="container">    
    <h1 class="text-center">Reporte de Cuentas</h1>
    <div class="row">      
      <div class="col-md-6">
        <label class="mr-1 ml-5">Seleccione año: </label>
        <date-picker class="mt-5" v-model="value1" value-type="format" type="year" format="YYYY" placeholder="Seleccione año"></date-picker>        
        <button class="ml-3 mt-3 btn" v-promise-btn @click="getDataNumMonth()">Aceptar</button>        
        <div class="Chart">
          <h3 class="text-center" >{{ chart1 }}</h3>
          <line-chart :chart-data="dataNumMonth"></line-chart>
        </div>
      </div>
      <div class="col-md-6">
        <div class="row">
          <div class="col">
            <label for="FormControlSelect1" class="mt-2">Seleccione tipo de cuenta</label>            
          </div>
          <div class="col">            
            <select class="form-control" id="FormControlSelect1" v-model="value2_2" style="width:26vh;height:5vh;">
              <option>Cuenta Simple</option>
              <option>Cuenta Sueldo</option>
              <option>Cuenta Fantasy</option>
            </select>            
          </div>
        </div>
        <div class="row">
          <div class="col">            
            <label class="">Seleccione año: </label>
            <date-picker style="width:12vh;" class="mt-2 ml-3" v-model="value2" value-type="format" type="year" format="YYYY" placeholder="Año"></date-picker>
          </div>
          <div class="col">
            <button class="ml-3 mt-2 btn" v-promise-btn @click="getDataAccountTypeMonth()">Aceptar</button>
          </div>
        </div>                    
        <div class="Chart">
          <h3 class="text-center">{{ chart2 }}</h3>
          <line-chart :chart-data="dataAccountTypeMonth"></line-chart>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6">
        <label class="mr-1 ml-5">Seleccione año: </label>
        <date-picker class="mt-5" v-model="value3" value-type="format" type="year" format="YYYY" placeholder="Seleccione año"></date-picker>
        <button class="ml-3 mt-3 btn" v-promise-btn @click="getDataBalanceMonth()">Aceptar</button>
        <div class="Chart">
          <h3 class="text-center" >{{ chart3 }}</h3>
          <line-chart :chart-data="dataBalanceMonth"></line-chart>
        </div>
      </div>       
    </div>
    <div class="row">
      <button class="btn" @click="back()">Volver</button>
      <button class="btn" @click="exportPDF">Generar Reporte</button>
    </div>    
  </div>
</template>

<script>
  /* Ronaldo */
  import LineChart from '@/util/LineChart.js'
  import DatePicker from 'vue2-datepicker';
  import 'vue2-datepicker/index.css';
  import {mapState, mapActions} from 'vuex';
  import * as userDA from '@/dataAccess/userDA.js';
  import Swal from 'sweetalert2';
  export default {
    components: {
      LineChart,
      DatePicker
    },  
    data () {
      return {
        dataNumMonth: {},        
        dataAccountTypeMonth: {},
        dataBalanceMonth: {},
        chart1: 'N° de Cuentas creadas en el Año 2019',
        chart2: 'Tipo de Cuentas creadas en el Año 2019',
        chart3: 'Balance Total en el Año 2019',
        value1: '2019',     
        value2: '2019',
        value2_2: 'Cuenta Simple',
        value3: '2019',    
        dta1: [],
        dta2: [],   
        lbl1: 'Cuenta Simple Soles',
        lbl2: 'Cuenta Simple Dólares' 
      }
    },
    computed:{
      ...mapState(['listDataNumMonth1','listDataNumMonth2','listDataNumMonth3',
                   'listCntDollar1','listCntDollar2','listCntDollar3',
                   'listCntSoles1','listCntSoles2','listCntSoles3',
                   'listBalanceAccountSoles','listBalanceAccountDollar'])
    },      
    mounted(){      
      // Chart 1
      this.dynamicDataNumMonth('2019');
      this.fillDataNumMonth();

      // Chart 2
      this.dynamicDataAccountTypeMonth('2019');
      this.dta1 = this.listCntSoles1;
      this.dta2 = this.listCntDollar1;
      this.fillDataAccountTypeMonth();

      // Chart 3
      this.dynamicDataBalanceMonth('2019');
      this.fillDataBalanceMonth();

      // Chart 4
    },
    methods:{
      ...mapActions(['dynamicDataNumMonth','dynamicDataAccountTypeMonth','dynamicDataBalanceMonth']),
      // Chart 1
      fillDataNumMonth(){
        this.dataNumMonth={
          labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],       
          datasets: [
            {
              fill: false,
              showLine: true,
              label: 'Cuenta Simple',              
              backgroundColor: '#f87979',
              borderColor: '#f87979',
              data: this.listDataNumMonth1,
            },
            {
              fill: false,
              showLine: true,
              label: 'Cuenta Sueldo',
              backgroundColor: '#5DBCD2',
              borderColor: '#5DBCD2',
              data: this.listDataNumMonth2,
            },
            {
              fill: false,
              showLine: true,
              label: 'Cuenta Fantasy',
              backgroundColor: '#000000',
              borderColor: '#000000',
              data: this.listDataNumMonth3,
            },
          ]
        }
      },
      getDataNumMonth(){
        if(this.value1 == null){
          Swal.fire({
            title: 'Sugerencia',
            type: 'info',
            text: 'Debe seleccionar el año'
          });
          return;
        }
        this.dynamicDataNumMonth(this.value1);
        this.fillDataNumMonth();
        this.chart1 = 'N° de Cuentas creadas en el Año ' + this.value1;                 
      },

      // Chart 2
      fillDataAccountTypeMonth(){
        this.dataAccountTypeMonth={
          labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
          datasets: [
            // Cuenta Simple
            {
              fill: false,
              showLine: true,
              label: this.lbl1,
              backgroundColor: '#f87979',
              borderColor: '#f87979',
              data: this.dta1,
            },
            {
              fill: false,
              showLine: true,
              label: this.lbl2,
              backgroundColor: '#000000',
              borderColor: '#000000',
              data: this.dta2,
            },         
          ]
        }
      },
      getDataAccountTypeMonth(){
        if(this.value2 == null){
          Swal.fire({
            title: 'Sugerencia',
            type: 'info',
            text: 'Debe seleccionar el año'
          });
          return;
        }        
        this.dynamicDataAccountTypeMonth(this.value2);        
        if (this.value2_2 == 'Cuenta Simple'){
          this.dta1 = this.listCntSoles1;
          this.dta2 = this.listCntDollar1;
          this.lbl1 = 'Cuenta Simple Soles';
          this.lbl2 = 'Cuenta Simple Dólares';
          this.fillDataAccountTypeMonth();
          this.chart2 = 'Tipo de Cuentas creadas en el Año ' + this.value2;
        }else if (this.value2_2 == 'Cuenta Sueldo'){
          this.dta1 = this.listCntSoles2;
          this.dta2 = this.listCntDollar2;
          this.lbl1 = 'Cuenta Sueldo Soles';
          this.lbl2 = 'Cuenta Sueldo Dólares';
          this.fillDataAccountTypeMonth();
          this.chart2 = 'Tipo de Cuentas creadas en el Año ' + this.value2;
        }else if (this.value2_2 == 'Cuenta Fantasy'){
          this.dta1 = this.listCntSoles3;
          this.dta2 = this.listCntDollar3;
          this.lbl1 = 'Cuenta Fantasy Soles';
          this.lbl2 = 'Cuenta Fantasy Dólares';
          this.fillDataAccountTypeMonth();
          this.chart2 = 'Tipo de Cuentas creadas en el Año ' + this.value2;          
        }
      },   

      // Chart 3
      fillDataBalanceMonth(){
        this.dataBalanceMonth={
          labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
          datasets: [
            {
              fill: false,
              showLine: true,
              label: 'Soles',              
              backgroundColor: '#f87979',
              borderColor: '#f87979',
              data: this.listBalanceAccountSoles,
            },
            {
              fill: false,
              showLine: true,
              label: 'Dólares',              
              backgroundColor: '#000000',
              borderColor: '#000000',
              data: this.listBalanceAccountDollar,
            },            
          ]
        }        
      },
      getDataBalanceMonth(){
        if(this.value3 == null){
          Swal.fire({
            title: 'Sugerencia',
            type: 'info',
            text: 'Debe seleccionar el año'
          });
          return;
        }        
        this.dynamicDataBalanceMonth(this.value3);
        this.fillDataBalanceMonth();
        this.chart3 = 'Balance Total en el Año ' + this.value3;
      },

      // Chart 4
      back(){
        this.$router.push('/home');
      },
      exportPDF:function(){
        window.print();
      }
    }
  }
</script>

<style scoped>
  .container {
    font-family: 'Montserrat';
    max-width: 1200px;
    margin: auto;
  }
  h1 {
    font-family: 'Montserrat';
    font-size: 7vh;
    text-transform: uppercase;
    border-bottom: 1px solid #f1f1f1;
    margin-top: 5vh;
  }
  .Chart {
    font-family: 'Montserrat';
    padding: 20px;
    box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, .4);
    border-radius: 20px;
    margin: 50px 0;
  }
  h3 {
    border-bottom: 1px solid #f1f1f1;
  }
  button {
    font-family: 'Montserrat';
    background-color: #090d4d;
    color: white;
    font-weight: 600;    
    position: relative;
    margin-left: auto;
    margin-right: auto; 
    margin-bottom: 2vh;     
  }
</style>