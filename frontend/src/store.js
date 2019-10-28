import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      username: "gallardo.a@pucp.pe", 
      password: "Casa12345."
    },
    token : '',
    persons : [],
    lendings: [],
    login_entry: false,
    countries : [],
    clientCreate :{
      idPerson : -1,
      documentNumber : -1,
      firstName : '',
      middleName : '',
      fatherLastname : '',
      motherLastname : '',
      birthdate : '',
      nationality : '',
      flag : '',
      address : '',
      email1 : '',
      email2 : '',
      cellphone1 : '',
      cellphone2 : '',
      vehicle1Plate : '',
      vehicle2Plate : ''
    },
    editClient : false,
    selectedClientIndex : -1
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
              email2: persons_data[i].email2,
              cellphone1 : persons_data[i].cellphone1,
              cellphone2 : persons_data[i].cellphone2,
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
    },
    fillPersonCreate(state,person_data){
      state.clientCreate.idPerson = person_data.idPerson;
      state.clientCreate.firstName = person_data.firstName;
      state.clientCreate.middleName = person_data.middleName;
      state.clientCreate.fatherLastname = person_data.fatherLastname;
      state.clientCreate.motherLastname = person_data.motherLastname;
      state.clientCreate.birthdate = person_data.birthdate;
      state.clientCreate.nationality = person_data.nationality;
      state.clientCreate.flag = person_data.flag;
      state.clientCreate.address = person_data.address;
      state.clientCreate.vehicle1Plate = person_data.vehicle1Plate;
      state.clientCreate.vehicle2Plate = person_data.vehicle2Plate;
    },
    setActCli(state,edit){
      state.editClient = edit;
    },
    setCliInd(state,index){
      state.selectedClientIndex = index;
      state.clientCreate.idPerson = state.persons[index].idPerson;
      state.clientCreate.firstName = state.persons[index].firstName;
      state.clientCreate.documentNumber = state.persons[index].documentNumber;
      state.clientCreate.middleName = state.persons[index].middleName;
      state.clientCreate.fatherLastname = state.persons[index].fatherLastname;
      state.clientCreate.motherLastname = state.persons[index].motherLastname;
      state.clientCreate.birthdate = state.persons[index].birthdate;
      state.clientCreate.nationality = state.persons[index].nationality;
      state.clientCreate.flag = state.persons[index].flag;
      state.clientCreate.address = state.persons[index].address;
      state.clientCreate.email1 = state.persons[index].email1;
      state.clientCreate.email2 = state.persons[index].email2;
      state.clientCreate.cellphone1 = state.persons[index].cellphone1;
      state.clientCreate.cellphone2 = state.persons[index].cellphone2;
      state.clientCreate.vehicle1Plate = state.persons[index].vehicle1Plate;
      state.clientCreate.vehicle2Plate = state.persons[index].vehicle2Plate;
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
      },
      setActionClient(context,edit){
        context.commit('setActCli',edit);
      },
      setClientIndex(context,index){
        context.commit('setCliInd',index);
      },
      completePersonCreate(context,person_data){
        context.commit('fillPersonCreate',person_data);
      }
  }
})
