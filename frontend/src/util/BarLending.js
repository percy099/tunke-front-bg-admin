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
    ...mapState(['cntAccJanLen','cntAccFebLen','cntAccMarLen','cntAccAprLen','cntAccMayLen','cntAccJunLen','cntAccJulLen','cntAccAugLen','cntAccSepLen','cntAccOctLen','cntAccNovLen','cntAccDecLen'])
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
          data: [this.cntAccJanLen, this.cntAccFebLen, this.cntAccMarLen, this.cntAccAprLen, this.cntAccMayLen, this.cntAccJunLen,
                 this.cntAccJulLen, this.cntAccAugLen, this.cntAccSepLen, this.cntAccOctLen, this.cntAccNovLen, this.cntAccDecLen]
          //data: [40, 20, 12, 39, 10, 40, 39, 20, 40, 20, 12, 11]
          //data: this.countAccount
        }
      ]
    }, {responsive: true, maintainAspectRatio: false})
  }
}