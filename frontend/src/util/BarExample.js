import { Bar } from './BaseCharts'

export default {
  extends: Bar,
  mounted () {
    this.renderChart({
      labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre',
               'Octubre', 'Noviembre', 'Diciembre'],
      datasets: [
        {
          label: 'Número de préstamos',
          backgroundColor: '#f87979',
          data: [40, 20, 12, 39, 10, 40, 39, 20, 40, 20, 12, 11]
        }
      ]
    }, {responsive: true, maintainAspectRatio: false})
  }
}