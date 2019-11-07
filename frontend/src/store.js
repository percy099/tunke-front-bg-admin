import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      username: "gallardo.a@pucp.pe", 
      password: "Casa12345.",
      code : "",
      name : ""
    },
    token : '',
    clients : [],
    lendings: [],
    accounts: [],
    salesRecords: [],
    accountsByClient : [],
    campaigns: [],
    login_entry: false,
    countries : [],
    clientCreate :{
      idPerson : -1,
      idClient : -1,
      documentNumber : '',
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
    accountCreate :{
      idPerson : -1,
      documentNumber : '',
      firstName : '',
      middleName : '',
      fatherLastname : '',
      motherLastname : '',
      birthdate : '',
      nationality : '',
      flag : '',
      address : '',
      currencyType : -1
    },
    campaignCreate :{
      idCampaign : -1,
      name : '',
      month : '',
      startDate : '',
      endDate : '',
      minimumLoan : -1,
      maximumLoan : -1,
      minimumPeriod : -1,
      maximumPeriod : -1,
      interestRate : -1,
      idCurrency : -1,
      active : -1
    },
    lendingCreate :{
      idLending : -1,
      feesNumber : -1,
      amount : -1,
      feeType : '',
      interestRate : -1,
      editClient : false,
      selectedClientIndex : -1,
      selectedCampaignIndex : -1,
      selectedLendingIndex : -1,
      activeLoan: false,
      totalShares: -1,
      interestRate: -1,
      shareType: '',
      editClient : false,
      selectedClientIndex : -1,
      selectedSalesIndex : -1
    },
    salesRecordCreate :{
      activeAccount : false,
      balance : 0.0,
      openingDate : '',
      closingDate : '',
      activeClient : '',
      accountNumber : '',
      nameRecordStatus : '',
      firstName : '',
      middleName : '',
      fatherLastname : '',
      motherLastname : '',
      birthdate : '',
      nationality : '',
      address : '',
      documentType : '',
      documentNumber : -1,
      idSalesRecord : -1,
      origin : '',
      requestDate : '',
      activeSalesRecord : '',
      productName : '',
      completeName : '',
      /*  info del préstamo */ 
      activeLoan: false,
      totalShares: -1,
      interestRate: -1,
      shareType: '',
      editClient : false,
      selectedClientIndex : -1,
      selectedSalesIndex : -1
    },
    

  mutations: {
    fillClients(state,persons){
        state.clients=[];
        let persons_data = persons.clients;
        for (let i=0; i< persons_data.length;i++){
            if(persons_data[i].active){       
            state.clients.push({
              idPerson : persons_data[i].idPerson,
              idClient : persons_data[i].idClient,
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
              vehicle2Plate : persons_data[i].vehicle2Plate,
              flag : persons_data[i].flag
            });
          }
          }
    },
    fillLendings(state,lendings_data){
      let aux=lendings_data.lendings;
      state.lendings=[];
        for (let i=0; i< aux.length;i++){
          if(aux[i].active){       
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

    fillCampaigns(state,campaigns_data){
      let aux=campaigns_data;
      state.campaigns=[];
      for(let i=0; i< aux.length; i++){
        if(aux[i].active == 1){
          state.campaigns.push({
            idCampaign : aux[i].idCampaign,
            name : aux[i].name,
            month : aux[i].month,
            startDate : aux[i].startDate,
            endDate : aux[i].endDate,
            minimumLoan : aux[i].minimumLoan,
            maximumLoan : aux[i].maximumLoan,
            minimumPeriod : aux[i].minimumPeriod,
            maximumPeriod : aux[i].maximumPeriod,
            interestRate : aux[i].interestRate,
            idCurrency : aux[i].idCurrency,
            active : aux[i].active
          });
        }
      }
    },
    fillAccounts(state, account_data){
      let aux=account_data.accounts;
      state.accounts=[];
      for(let i = 0; i < aux.length; i++){
        if(aux[i].active){
          state.accounts.push({
            firstName : aux[i].firstName,
            middleName : aux[i].middleName,
            fatherLastname : aux[i].fatherLastname,
            motherLastname : aux[i].motherLastname,
            active : aux[i].active,
            idAccount : aux[i].idAccount,
            accountNumber : aux[i].accountNumber,
            balance : aux[i].balance,
            openingDate : aux[i].openingDate,
            closingDate : aux[i].closingDate,
            cardNumber : aux[i].cardNumber,
            idAccountType : aux[i].idAccountType,
            idProduct : aux[i].idProduct,
            idCurrency : aux[i].idCurrency,
            idClient : aux[i].idClient,
            currencyName : aux[i].currencyName,
            currencySymbol : aux[i].currencySymbol,
            currencyCode : aux[i].currencyCode,
            typeName : aux[i].typeName
          })
        }
      }
    },
    setTok(state,tok){
      state.token = tok;
    },
    setAdm(state, admin){
      state.user.name = admin.name;
      state.user.code = admin.code;
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
    fillAccountCreate(state, person_data){
      state.accountCreate.idPerson = person_data.idPerson;
      state.accountCreate.firstName = person_data.firstName;
      state.accountCreate.middleName = person_data.middleName;
      state.accountCreate.fatherLastname = person_data.fatherLastname;
      state.accountCreate.motherLastname = person_data.motherLastname;
      state.accountCreate.birthdate = person_data.birthdate;
      state.accountCreate.nationality = person_data.nationality;
      state.accountCreate.flag = person_data.flag;
      state.accountCreate.address = person_data.address;
    },
    setActCli(state,edit){
      state.editClient = edit;
    },
    setCliInd(state,index){
      state.selectedClientIndex = index;
      state.clientCreate.idClient = state.clients[index].idClient;
      state.clientCreate.idPerson = state.clients[index].idPerson;
      state.clientCreate.firstName = state.clients[index].firstName;
      state.clientCreate.documentNumber = state.clients[index].documentNumber;
      state.clientCreate.middleName = state.clients[index].middleName;
      state.clientCreate.fatherLastname = state.clients[index].fatherLastname;
      state.clientCreate.motherLastname = state.clients[index].motherLastname;
      state.clientCreate.birthdate = state.clients[index].birthdate;
      state.clientCreate.nationality = state.clients[index].nationality;
      state.clientCreate.flag = state.clients[index].flag;
      state.clientCreate.address = state.clients[index].address;
      state.clientCreate.email1 = state.clients[index].email1;
      state.clientCreate.email2 = state.clients[index].email2;
      state.clientCreate.cellphone1 = state.clients[index].cellphone1;
      state.clientCreate.cellphone2 = state.clients[index].cellphone2;
      state.clientCreate.vehicle1Plate = state.clients[index].vehicle1Plate;
      state.clientCreate.vehicle2Plate = state.clients[index].vehicle2Plate;
    },
    cleanCliCre(state){
      state.clientCreate.idPerson = -1;
      state.clientCreate.idClient = -1;
      state.clientCreate.documentNumber = '';
      state.clientCreate.firstName = '';
      state.clientCreate.middleName = '';
      state.clientCreate.fatherLastname = '';
      state.clientCreate.motherLastname = '';
      state.clientCreate.birthdate = '';
      state.clientCreate.nationality = '';
      state.clientCreate.flag = '';
      state.clientCreate.address = '';
      state.clientCreate.email1 = '';
      state.clientCreate.email2 = '';
      state.clientCreate.cellphone1 = '';
      state.clientCreate.cellphone2 = '';
      state.clientCreate.vehicle1Plate = '';
      state.clientCreate.vehicle2Plate = '';
    },
    cleanAccCre(state){
      state.accountCreate.idPerson = -1;
      state.accountCreate.idClient = -1;
      state.accountCreate.documentNumber = '';
      state.accountCreate.firstName = '';
      state.accountCreate.middleName = '';
      state.accountCreate.fatherLastname = '';
      state.accountCreate.motherLastname = '';
      state.accountCreate.birthdate = '';
      state.accountCreate.nationality = '';
      state.accountCreate.flag = '';
      state.accountCreate.address = '';
    },
    fillAccByCli(state,accountsData){
      state.accountsByClient = [];
      for(let i=0;i<accountsData.length;i++){
        state.accountsByClient.push({
            idAccount: accountsData[i].idAccount,
            accountNumber : accountsData[i].accountNumber,
            balance: accountsData[i].balance,
            openingDate: accountsData[i].openingDate,
            closingDate: accountsData[i].closingDate,
            cardNumber: accountsData[i].cardNumber,
            idAccountType: accountsData[i].idAccountType,
            idProduct: accountsData[i].idProduct,
            idCurrency : accountsData[i].idCurrency,
            idClient: accountsData[i].idClient,
            currencyName : accountsData[i].currencyName
        });
      }
    },
    setCampaignInd(state, index){
      state.selectedCampaignIndex = index;
      state.campaignCreate.idCampaign = state.campaigns[index].idCampaign,
      state.campaignCreate.name = state.campaigns[index].name,
      state.campaignCreate.month = state.campaigns[index].month,
      state.campaignCreate.startDate = state.campaigns[index].startDate,
      state.campaignCreate.endDate = state.campaigns[index].endDate,
      state.campaignCreate.minimumLoan = state.campaigns[index].minimumLoan,
      state.campaignCreate.maximumLoan = state.campaigns[index].maximumLoan,
      state.campaignCreate.minimumPeriod = state.campaigns[index].minimumPeriod,
      state.campaignCreate.maximumPeriod = state.campaigns[index].maximumPeriod,
      state.campaignCreate.interestRate = state.campaigns[index].interestRate,
      state.campaignCreate.idCurrency = state.campaigns[index].idCurrency,
      state.campaignCreate.active = state.campaigns[index].active
    },
    setLendingInd(state, index){
      state.selectedLendingIndex = index;
      state.lendingCreate.idLending = state.lendings[index].idLending,
      state.lendingCreate.feesNumber = state.lendings[index].feesNumber,
      state.lendingCreate.amount = state.lendings[index].amount,
      state.lendingCreate.feeType = state.lendings[index].feeType,
      state.lendingCreate.interestRate = state.lendings[index].interestRate,
      state.lendingCreate.firstName = state.lendings[index].firstName,
      state.lendingCreate.middleName = state.lendings[index].middleName,
      state.lendingCreate.fatherLastname = state.lendings[index].fatherLastname,
      state.lendingCreate.motherLastname = state.lendings[index].motherLastname,
      state.lendingCreate.birthdate = state.lendings[index].birthdate,
      state.lendingCreate.nationality = state.lendings[index].nationality,
      state.lendingCreate.address = state.lendings[index].address
    },
    fillSalesRecord(state, salesRecord_data){
      let aux=salesRecord_data.salesRecords;
      state.salesRecords=[];
      for(let i = 0; i < aux.length; i++){
        if(aux[i].activeSalesRecord){
          if(aux[i].productName == "Cuenta"){
            state.salesRecords.push({
              activeAccount : aux[i].activeAccount,
              balance : aux[i].balance,
              openingDate : aux[i].openingDate,
              closingDate : aux[i].closingDate,
              activeClient : aux[i].activeClient,
              accountNumber : aux[i].accountNumber,
              nameRecordStatus : aux[i].nameRecordStatus,
              firstName : aux[i].firstName,
              middleName : aux[i].middleName,
              fatherLastname : aux[i].fatherLastname,
              motherLastname : aux[i].motherLastname,
              birthdate : aux[i].birthdate,
              address : aux[i].address,
              nationality : aux[i].nationality,
              documentType : aux[i].documentType,
              documentNumber : aux[i].documentNumber,
              idSalesRecord : aux[i].idSalesRecord,
              origin : aux[i].origin,
              requestDate : aux[i].requestDate,
              activeSalesRecord : aux[i].activeSalesRecord,
              productName : aux[i].productName,
              activeLoan: false,
              totalShares: -1,
              interestRate: -1,
              shareType: '',
            });
          } else {
            state.salesRecords.push({
              activeLoan: aux[i].activeLoan,
              totalShares: aux[i].totalShares,
              interestRate: aux[i].interestRate,
              shareType: aux[i].shareType,
              activeClient : aux[i].activeClient,
              accountNumber : aux[i].accountNumber,
              nameRecordStatus : aux[i].nameRecordStatus,
              firstName : aux[i].firstName,
              middleName : aux[i].middleName,
              fatherLastname : aux[i].fatherLastname,
              motherLastname : aux[i].motherLastname,
              birthdate : aux[i].birthdate,
              address : aux[i].address,
              nationality : aux[i].nationality,
              documentType : aux[i].documentType,
              documentNumber : aux[i].documentNumber,
              idSalesRecord : aux[i].idSalesRecord,
              origin : aux[i].origin,
              requestDate : aux[i].requestDate,
              activeSalesRecord : aux[i].activeSalesRecord,
              productName : aux[i].productName,
              activeAccount : false,
              balance : -1,
              openingDate : '',
              closingDate : '',
            });
          }
        }
      }
    },
    fillSalesInd(state, index){
      state.selectedSalesIndex = index;
      if(state.salesRecords[index].productName == "Cuenta"){
        if(state.salesRecords[index].activeAccount){
          state.salesRecordCreate.activeAccount = "Activo"
        } else {
          state.salesRecordCreate.activeAccount = "Inactivo"
        }
        state.salesRecordCreate.balance = state.salesRecords[index].balance;
        state.salesRecordCreate.openingDate = state.salesRecords[index].openingDate;
        if(state.salesRecords[index].closingDate == "UNDEFINED"){
          state.salesRecordCreate.closingDate = "-";
        } else {
          state.salesRecordCreate.closingDate = state.salesRecords[index].closingDate;
        }
      } else {
        if(state.salesRecords[index].activeLoan == 1){
          state.salesRecordCreate.activeLoan = "Activo"
        } else {
          state.salesRecordCreate.activeLoan = "Inactivo"
        }
        state.salesRecordCreate.totalShares = state.salesRecords[index].totalShares;
        state.salesRecordCreate.interestRate = state.salesRecords[index].interestRate;
        state.salesRecordCreate.shareType = state.salesRecords[index].shareType;
      }
      if(state.salesRecords[index].activeClient){
        state.salesRecordCreate.activeClient = "Activo"
      } else {
        state.salesRecordCreate.activeClient = "Desafiliado"
      }
      state.salesRecordCreate.accountNumber = state.salesRecords[index].accountNumber;
      state.salesRecordCreate.nameRecordStatus = state.salesRecords[index].nameRecordStatus;
      state.salesRecordCreate.firstName = state.salesRecords[index].firstName;
      state.salesRecordCreate.middleName = state.salesRecords[index].middleName;
      state.salesRecordCreate.fatherLastname = state.salesRecords[index].fatherLastname;
      state.salesRecordCreate.motherLastname = state.salesRecords[index].motherLastname;
      state.salesRecordCreate.birthdate = state.salesRecords[index].birthdate;
      state.salesRecordCreate.address = state.salesRecords[index].address;
      state.salesRecordCreate.nationality = state.salesRecords[index].nationality;
      state.salesRecordCreate.documentType = state.salesRecords[index].documentType;
      state.salesRecordCreate.documentNumber = state.salesRecords[index].documentNumber;
      state.salesRecordCreate.idSalesRecord = state.salesRecords[index].idSalesRecord;
      state.salesRecordCreate.origin = state.salesRecords[index].origin;
      state.salesRecordCreate.requestDate = state.salesRecords[index].requestDate;
      if(state.salesRecords[index].activeSalesRecord){
        state.salesRecordCreate.activeSalesRecord = "Activo"
      } else {
        state.salesRecordCreate.activeSalesRecord = "Eliminado"
      }
      state.salesRecordCreate.productName = state.salesRecords[index].productName;
      state.salesRecordCreate.completeName = state.salesRecords[index].firstName + " " + state.salesRecords[index].fatherLastname;
    }
  },
  actions: {
      completeClients(context,clients_data){
        context.commit('fillClients',clients_data);
      },
      completeLendings(context, lendings_data){
        context.commit('fillLendings',lendings_data);
      },
      setLendingIndex(context, index){
        context.commit('setLendingInd', index);
      },
      setCampaignIndex(context, index){
        context.commit('setCampaignInd', index);
      },
      completeCampaigns(context, campaigns_data){
        context.commit('fillCampaigns',campaigns_data);
      },
      setToken(context,token){
        context.commit('setTok',token);
      },
      setAdmin(context, admin){
        context.commit('setAdm', admin);
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
      },
      completeAccounts(context, account_data){
        context.commit('fillAccounts', account_data);
      },
      completeAccountCreate(context, account_data){
        context.commit('fillAccountCreate', account_data);
      },
      cleanClientCreate(context){
        context.commit('cleanCliCre');
      },
      cleanAccountCreate(context){
        context.commit('cleanAccCre');
      },
      fillAccountsByClient(context,account_data){
        context.commit('fillAccByCli',account_data);
      },
      completeSalesRecords(context, salesRecord_data){
        context.commit('fillSalesRecord', salesRecord_data);
      },
      setSalesRecordIndex(context, index){
        context.commit('fillSalesInd', index);
      }
  }
})
