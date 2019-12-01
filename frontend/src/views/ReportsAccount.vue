<template>
  <div class="container">    
    <h1 class="text-center">Reporte de Cuentas</h1>
    <div class="row">      
      <div class="col-md-6">
        <!-- <label class="mr-1 ml-4">Seleccione año: </label> -->
        <!-- <date-picker class="mt-5" style= "width: 11vh;" v-model="value1" value-type="format" type="year" format="YYYY" placeholder="Año"></date-picker> -->
        <!-- label class="mr-1 ml-3">Seleccione mes: </label> -->
        <!-- <date-picker class="mt-5" style= "width: 11vh;" v-model="value1_1" value-type="format" type="month" format="MM" placeholder="Mes"></date-picker> -->
        <label class="mr-1 ml-5">Seleccione año: </label>
        <date-picker class="mt-5" v-model="value1" value-type="format" type="year" format="YYYY" placeholder="Seleccione año"></date-picker>        
        <button class="ml-3 mt-3 btn" v-promise-btn @click="getDataNumMonth()">Aceptar</button>        
        <div class="Chart">
          <h3 class="text-center" >{{ chart1 }}</h3>
          <line-chart :chart-data="dataNumMonth"></line-chart>
        </div>
      </div>
      <div class="col-md-6">
        <label class="mr-1 ml-5">Seleccione año: </label>
        <date-picker class="mt-5" v-model="value2" value-type="format" type="year" format="YYYY" placeholder="Seleccione año"></date-picker>
        <button class="ml-3 mt-3 btn" v-promise-btn @click="getDataAccountTypeMonth()">Aceptar</button>
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
        dataNumWeek: {},
        listMonthWeek1: [],
        listMonthWeek2: [],
        listMonthWeek3: [],
        dataAccountTypeMonth: {},
        dataBalanceMonth: {},
        chart1: 'N° de Cuentas creadas en el Año 2019',
        chart2: 'Tipo de Cuentas creadas en el Año 2019',
        chart3: 'Balance Total en el Año 2019',
        value1: '2019',
        value1_1: '',        
        value2: '2019',
        value3: '2019',
        lbls: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        dta1: [],
        dta2: [],
        dta3: [],
        mes: '',              
      }
    },
    computed:{
      ...mapState(['listDataNumMonth1','listDataNumMonth2','listDataNumMonth3','listCntDollar','listCntSoles','listBalanceAccountSoles','listBalanceAccountDollar'])
    },      
    mounted(){      
      // Chart 1
      console.log('Llegue');
      this.dynamicDataNumMonth('2019');
      this.dta1 = this.listDataNumMonth1;
      this.dta2 = this.listDataNumMonth2;
      this.dta3 = this.listDataNumMonth3;
      this.fillDataNumMonth();

      // Chart 2
      this.dynamicDataAccountTypeMonth('2019');
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
          labels: this.lbls,          
          datasets: [
            {
              fill: false,
              showLine: true,
              label: 'Cuenta Simple',              
              backgroundColor: '#f87979',
              borderColor: '#f87979',
              data: this.dta1,
            },
            {
              fill: false,
              showLine: true,
              label: 'Cuenta Sueldo',
              backgroundColor: '#444444',
              borderColor: '#5DBCD2',
              data: this.dta2,
            },
            {
              fill: false,
              showLine: true,
              label: 'Cuenta Fantasy',
              backgroundColor: '#000000',
              borderColor: '#000000',
              data: this.dta3,
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
        if(this.value1_1 == "" || this.value1_1 == null){
          this.lbls = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];  
          this.dynamicDataNumMonth(this.value1);
          this.dta1 = this.listDataNumMonth1; 
          this.dta2 = this.listDataNumMonth2;
          this.dta3 = this.listDataNumMonth3;
          this.fillDataNumMonth();
          this.chart1 = 'N° de Cuentas creadas en el Año ' + this.value1;
        }else{          
          userDA.getByPeriod(this.value1_1, this.value1).then((res) => {
            this.listMonthWeek1 = res.data.count[0];
            this.listMonthWeek2 = res.data.count[1];
            this.listMonthWeek3 = res.data.count[2];
            switch (this.value1_1){
              case '12':
                this.mes = 'Diciembre';
                break;
              case '11':
                this.mes = 'Noviembre';
                break;
              case '10':
                this.mes = 'Octubre';
                break;  
              case '09':
                this.mes = 'Septiembre';
                break;
              case '08':
                this.mes = 'Agosto';
                break;
              case '07':
                this.mes = 'Julio';
                break;
              case '06':
                this.mes = 'Junio';
                break;
              case '05':
                this.mes = 'Mayo';
                break;
              case '04':
                this.mes = 'Abril';
                break;
              case '03':
                this.mes = 'Marzo';
                break;
              case '02':
                this.mes = 'Febrero';
                break;
              case '01':
                this.mes = 'Enero';
                break;
            }                               
            this.chart1 = 'N° de Cuentas creadas en ' + this.mes;
            this.lbls = ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'];
            this.dta1 = this.listMonthWeek1;
            this.dta2 = this.listMonthWeek2;
            this.dta3 = this.listMonthWeek3;
            this.fillDataNumMonth();            
          }).catch(error => {
            Swal.fire({
              title: 'Error',
              type: 'error',
              text: 'Error obteniendo la lista de cantidad de cuentas'
            })
          });        
        }
      },

      // Chart 2
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
        this.fillDataAccountTypeMonth();
        this.chart2 = 'Tipo de Cuentas creadas en el Año ' + this.value2;
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
    background-color: rgba(0,203,138,0.66);
    position: relative;
    margin-left: auto;
    margin-right: auto; 
    margin-bottom: 2vh;     
  }
</style>