<template>
    <div class="container">
      <label class="mr-1">Seleccione año inicio: </label>
      <date-picker class="mt-5" v-model="value1" value-type="format" type="year" format="YYYY" placeholder="Seleccione año"></date-picker>
      <!--<label class="ml-2 mr-1">Seleccione año fin:</label>-->
      <!--<date-picker class="mt-5" v-model="value2" value-type="format" type="year" format="YYYY" placeholder="Seleccione año"></date-picker>-->
      <button class="ml-3" v-promise-btn @click="getData">Aceptar</button> 
      <div class="Chart">
        <h1 style="text-align:center;">Número de Cuentas por mes - {{ value1 }}</h1>
        <bar-account/>          
      </div>  
      <div class="Chart">
        <h1 style="text-align:center;">Número de Cuentas por mes - {{ value1 }}</h1>
        <line-account/>
      </div>
    </div>
</template>


<script>
import {mapState, mapActions} from 'vuex'
import * as adminDA from '@/dataAccess/adminDA.js'
import Swal from 'sweetalert2'

/* Ronaldo */
import BarAccount from '@/util/BarAccount';
import LineAccount from '@/util/LineAccount';
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import * as userDA from '@/dataAccess/userDA.js';
export default {
    components: {
        BarAccount,
        LineAccount,
        DatePicker
    },
    data () {
      return {
        dataPoints: null,
        height: 20,
        value1: '2019',
        value2: ''
      }
    },
    mounted () {
      setInterval(() => {
        this.fillData()
      }, 2000)
    },
    /*beforeUpdate(){
      console.log(this.token);
      this.prueba(this.value1);
    },*/
    methods: {
      ...mapActions(['prueba']),
      getData(){      
        console.log(this.token);
        this.prueba(this.value1);
        /*userDA.getAllAccounts(this.token).then((res) =>{
            let year='';
            year=value1;
            console.log(year);
            this.prueba(res.data,value1);
        }).catch(error =>{
            Swal.fire({
                title: 'Error',
                type: 'error',
                text: 'Error obteniendo las cuentas'
            })
        });  */
        /*let val;
        if(this.value1==''){
          val='2019';
        }else{
          val=this.value1;
        }        
        console.log(val);   
        context.commit('fillDataAccount'); */ 
      },
      increaseHeight () {
        this.height += 10
      },
      getRandomInt () {
        return Math.floor(Math.random() * (50 - 5 + 1)) + 5
      },
      fillData () {
        this.dataPoints = {
          labels: ['January' + this.getRandomInt(), 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
          datasets: [
            {
              label: 'Data One',
              backgroundColor: '#f87979',
              data: [this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt()]
            }
          ]
        }
      }
    },
    computed: {
      myStyles () {
        return {
          height: `${this.height}px`,
          position: 'relative'
        }
      },
      ...mapState(['token'])
    }
}
</script>

<style>
  .container {
    max-width: 800px;
    margin: 0 auto;
  }
  h1 {
    font-family: 'Helvetica', Arial;
    color: #464646;
    text-transform: uppercase;
    border-bottom: 1px solid #f1f1f1;
    padding-bottom: 15px;
    font-size: 28px;
    margin-top: 0;
  }
  .Chart {
    padding: 20px;
    box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, .4);
    border-radius: 20px;
    margin: 50px 0;
  }
  button{
    background-color: rgba(0,203,138,0.66);
    position: relative;
    margin-left: auto;
    margin-right: auto; 
    margin-bottom: 2vh;     
  }
</style>