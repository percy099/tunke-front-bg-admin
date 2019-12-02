<template>
  <div class="container">    
    <h1 class="text-center">Reporte de Préstamos</h1>
    <div class="row">      
      <div class="col-md-6">        
        <label class="mr-1 ml-4">Seleccione año: </label>
        <date-picker class="mt-5" v-model="value1" value-type="format" type="year" format="YYYY" placeholder="Año"></date-picker>
        <!-- <label class="mr-1 ml-3">Seleccione mes: </label> -->
        <!-- <date-picker class="mt-5" style= "width: 11vh;" v-model="value1_1" value-type="format" type="month" format="MM" placeholder="Mes"></date-picker> -->
        <button class="ml-3 mt-3 btn" v-promise-btn @click="getDataLendMonth()">Aceptar</button>           
        <div class="Chart">
          <h3 class="text-center" >{{ chart1 }}</h3>
          <line-chart :chart-data="dataLendMonth"></line-chart>
        </div>
      </div>
      <div class="col-md-6">
        <label class="mr-1 ml-5">Seleccione año: </label>
        <date-picker class="mt-5" v-model="value2" value-type="format" type="year" format="YYYY" placeholder="Seleccione año"></date-picker>
        <button class="ml-3 mt-3 btn" v-promise-btn @click="getDataAmountLendMonth()">Aceptar</button>
        <div class="Chart">
          <h3 class="text-center">{{ chart2 }}</h3>
          <line-chart :chart-data="dataAmountLendMonth"></line-chart>
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
  import Swal from 'sweetalert2';    
  export default {
    components: {
      LineChart,
      DatePicker
    },
    data () {
      return {
        dataLendMonth: {},
        dataAmountLendMonth: {},
        chart1: 'N° de Préstamos Efectuadas en el Año 2019',
        chart2: 'Monto Total de Préstamos en el Año 2019',
        value1: '2019',
        value1_1: '',
        value2: '2019',
      }
    },
    computed:{
      ...mapState(['listCntLend', 'listAmountLendSoles','listAmountLendDollar'])
    },
    mounted(){
      // Chart 1
      this.dynamicDataLendMonth('2019');
      this.fillDataLendMonth();          

      // Chart 2
      this.dynamicDataAmountLendMonth('2019');
      this.fillDataAmountLendMonth();
    },
    methods:{
      ...mapActions(['dynamicDataLendMonth', 'dynamicDataAmountLendMonth']),    
      fillDataLendMonth(){
        this.dataLendMonth={
          labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
          datasets: [
            {
              fill: false,
              showLine: true,
              label: 'Número de Préstamos',              
              backgroundColor: '#f87979',
              borderColor: '#f87979',
              data: this.listCntLend,
            },
          ]
        }
      },  
      fillDataAmountLendMonth(){
        this.dataAmountLendMonth={
          labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
          datasets: [
            {
              fill: false,
              showLine: true,
              label: 'Soles',              
              backgroundColor: '#f87979',
              borderColor: '#f87979',
              data: this.listAmountLendSoles,
            },
            {
              fill: false,
              showLine: true,
              label: 'Dólares',              
              backgroundColor: '#000000',
              borderColor: '#000000',
              data: this.listAmountLendDollar,
            },            
          ]
        }
      },   
      getDataLendMonth(){
        if(this.value1 == null){
          Swal.fire({
            title: 'Sugerencia',
            type: 'info',
            text: 'Debe seleccionar el año'
          });
          return;
        }            
        this.dynamicDataLendMonth(this.value1);
        this.fillDataLendMonth();
        this.chart1 = 'N° de Préstamos Efectuadas en el Año ' + this.value1;
      },
      getDataAmountLendMonth(){
        if(this.value2 == null){
          Swal.fire({
            title: 'Sugerencia',
            type: 'info',
            text: 'Debe seleccionar el año'
          });
          return;
        }    
        this.dynamicDataAmountLendMonth(this.value2);
        this.fillDataAmountLendMonth();
        this.chart2 = 'Monto Total de Préstamos en el Año ' + this.value2;
      },
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