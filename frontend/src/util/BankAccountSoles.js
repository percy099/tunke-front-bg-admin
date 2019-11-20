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
    ...mapState(['quantityAmountSolesJan',
        'quantityAmountSolesFeb',
        'quantityAmountSolesMar',
        'quantityAmountSolesApr',
        'quantityAmountSolesMay',
        'quantityAmountSolesJun',
        'quantityAmountSolesJul',
        'quantityAmountSolesAug',
        'quantityAmountSolesSep',
        'quantityAmountSolesOct',
        'quantityAmountSolesNov',
        'quantityAmountSolesDec',
        'amountBankAccountSoles',
        'quantityAmountDollarJan',
        'quantityAmountDollarFeb',
        'quantityAmountDollarMar',
        'quantityAmountDollarApr',
        'quantityAmountDollarMay',
        'quantityAmountDollarJun',
        'quantityAmountDollarJul',
        'quantityAmountDollarAug',
        'quantityAmountDollarSep',
        'quantityAmountDollarOct',
        'quantityAmountDollarNov',
        'quantityAmountDollarDec',
        'amountBankAccountDollar'])
    //...mapState(['countAccount'])
  },
  mounted () {
    this.renderChart({
      labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre',
               'Octubre', 'Noviembre', 'Diciembre'],
      datasets: [
        {
          label: 'Soles',
          backgroundColor: '#f87979',
          data: [this.amountBankAccountSoles+this.quantityAmountSolesFeb + this.quantityAmountSolesMar + 
                this.quantityAmountSolesApr + this.quantityAmountSolesMay + this.quantityAmountSolesJun +
                this.quantityAmountSolesJul + this.quantityAmountSolesAug + this.quantityAmountSolesSep + 
                this.quantityAmountSolesOct + this.quantityAmountSolesNov + this.quantityAmountSolesDec,

                this.amountBankAccountSoles + this.quantityAmountSolesMar + 
                this.quantityAmountSolesApr + this.quantityAmountSolesMay + this.quantityAmountSolesJun +
                this.quantityAmountSolesJul + this.quantityAmountSolesAug + this.quantityAmountSolesSep + 
                this.quantityAmountSolesOct + this.quantityAmountSolesNov + this.quantityAmountSolesDec,

                this.amountBankAccountSoles + 
                this.quantityAmountSolesApr + this.quantityAmountSolesMay + this.quantityAmountSolesJun +
                this.quantityAmountSolesJul + this.quantityAmountSolesAug + this.quantityAmountSolesSep + 
                this.quantityAmountSolesOct + this.quantityAmountSolesNov + this.quantityAmountSolesDec,

                this.amountBankAccountSoles + this.quantityAmountSolesMay + this.quantityAmountSolesJun +
                this.quantityAmountSolesJul + this.quantityAmountSolesAug + this.quantityAmountSolesSep + 
                this.quantityAmountSolesOct + this.quantityAmountSolesNov + this.quantityAmountSolesDec,

                this.amountBankAccountSoles + this.quantityAmountSolesJun +
                this.quantityAmountSolesJul + this.quantityAmountSolesAug + this.quantityAmountSolesSep + 
                this.quantityAmountSolesOct + this.quantityAmountSolesNov + this.quantityAmountSolesDec,

                this.amountBankAccountSoles +
                this.quantityAmountSolesJul + this.quantityAmountSolesAug + this.quantityAmountSolesSep + 
                this.quantityAmountSolesOct + this.quantityAmountSolesNov + this.quantityAmountSolesDec,

                this.amountBankAccountSoles + this.quantityAmountSolesAug + this.quantityAmountSolesSep + 
                this.quantityAmountSolesOct + this.quantityAmountSolesNov + this.quantityAmountSolesDec,

                this.amountBankAccountSoles + this.quantityAmountSolesSep + 
                this.quantityAmountSolesOct + this.quantityAmountSolesNov + this.quantityAmountSolesDec,

                this.amountBankAccountSoles + 
                this.quantityAmountSolesOct + this.quantityAmountSolesNov + this.quantityAmountSolesDec,

                this.amountBankAccountSoles + this.quantityAmountSolesNov + this.quantityAmountSolesDec,

                this.amountBankAccountSoles + this.quantityAmountSolesDec,

                this.amountBankAccountSoles]
        },
        {
          label: 'Dólares',
          backgroundColor: '#3286e6',
          data: [this.amountBankAccountDollar+this.quantityAmountDollarFeb + this.quantityAmountDollarMar + 
                this.quantityAmountDollarApr + this.quantityAmountDollarMay + this.quantityAmountDollarJun +
                this.quantityAmountDollarJul + this.quantityAmountDollarAug + this.quantityAmountDollarSep + 
                this.quantityAmountDollarOct + this.quantityAmountDollarNov + this.quantityAmountDollarDec,

                this.amountBankAccountDollar + this.quantityAmountDollarMar + 
                this.quantityAmountDollarApr + this.quantityAmountDollarMay + this.quantityAmountDollarJun +
                this.quantityAmountDollarJul + this.quantityAmountDollarAug + this.quantityAmountDollarSep + 
                this.quantityAmountDollarOct + this.quantityAmountDollarNov + this.quantityAmountDollarDec,

                this.amountBankAccountDollar + 
                this.quantityAmountDollarApr + this.quantityAmountDollarMay + this.quantityAmountDollarJun +
                this.quantityAmountDollarJul + this.quantityAmountDollarAug + this.quantityAmountDollarSep + 
                this.quantityAmountDollarOct + this.quantityAmountDollarNov + this.quantityAmountDollarDec,

                this.amountBankAccountDollar + this.quantityAmountDollarMay + this.quantityAmountDollarJun +
                this.quantityAmountDollarJul + this.quantityAmountDollarAug + this.quantityAmountDollarSep + 
                this.quantityAmountDollarOct + this.quantityAmountDollarNov + this.quantityAmountDollarDec,

                this.amountBankAccountDollar + this.quantityAmountDollarJun +
                this.quantityAmountDollarJul + this.quantityAmountDollarAug + this.quantityAmountDollarSep + 
                this.quantityAmountDollarOct + this.quantityAmountDollarNov + this.quantityAmountDollarDec,

                this.amountBankAccountDollar +
                this.quantityAmountDollarJul + this.quantityAmountDollarAug + this.quantityAmountDollarSep + 
                this.quantityAmountDollarOct + this.quantityAmountDollarNov + this.quantityAmountDollarDec,

                this.amountBankAccountDollar + this.quantityAmountDollarAug + this.quantityAmountDollarSep + 
                this.quantityAmountDollarOct + this.quantityAmountDollarNov + this.quantityAmountDollarDec,

                this.amountBankAccountDollar + this.quantityAmountDollarSep + 
                this.quantityAmountDollarOct + this.quantityAmountDollarNov + this.quantityAmountDollarDec,

                this.amountBankAccountDollar + 
                this.quantityAmountDollarOct + this.quantityAmountDollarNov + this.quantityAmountDollarDec,

                this.amountBankAccountDollar + this.quantityAmountDollarNov + this.quantityAmountDollarDec,

                this.amountBankAccountDollar + this.quantityAmountDollarDec,

                this.amountBankAccountDollar]
        }
      ]
    }, {responsive: true, maintainAspectRatio: false})
  },
}