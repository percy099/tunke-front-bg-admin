import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      username: "", 
      password: ""
    },
    lendings: []
  },
  mutations: {
    fillLendings(state,lendings_data){
      let aux=lendings_data.lendings;
        state.lendings=[];
        for (let i=0; i< aux.length;i++){       
            state.lendings.push({
              idLending : aux[i].idLending,
              feesNumber : aux[i].feesNumber,
              amount : aux[i].amount,
              feeType : aux[i].feeType,
              interestRate : aux[i].interestRate
          });
        }
    }
  },
  actions: {
    completeLendings(context){
      //let url = process.env.VUE_APP_API_URL + 'api/prospectiveClients/';
      let lendings = axios.post(url);
      context.commit('fillLendings',lendings_data);
    }

  }
})
