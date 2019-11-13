import { Bar } from './BaseCharts'
import {mapState} from 'vuex'
export default {
  extends: Bar,
  data(){
    return{
        //countAccount: []
    }
  },
  computed:{
    ...mapState(['cntAccJan','cntAccFeb','cntAccMar','cntAccApr','cntAccMay','cntAccJun','cntAccJul','cntAccAug','cntAccSep','cntAccOct','cntAccNov','cntAccDec'])
    //...mapState(['countAccount'])
  },
  mounted () {
    this.renderChart({
      labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre',
               'Octubre', 'Noviembre', 'Diciembre'],
      datasets: [
        {
          label: 'Número de Préstamos',
          backgroundColor: '#f87979',
          data: [this.cntAccJan, this.cntAccFeb, this.cntAccMar, this.cntAccApr, this.cntAccMay, this.cntAccJun,
                 this.cntAccJul, this.cntAccAug, this.cntAccSep, this.cntAccOct, this.cntAccNov, this.cntAccDec]
          //data: [40, 20, 12, 39, 10, 40, 39, 20, 40, 20, 12, 11]
          //data: this.countAccount
        }
      ]
    }, {responsive: true, maintainAspectRatio: false})
  }
}