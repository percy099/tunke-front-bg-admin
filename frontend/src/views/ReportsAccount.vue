<template>
  <div class="container">    
    <h1 class="text-center">Reporte de Cuentas</h1>
    <div class="row">      
      <div class="col-md-6">
        <label class="mr-1">Seleccione año: </label>
        <date-picker class="mt-5" v-model="value1" value-type="format" type="year" format="YYYY" placeholder="Seleccione año"></date-picker>
        <button class="ml-3" v-promise-btn @click="getDataNumMonth()">Aceptar</button>
        <div class="Chart">
          <h3 class="text-center" >Número de Cuentas por Mes</h3>
          <line-chart :chart-data="dataNumMonth"></line-chart>
        </div>
      </div>
      <div class="col-md-6">
        <label class="mr-1">Seleccione año: </label>
        <date-picker class="mt-5" v-model="value2" value-type="format" type="year" format="YYYY" placeholder="Seleccione año"></date-picker>
        <button class="ml-3" v-promise-btn @click="getDataAccountTypeMonth()">Aceptar</button>
        <div class="Chart">
          <h3 class="text-center">Tipo de Cuentas por Mes</h3>
          <line-chart :chart-data="dataAccountTypeMonth"></line-chart>
        </div>
      </div>
    </div>    
  </div>
</template>

<script>
  /* Ronaldo */
  import LineChart from '@/util/LineChart.js'
  import DatePicker from 'vue2-datepicker';
  import 'vue2-datepicker/index.css';
  import {mapState, mapActions} from 'vuex'
  export default {
    components: {
      LineChart,
      DatePicker
    },
    data () {
      return {
        dataNumMonth: {},
        dataAccountTypeMonth: {},
        value1: '2019',
        value2: '2019',
      }
    },
    computed:{
      ...mapState(['cntAccJan','cntAccFeb','cntAccMar','cntAccApr','cntAccMay','cntAccJun','cntAccJul','cntAccAug','cntAccSep','cntAccOct','cntAccNov','cntAccDec',
                   'listCntDollar','listCntSoles'])
    },
    mounted(){
      this.fillDataNumMonth();
      this.fillDataAccountTypeMonth();
    },
    methods:{
      ...mapActions(['prueba','dynamicDataAccountTypeMonth']),
      fillDataNumMonth(){
        this.dataNumMonth={
          labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
          datasets: [
            {
              label: 'Número de Cuentas',
              backgroundColor: '#f87979',
              data: [this.cntAccJan, this.cntAccFeb, this.cntAccMar, this.cntAccApr, this.cntAccMay, this.cntAccJun,
              this.cntAccJul, this.cntAccAug, this.cntAccSep, this.cntAccOct, this.cntAccNov, this.cntAccDec]
            },
          ]
        }
      },
      fillDataAccountTypeMonth(){
        this.dataAccountTypeMonth={
          labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
          datasets: [
            {
              fill: false,
              showLine: true,
              label: 'Soles',
              backgroundColor: '#f87979',
              borderColor: '#f87979',
              data: this.listCntSoles,
            },
            {
              fill: false,
              showLine: true,
              label: 'Dólares',
              backgroundColor: '#000000',
              borderColor: '#000000',
              data: this.listCntDollar,
            }
          ]
        }
      },      
      getDataNumMonth(){
        this.prueba(this.value1);
        this.fillDataNumMonth();
      },
      getDataAccountTypeMonth(){
        this.dynamicDataAccountTypeMonth(this.value2);
        this.fillDataAccountTypeMonth();
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
  button{
    font-family: 'Montserrat';
    background-color: rgba(0,203,138,0.66);
    position: relative;
    margin-left: auto;
    margin-right: auto; 
    margin-bottom: 2vh;     
  }    
</style>