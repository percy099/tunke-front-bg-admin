<template>
  <div class="container">    
    <h1 class="text-center">Reporte de Cuentas</h1>
    <div class="row">      
      <div class="col-md-6">
        <div class="Chart">
          <h3 class="text-center" >Número de Cuentas por Mes</h3>
          <line-chart :chart-data="datacollection"></line-chart>
        </div>
      </div>
      <div class="col-md-6">
        <div class="Chart">
          <h3 class="text-center">Número de Cuentas por Mes</h3>
          <line-chart :chart-data="datacollection"></line-chart>
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
        datacollection: {},
        value1: '2019',
      }
    },
    computed:{
      ...mapState(['cntAccJan','cntAccFeb','cntAccMar','cntAccApr','cntAccMay','cntAccJun','cntAccJul','cntAccAug','cntAccSep','cntAccOct','cntAccNov','cntAccDec'])
    },
    mounted(){
      this.fillData();
    },
    methods:{
      ...mapActions(['prueba']),
      fillData(){
        this.datacollection={
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
      getData(){
        this.prueba(this.value1);
        this.fillData();
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