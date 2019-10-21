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
    persons : []
  },
  mutations: {
    fillPersons(state,persons_data){
      let aux=persons_data.persons;
        state.persons=[];
        for (let i=0; i< aux.length;i++){       
            state.persons.push({
              idPerson : aux[i].idPerson,
              documentType : aux[i].documentType,
              documentNumber : aux[i].documentNumber,
              firstName : aux[i].firstName,
              middleName : aux[i].middleName,
              fatherLastname : aux[i].fatherLastname,
              motherLastname : aux[i].motherLastname,
              email1: aux[i].email1,
              birthdate : aux[i].birthdate,
              address : aux[i].address,
              nationality : aux[i].nationality,
              vehicle1Plate : aux[i].vehicle1Plate,
              vehicle2Plate : aux[i].vehicle2Plate
          });
        }
    }
  },
  actions: {
      completePersons(context){
        let url = process.env.VUE_APP_API_URL + 'api/prospectiveClients/';
        let people = axios.post(url);
        context.commit('fillPersons',people_data);
      }
  }
})
