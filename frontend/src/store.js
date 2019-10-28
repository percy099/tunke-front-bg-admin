import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      username: "", 
      password: ""
    },
    token : '',
    persons : [],
    lendings: [],
    login_entry: false
  },
  mutations: {
    fillPersons(state,persons){
        state.persons=[];
        let persons_data = persons.clients;
        for (let i=0; i< persons_data.length;i++){       
            state.persons.push({
              idPerson : persons_data[i].idPerson,
              documentType : persons_data[i].documentType,
              documentNumber : persons_data[i].documentNumber,
              firstName : persons_data[i].firstName,
              middleName : persons_data[i].middleName,
              fatherLastname : persons_data[i].fatherLastname,
              motherLastname : persons_data[i].motherLastname,
              email1: persons_data[i].email1,
              birthdate : persons_data[i].birthdate,
              address : persons_data[i].address,
              nationality : persons_data[i].nationality,
              vehicle1Plate : persons_data[i].vehicle1Plate,
              vehicle2Plate : persons_data[i].vehicle2Plate
            });
          }
    },
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
    },
    setTok(state,tok){
      state.token = tok;
    },
    setLogEntry(state, login_entry){
      state.login_entry = login_entry;
    }
  },
  actions: {
      completePersons(context,person_data){
        context.commit('fillPersons',person_data);
      },
      completeLendings(context){
        //let url = process.env.VUE_APP_API_URL + 'api/prospectiveClients/';
        let lendings = axios.post(url);
        context.commit('fillLendings',lendings_data);
      },
      setToken(context,token){
        context.commit('setTok',token);
      },
      setLoginEntry(context, login_entry){
        context.commit('setLogEntry', login_entry);
      }
  }
})
