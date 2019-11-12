import { Line } from './BaseCharts'
import {mapState} from 'vuex'
export default {
  extends: Line,
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
      labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
               'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
      datasets: [
        {
          label: 'Número de Préstamos',
          backgroundColor: '#f87979',
          data: [this.cntAccJan, this.cntAccFeb, this.cntAccMar, this.cntAccApr, this.cntAccMay, this.cntAccJun,
                 this.cntAccJul, this.cntAccAug, this.cntAccSep, this.cntAccOct, this.cntAccNov, this.cntAccDec]
        }
      ]
    }, {responsive: true, maintainAspectRatio: false})
  }
}