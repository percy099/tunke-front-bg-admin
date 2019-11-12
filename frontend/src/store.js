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
    campaigns:[],
    accounts: [],
    salesRecords: [],
    accountsByClient : [],
    campaigns: [],
    login_entry: false,
    countries : [],
    clientsBlackList:[],
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
      active : '',
      loanRange : '',
      periodRange : '',

    },
    lendingCreate :{
      idLoan : -1,
      totalShares: -1,
      amount : -1,
      interestRate: -1,
      idCampaign: -1,
      idClient: -1,
      idSalesRecord: -1,
      idShareType: -1,
      idAccount: -1,
      share: -1,
      active: -1,
      campaignName: '',
      accountNumber: '',
      currency: '',
      fullName: '',
      documentNumber: '',
      documentType: '',
      requestDate: '',
    },
    salesRecordCreate :{
      activeAccount : false,
      balance : 0.0,
      openingDate : '',
      closingDate : '',
      accountNumber : '',
      nationality : '',
      flag: '',
      activeClient : '',
      nameRecordStatus : '',
      firstName : '',
      middleName : '',
      fatherLastname : '',
      motherLastname : '',
      birthdate : '',
      address : '',
      documentType : '',
      documentNumber : -1,
      idSalesRecord : -1,
      origin : '',
      requestDate : '',
      activeSalesRecord : '',
      productName : '',
    },
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
      state.lendings=[];
        for (let i=0; i< lendings_data.length;i++){
          if(lendings_data[i].active){       
            state.lendings.push({
              idLoan : lendings_data[i].idLoan,
              totalShares : lendings_data[i].totalShares,
              amount : lendings_data[i].amount,
              interestRate : lendings_data[i].interestRate,
              idCampaign : lendings_data[i].idCampaign,
              idClient : lendings_data[i].idClient,
              idSalesRecord : lendings_data[i].idSalesRecord,
              idShareType : lendings_data[i].idShareType,
              idAccount : lendings_data[i].idAccount,
              share: lendings_data[i].share,
              active : lendings_data[i].active,
              campaignName : lendings_data[i].campaignName ,
              accountNumber : lendings_data[i].accountNumber,
              currency : lendings_data[i].currency,
              fullName : lendings_data[i].fullName,
              documentNumber : lendings_data[i].documentNumber,
              documentType : lendings_data[i].documentType,
              requestDate : lendings_data[i].requestDate,
              commission : lendings_data[i].commission
            });
          }
        }
    },

    fillCampaigns(state,campaigns_data){
      state.campaigns=[]; 
      for(let campaign of campaigns_data){
        if(campaign.active){
          state.campaigns.push({
            idCampaign : campaign.idCampaign,
            name : campaign.name,
            month : campaign.month,
            startDate : campaign.startDate,
            endDate : campaign.endDate,
            minimumLoan : campaign.minimumLoan,
            maximumLoan : campaign.maximumLoan,
            minimumPeriod : campaign.minimumPeriod,
            maximumPeriod : campaign.maximumPeriod,
            interestRate : campaign.interestRate,
            idCurrency : campaign.idCurrency,
            active : campaign.active
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
    fillClientsBlackList(state, clientsBlackList_data){
      state.clientsBlackList=[];
      for(let i=0; i<clientsBlackList_data.length;i++){
          state.clientsBlackList.push({
            idPerson : clientsBlackList_data[i].idPerson,
            documentNumber : clientsBlackList_data[i].documentNumber,
            firstName : clientsBlackList_data[i].firstName,
            fatherLastname : clientsBlackList_data[i].fatherLastname,
            reason : clientsBlackList_data[i].reason
          });
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
    fillLendingCreate(state,client_data){
      state.lendingCreate.idClient = client_data.idClient;
      state.lendingCreate.documentType = client_data.documentType;
      state.lendingCreate.documentNumber = client_data.documentNumber;
      state.lendingCreate.fullName = client_data.firstName + ' ' + client_data.fatherLastname;
    },
    fillLendingCreateCampaign(state,campaign_data){
      state.lendingCreate.idCampaign = campaign_data.idCampaign;
      state.lendingCreate.campaignName = campaign_data.name;
      state.lendingCreate.interestRate = campaign_data.interestRate;
      if(campaign_data.idCurrency==1){
        state.lendingCreate.currency='Soles'
      }else 
      state.lendingCreate.currency='Dólares'
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
    fillCampaignCreate(state, campaign_data){
      state.campaignCreate.idCampaign = campaign_data.idCampaign;
      state.campaignCreate.name = campaign_data.name;
      state.campaignCreate.month = campaign_data.month;
      state.campaignCreate.startDate = campaign_data.startDate;
      state.campaignCreate.endDate = campaign_data.endDate;
      state.campaignCreate.minimumLoan = campaign_data.minimumLoan;
      state.campaignCreate.maximumLoan = campaign_data.maximumLoan;
      state.campaignCreate.minimumPeriod = campaign_data.minimumPeriod;
      state.campaignCreate.maximumPeriod = campaign_data.maximumPeriod;
      state.campaignCreate.interestRate = campaign_data.interestRate;
      state.campaignCreate.idCurrency = campaign_data.idCurrency;
      state.campaignCreate.active = campaign_data.active;
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
    cleanCampCreate(state){
      state.campaignCreate.idCampaign = -1;
      state.campaignCreate.name = '';
      state.campaignCreate.month = '';
      state.campaignCreate.startDate = '';
      state.campaignCreate.endDate = '';
      state.campaignCreate.minimumLoan = '';
      state.campaignCreate.maximumLoan = '';
      state.campaignCreate.minimumPeriod = '';
      state.campaignCreate.maximumPeriod = '';
      state.campaignCreate.interestRate = '';
      state.campaignCreate.idCurrency = -1;
      state.campaignCreate.active = '';
      state.campaignCreate.loanRange = '';
      state.campaignCreate.periodRange = '';
    },
    cleanLendCre(state) {
      state.lendingCreate.idLoan = -1;
      state.lendingCreate.totalShares = '';
      state.lendingCreate.amount = '';
      state.lendingCreate.interestRate = '';
      state.lendingCreate.idCampaign = -1;
      state.lendingCreate.idClient = -1;
      state.lendingCreate.idSalesRecord = -1;
      state.lendingCreate.idShareType= -1;
      state.lendingCreate.idAccount = -1;
      state.lendingCreate.share = '';
      state.lendingCreate.active = '';
      state.lendingCreate.campaignName = '';
      state.lendingCreate.accountNumber = '';
      state.lendingCreate.currency = '';
      state.lendingCreate.fullName = '';
      state.lendingCreate.documentNumber = '';
      state.lendingCreate.documentType = '';
      state.lendingCreate.requestDate = '';
      state.lendingCreate.commission = '';
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
      state.campaignCreate.idCampaign = state.campaigns[index].idCampaign;
      state.campaignCreate.name = state.campaigns[index].name;
      state.campaignCreate.month = state.campaigns[index].month;
      state.campaignCreate.startDate = state.campaigns[index].startDate;
      state.campaignCreate.endDate = state.campaigns[index].endDate;
      state.campaignCreate.minimumLoan = state.campaigns[index].minimumLoan;
      state.campaignCreate.maximumLoan = state.campaigns[index].maximumLoan;
      state.campaignCreate.minimumPeriod = state.campaigns[index].minimumPeriod;
      state.campaignCreate.maximumPeriod = state.campaigns[index].maximumPeriod;
      state.campaignCreate.interestRate = state.campaigns[index].interestRate;
      state.campaignCreate.idCurrency = state.campaigns[index].idCurrency;
      if(state.campaigns[index].active == 1){
        state.campaignCreate.active = 'Activo'
      }
      /*Que percy me mande la moneda*/
      if(state.campaigns[index].idCurrency == 1){
        state.campaignCreate.loanRange = "De " + state.campaignCreate.minimumLoan + " a " + state.campaignCreate.maximumLoan + " soles";
      } else {
        state.campaignCreate.loanRange = "De " + state.campaignCreate.minimumLoan + " a " + state.campaignCreate.maximumLoan + " dólares";
      }
      state.campaignCreate.periodRange = "De " + state.campaignCreate.minimumPeriod + " a " + state.campaignCreate.maximumPeriod + " meses";
      console.log(state.campaignCreate.startDate);
    },
    setLendingInd(state, index){
      state.selectedLendingIndex = index;
      state.lendingCreate.idLoan = state.lendings[index].idLoan;
      state.lendingCreate.totalShares = state.lendings[index].totalShares;
      state.lendingCreate.amount = state.lendings[index].amount;
      state.lendingCreate.interestRate = state.lendings[index].interestRate;
      state.lendingCreate.idCampaign = state.lendings[index].idCampaign;
      state.lendingCreate.idClient = state.lendings[index].idClient;
      state.lendingCreate.idSalesRecord = state.lendings[index].idSalesRecord;
      state.lendingCreate.idShareType = state.lendings[index].idShareType;
      state.lendingCreate.idAccount = state.lendings[index].idAccount;
      state.lendingCreate.share = state.lendings[index].share;
      state.lendingCreate.active = state.lendings[index].active;
      state.lendingCreate.campaignName = state.lendings[index].campaignName;
      state.lendingCreate.accountNumber = state.lendings[index].accountNumber;
      state.lendingCreate.currency = state.lendings[index].currency;
      state.lendingCreate.fullName = state.lendings[index].fullName;
      state.lendingCreate.documentNumber = state.lendings[index].documentNumber;
      state.lendingCreate.documentType = state.lendings[index].documentType;
      state.lendingCreate.requestDate = state.lendings[index].requestDate;
      state.lendingCreate.commission = state.lendings[index].commission;
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
    },

    setActCampaign(state, flag){
      /*
        0: Ver Campaña
        1: Crear Campaña
        2: Editar Campaña
      */
      state.editCampaign = flag;
    }
  },
  actions: {
      completeClients(context,clients_data){
        context.commit('fillClients',clients_data);
      },
      completeClientsBlackList(context,clientsBlackList_data){
        context.commit('fillClientsBlackList',clientsBlackList_data);
      },
      completeLendings(context, lendings_data){
        context.commit('fillLendings',lendings_data);
      },
      completeCampaigns(context, campaigns_data){
        context.commit('fillCampaigns',campaigns_data);
      },
      setLendingIndex(context, index){
        context.commit('setLendingInd', index);
      },
      completeLendingCreate(context,client_data){
        context.commit('fillLendingCreate',client_data);
      },
      completeLendingCreateCampaign(context,campaign_data){
        context.commit('fillLendingCreateCampaign',campaign_data);
      },
      setCampaignIndex(context, index){
        context.commit('setCampaignInd', index);
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
      setActionCampaign(context,edit){
        context.commit('setActCampaign',edit);
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
      completeCampaignCreate(context,campaign_data){
        context.commit('fillCampaignCreate',campaign_data);
      },
      cleanClientCreate(context){
        context.commit('cleanCliCre');
      },
      cleanAccountCreate(context){
        context.commit('cleanAccCre');
      },
      cleanLendingCreate(context){
        context.commit('cleanLendCre');
      },
      fillAccountsByClient(context,account_data){
        context.commit('fillAccByCli',account_data);
      },
      completeSalesRecords(context, salesRecord_data){
        context.commit('fillSalesRecord', salesRecord_data);
      },
      setSalesRecordIndex(context, index){
        context.commit('fillSalesInd', index);
      },
      setActionCampaign(context, flag){
        context.commit('setActCampaign', flag);
      },
      cleanCampaignCreate(context){
        context.commit('cleanCampCreate');
      }
  }
})
