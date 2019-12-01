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
      name : "",
      idProfile : -1,
      charge : ''
    },
    prueba: false,
    /*Ronaldo*/
    listCntDollar: [0,0,0,0,0,0,0,0,0,0,0,0],
    listCntSoles: [0,0,0,0,0,0,0,0,0,0,0,0],
    listCntLend: [0,0,0,0,0,0,0,0,0,0,0,0],
    listAmountLendSoles: [0,0,0,0,0,0,0,0,0,0,0,0],
    listAmountLendDollar: [0,0,0,0,0,0,0,0,0,0,0,0],
    listBalanceAccountSoles: [0,0,0,0,0,0,0,0,0,0,0,0],
    listBalanceAccountDollar: [0,0,0,0,0,0,0,0,0,0,0,0],
    listDataNumMonth: [0,0,0,0,0,0,0,0,0,0,0,0],
    accountsBoth: [],
    /*Ronaldo*/
    parameterSetting:{
      maxTokenSends: '',
      maxDiaryMovements : '',
      legalAge : '',
      maxAccountsNumber : '',
      commissionPercentage:'',
    },    
    quantityAmountSolesJan: 0,
    quantityAmountSolesFeb: 0,
    quantityAmountSolesMar: 0,
    quantityAmountSolesApr: 0,
    quantityAmountSolesMay: 0,
    quantityAmountSolesJun: 0,
    quantityAmountSolesJul: 0,
    quantityAmountSolesAug: 0,
    quantityAmountSolesSep: 0,
    quantityAmountSolesOct: 0,
    quantityAmountSolesNov: 0,
    quantityAmountSolesDec: 0,
    amountBankAccountSoles: 0,
    quantityAmountDollarJan: 0,
    quantityAmountDollarFeb: 0,
    quantityAmountDollarMar: 0,
    quantityAmountDollarApr: 0,
    quantityAmountDollarMay: 0,
    quantityAmountDollarJun: 0,
    quantityAmountDollarJul: 0,
    quantityAmountDollarAug: 0,
    quantityAmountDollarSep: 0,
    quantityAmountDollarOct: 0,
    quantityAmountDollarNov: 0,
    quantityAmountDollarDec: 0,
    amountBankAccountDollar: 0,
    token : '',
    clients : [],
    lendings: [],
    campaigns:[],
    accounts: [],
    transactions: [],
    transactionsSoles: [],
    transactionsDollar: [],
    salesRecords: [],
    accountsByClient : [],
    leadsByCampaign : [],
    campaigns: [],
    bankAccounts:[],
    login_entry: false,
    countries : [],
    clientsBlackList:[],
    editLead: 0,
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
      //minimumLoan : -1,
      //maximumLoan : -1,
      //minimumPeriod : -1,
      //maximumPeriod : -1,
      //interestRate : -1,
      idCurrency : -1,
      active : '',
      creationDate:'',
      //loanRange : '',
      //periodRange : '',

    },
    lendingCreate :{
      idLoan : -1,
      totalShares: -1,
      amount : -1,
      interestRate: -1,
      idClient: -1,
      idSalesRecord: -1,
      idShareType: -1,
      idAccount: -1,
      idLead: -1,
      share: -1,
      commission: -1,
      active: -1,
      campaignName: '',
      accountNumber: '',
      currency: '',
      fullName: '',
      documentNumber: '',
      documentType: '',
      requestDate: '', 
      idRecordStatus:-1,     
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
      completeName : '',
      /*  info del préstamo */ 
      activeLoan: false,
      totalShares: -1,
      interestRate: -1,
      shareType: '',
      idLoan: -1,
    },
    leadCreate :{
      idLead: -1,
      minimumLoan: '',
      maximumLoan: '',
      active: -1,
      idCampaign: -1,
      idClient: -1,
      nationality: '',
      flag: '',
      documentNumber: -1,
      firstName: '',
      middleName: '',
      fatherLastname: '',
      motherLastname: '',
      birthdate: ''
    },
    person:{
      idProspectiveClient: -1,
      lastEnterDate: new Date,
      enterCount : -1,
      email1 : '',
      email2 : '',
      cellphone1 : '',
      cellphone2 : '',
      idPerson : -1,
      idClient:-1,
      documentType : '',
      documentNumber : '',
      firstName : '',
      middleName : '',
      fatherLastname : '',
      motherLastname : '',
      birthdate : '',
      address : '',
      nationality : '',
      vehicle1Plate : '',
      vehicle2Plate : '',
      activeCampaigns:'',
      activeLoans: '',
      campaign:{
          active:'',
          endDate:'',
          idCampaign:'',
          idCurrency: '',
          //interestRate: '',
          //maximumLoan: '',
          //maximumPeriod: '',
          //minimumLoan: '',
          //minimumPeriod: '',
          creationDate:'',
          month: '',
          name: '',
          startDate: ''
      },
      idLead:'',
      totalAccounts: 0
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
    fillPersonData(state,person_data){
      state.person.idPerson = person_data.idPerson;
      state.person.documentType = person_data.documentType;
      state.person.documentNumber = person_data.documentNumber;
      state.person.firstName = person_data.firstName;
      state.person.middleName = person_data.middleName;
      state.person.fatherLastname = person_data.fatherLastname;
      state.person.motherLastname = person_data.motherLastname;
      state.person.birthdate = person_data.birthdate;
      state.person.address = person_data.address;
      state.person.nationality = person_data.nationality;
      state.person.vehicle1Plate = person_data.vehicle1Plate;
      state.person.vehicle2Plate = person_data.vehicle2Plate;
      state.person.email1  = person_data.email1 ;
      state.person.email2  = person_data.email2 ;
      state.person.cellphone1   = person_data.cellphone1  ;
      state.person.cellphone2  = person_data.cellphone2 ;
      state.person.idClient  = person_data.idClient ;

      state.person.activeCampaigns=person_data.activeCampaigns;
      state.person.activeLoans=person_data.activeLoans;
      state.person.totalAccounts=person_data.totalAccounts;

      if (person_data.activeCampaigns){        
        state.person.campaign=person_data.campaign;
        state.person.idLead=person_data.idLead;
      }
    },
    fillLendings(state,lendings_data){
      state.lendings=[];
      for (let i=0; i< lendings_data.length;i++){
        if(lendings_data[i].active && (lendings_data[i].idRecordStatus==1 || lendings_data[i].idRecordStatus==2)){       
          state.lendings.push({
            idLoan : lendings_data[i].idLoan,
            totalShares : lendings_data[i].totalShares,
            amount : lendings_data[i].amount,
            interestRate : lendings_data[i].interestRate,            
            idClient : lendings_data[i].idClient,
            idSalesRecord : lendings_data[i].idSalesRecord,
            idShareType : lendings_data[i].idShareType,
            idAccount : lendings_data[i].idAccount,
            idLead : lendings_data[i].idLead,
            share : lendings_data[i].share,
            commission : lendings_data[i].commission,
            active : lendings_data[i].active,
            campaignName : lendings_data[i].campaignName ,
            accountNumber : lendings_data[i].accountNumber,
            currency : lendings_data[i].currency,            
            fullName : lendings_data[i].fullName,
            documentNumber : lendings_data[i].documentNumber,
            documentType : lendings_data[i].documentType,
            requestDate : lendings_data[i].requestDate,
            idRecordStatus : lendings_data[i].idRecordStatus,
          });
          //console.log(lendings_data[i].currency);
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
            //minimumLoan : campaign.minimumLoan,
            //maximumLoan : campaign.maximumLoan,
            //minimumPeriod : campaign.minimumPeriod,
            //maximumPeriod : campaign.maximumPeriod,
            //interestRate : campaign.interestRate,
            idCurrency : campaign.idCurrency,
            active : campaign.active,
            creationDate : campaign.creationDate
          });
        }
      }
    },
    fillBankAccount(state,bankAccount_data){
      state.bankAccounts=[]; 
      state.amountBankAccountSoles=0;
      state.amountBankAccountDollar=0;
      for(let bankAccount of bankAccount_data){
        if(bankAccount.active){
          state.bankAccounts.push({
            idBankAccount : bankAccount.idBankAccount,
            accountNumber : bankAccount.accountNumber,
            balance : bankAccount.balance,
            idCurrency : bankAccount.idCurrency,
            active : bankAccount.active
          });
          if(bankAccount.idCurrency==1){
            state.amountBankAccountSoles = bankAccount.balance;
          } else if(bankAccount.idCurrency==2){
            state.amountBankAccountDollar = bankAccount.balance;
          } 
        }
      }
    },
    
    fillTransaction(state,transaction_data){
      state.transactions=[]; 
      for(let transaction of transaction_data){
          state.transactions.push({
            id : transaction.id,
            datetime : transaction.datetime,
            amount : transaction.amount,
            accountNumber : transaction.accountNumber,
            bankAccountNumber : transaction.bankAccountNumber,
            currency : transaction.currency
          });
      }
    },
    fillTransactionSoles(state,transactionSoles_data){
      state.transactionsSoles=[]; 
      state.quantityAmountSolesJan = 0;
      state.quantityAmountSolesFeb = 0;
      state.quantityAmountSolesMar = 0;
      state.quantityAmountSolesApr = 0;
      state.quantityAmountSolesMay = 0;
      state.quantityAmountSolesJun = 0;
      state.quantityAmountSolesJul = 0;
      state.quantityAmountSolesAug = 0;
      state.quantityAmountSolesSep = 0;
      state.quantityAmountSolesOct = 0;
      state.quantityAmountSolesNov = 0;
      state.quantityAmountSolesDec = 0; 
      for(let transaction of transactionSoles_data){
        if(transaction.currency=="Soles"){
          state.transactionsSoles.push({
            id : transaction.id,
            datetime : transaction.datetime,
            amount : transaction.amount,
            accountNumber : transaction.accountNumber,
            bankAccountNumber : transaction.bankAccountNumber,
            currency : transaction.currency
          });
          let str=transaction.datetime; //'2019-11-16'
          //console.log("transacciones soles: " + transaction.amount);
          let res=str.substring(5,7);
          if(res=='12'){
            state.quantityAmountSolesDec = state.quantityAmountSolesDec + transaction.amount;
          }else if(res=='11'){
            state.quantityAmountSolesNov = state.quantityAmountSolesNov + transaction.amount;
          }else if(res=='10'){
            state.quantityAmountSolesOct = state.quantityAmountSolesOct + transaction.amount;
          }else if(res=='09'){
            state.quantityAmountSolesSep = state.quantityAmountSolesSep + transaction.amount;
          }else if(res=='08'){
            state.quantityAmountSolesAug = state.quantityAmountSolesAug + transaction.amount;
          }else if(res=='07'){
            state.quantityAmountSolesJul = state.quantityAmountSolesJul + transaction.amount;
          }else if(res=='06'){
            state.quantityAmountSolesJun = state.quantityAmountSolesJun + transaction.amount;
          }else if(res=='05'){
            state.quantityAmountSolesMay = state.quantityAmountSolesMay + transaction.amount;
          }else if(res=='04'){
            state.quantityAmountSolesApr = state.quantityAmountSolesApr + transaction.amount;
          }else if(res=='03'){
            state.quantityAmountSolesMar = state.quantityAmountSolesMar + transaction.amount;
          }else if(res=='02'){
            state.quantityAmountSolesFeb = state.quantityAmountSolesFeb + transaction.amount;
          }else if(res=='01'){
            state.quantityAmountSolesJan = state.quantityAmountSolesJan + transaction.amount;
          }
        }
      }
    },
    fillTransactionDollar(state,transactionDollar_data){
      state.transactionsDollar=[];
      state.quantityAmountDollarJan = 0;
      state.quantityAmountDollarFeb = 0;
      state.quantityAmountDollarMar = 0;
      state.quantityAmountDollarApr = 0;
      state.quantityAmountDollarMay = 0;
      state.quantityAmountDollarJun = 0;
      state.quantityAmountDollarJul = 0;
      state.quantityAmountDollarAug = 0;
      state.quantityAmountDollarSep = 0;
      state.quantityAmountDollarOct = 0;
      state.quantityAmountDollarNov = 0;
      state.quantityAmountDollarDec = 0;
      for(let transaction of transactionDollar_data){
        if(transaction.currency=="Dólares"){
          state.transactionsDollar.push({
            id : transaction.id,
            datetime : transaction.datetime,
            amount : transaction.amount,
            accountNumber : transaction.accountNumber,
            bankAccountNumber : transaction.bankAccountNumber,
            currency : transaction.currency
          });
          let str=transaction.datetime; //'2019-11-16'
          //console.log("transacciones dólares: " + transaction.amount);
          let res=str.substring(5,7);
          if(res=='12'){
            state.quantityAmountDollarDec = state.quantityAmountDollarDec + transaction.amount;
          }else if(res=='11'){
            state.quantityAmountDollarNov = state.quantityAmountDollarNov + transaction.amount;
          }else if(res=='10'){
            state.quantityAmountDollarOct = state.quantityAmountDollarOct + transaction.amount;
          }else if(res=='09'){
            state.quantityAmountDollarSep = state.quantityAmountDollarSep + transaction.amount;
          }else if(res=='08'){
            state.quantityAmountDollarAug = state.quantityAmountDollarAug + transaction.amount;
          }else if(res=='07'){
            state.quantityAmountDollarJul = state.quantityAmountDollarJul + transaction.amount;
          }else if(res=='06'){
            state.quantityAmountDollarJun = state.quantityAmountDollarJun + transaction.amount;
          }else if(res=='05'){
            state.quantityAmountDollarMay = state.quantityAmountDollarMay + transaction.amount;
          }else if(res=='04'){
            state.quantityAmountDollarApr = state.quantityAmountDollarApr + transaction.amount;
          }else if(res=='03'){
            state.quantityAmountDollarMar = state.quantityAmountDollarMar + transaction.amount;
          }else if(res=='02'){
            state.quantityAmountDollarFeb = state.quantityAmountDollarFeb + transaction.amount;
          }else if(res=='01'){
            state.quantityAmountDollarJan = state.quantityAmountDollarJan + transaction.amount;
          }
        } 
      }
    },

    /*Ronaldo*/
    countAccountPerMonth(state,account_data){
      let aux=account_data.accounts;
      state.countAccount=[];
      for(let i=0;i<aux.length;i++){
        var str=aux.openingDate; //'12-12-2019'
        var res=str.substring(3,5);
        if(res=='12'){
          let i=11;
          state.countAccount[i]=state.countAccount[i]+1;
        }else if(res=='11'){
          
          let i=10;
          state.countAccount[i]=state.countAccount[i]+1;
        }else if(res=='10'){
        
          let i=9;
          state.countAccount[i]=state.countAccount[i]+1;
        }else if(res=='09'){
          
          let i=8;
          state.countAccount[i]=state.countAccount[i]+1;
        }else if(res=='08'){
          
          let i=7;
          state.countAccount[i]=state.countAccount[i]+1;
        }else if(res=='07'){
          
          let i=6;
          state.countAccount[i]=state.countAccount[i]+1;
        }else if(res=='06'){
          
          let i=5;
          state.countAccount[i]=state.countAccount[i]+1;
        }else if(res=='05'){
          
          let i=4;
          state.countAccount[i]=state.countAccount[i]+1;
        }else if(res=='04'){
          
          let i=3;
          state.countAccount[i]=state.countAccount[i]+1;
        }else if(res=='03'){
          
          let i=2;
          state.countAccount[i]=state.countAccount[i]+1;
        }else if(res=='02'){
          
          let i=1;
          state.countAccount[i]=state.countAccount[i]+1;
        }else if(res=='01'){
          
          let i=0;
          state.countAccount[i]=state.countAccount[i]+1;
        }
      }
    },
    /*Ronaldo*/
    // Lending Charts
    fillDataLendingMonth(state, year){
      state.listCntLend = [0,0,0,0,0,0,0,0,0,0,0,0];
      let aux = state.lendings;      
      for (let i = 0; i < aux.length; i++){
        let str = aux[i].requestDate;
        let mm = str.substring(3,5);
        let yy = str.substring(6,10);
        if (mm == '12' && yy == year){
          state.listCntLend[11]++;
        }else if(mm == '11' && yy == year){
          state.listCntLend[10]++;
        }else if(mm == '10' && yy == year){
          state.listCntLend[9]++;
        }else if(mm == '09' && yy == year){
          state.listCntLend[8]++;
        }else if(mm == '08' && yy == year){
          state.listCntLend[7]++;
        }else if(mm == '07' && yy == year){
          state.listCntLend[6]++;
        }else if(mm == '06' && yy == year){
          state.listCntLend[5]++;
        }else if(mm == '05' && yy == year){
          state.listCntLend[4]++;
        }else if(mm == '04' && yy == year){
          state.listCntLend[3]++;
        }else if(mm == '03' && yy == year){
          state.listCntLend[2]++;
        }else if(mm == '02' && yy == year){
          state.listCntLend[1]++;
        }else if(mm == '01' && yy == year){
          state.listCntLend[0]++;
        }else{
          state.listCntLend = [0,0,0,0,0,0,0,0,0,0,0,0];
        }
      }
    },
    fillDataAmountLendMonth(state, year){
      state.listAmountLendSoles = [0,0,0,0,0,0,0,0,0,0,0,0];
      state.listAmountLendDollar = [0,0,0,0,0,0,0,0,0,0,0,0];
      let aux = state.lendings;      
      for (let i = 0; i < aux.length; i++){
        let str = aux[i].requestDate;
        let mm = str.substring(3,5);
        let yy = str.substring(6,10);        
        if (mm == '12' && yy == year){         
          if (aux[i].currency == 'Soles'){
            state.listAmountLendSoles[11] += aux[i].amount;
          }else{
            state.listAmountLendDollar[11] += aux[i].amount;
          }
        }else if (mm == '11' && yy == year){
          if (aux[i].currency == 'Soles'){
            state.listAmountLendSoles[10] += aux[i].amount;
          }else{
            state.listAmountLendDollar[10] += aux[i].amount;
          }        
        }else if (mm == '10' && yy == year){
          if (aux[i].currency == 'Soles'){
            state.listAmountLendSoles[9] += aux[i].amount;
          }else{
            state.listAmountLendDollar[9] += aux[i].amount;
          }
        }else if (mm == '09' && yy == year){
          if (aux[i].currency == 'Soles'){
            state.listAmountLendSoles[8] += aux[i].amount;
          }else{
            state.listAmountLendDollar[8] += aux[i].amount;
          }
        }else if (mm == '08' && yy == year){
          if (aux[i].currency == 'Soles'){
            state.listAmountLendSoles[7] += aux[i].amount;
          }else{
            state.listAmountLendDollar[7] += aux[i].amount;
          }
        }else if (mm == '07' && yy == year){
          if (aux[i].currency == 'Soles'){
            state.listAmountLendSoles[6] += aux[i].amount;
          }else{
            state.listAmountLendDollar[6] += aux[i].amount;
          }
        }else if (mm == '06' && yy == year){
          if (aux[i].currency == 'Soles'){
            state.listAmountLendSoles[5] += aux[i].amount;
          }else{
            state.listAmountLendDollar[5] += aux[i].amount;
          }
        }else if (mm == '05' && yy == year){
          if (aux[i].currency == 'Soles'){
            state.listAmountLendSoles[4] += aux[i].amount;
          }else{
            state.listAmountLendDollar[4] += aux[i].amount;
          }
        }else if (mm == '04' && yy == year){
          if (aux[i].currency == 'Soles'){
            state.listAmountLendSoles[3] += aux[i].amount;
          }else{
            state.listAmountLendDollar[3] += aux[i].amount;
          }
        }else if (mm == '03' && yy == year){
          if (aux[i].currency == 'Soles'){
            state.listAmountLendSoles[2] += aux[i].amount;
          }else{
            state.listAmountLendDollar[2] += aux[i].amount;
          }
        }else if (mm == '02' && yy == year){
          if (aux[i].currency == 'Soles'){
            state.listAmountLendSoles[1] += aux[i].amount;
          }else{
            state.listAmountLendDollar[1] += aux[i].amount;
          }
        }else if (mm == '01' && yy == year){
          if (aux[i].currency == 'Soles'){
            state.listAmountLendSoles[0] += aux[i].amount;
          }else{
            state.listAmountLendDollar[0] += aux[i].amount;
          }
        }
      }
    },
    // Account Charts
    // Chart 1
    fillDataNumMonth(state, year){
      state.listDataNumMonth = [0,0,0,0,0,0,0,0,0,0,0,0];
      let aux = state.accountsBoth;
      for (let i = 0; i < aux.length; i++){
        let str = aux[i].openingDate;
        let mm = str.substring(3,5);
        let yy = str.substring(6,10);
        if (mm == '12' && yy == year){
          state.listDataNumMonth[11]++;
        }else if (mm == '11' && yy == year){
          state.listDataNumMonth[10]++;
        }else if (mm == '10' && yy == year){
          state.listDataNumMonth[9]++;
        }else if (mm == '09' && yy == year){
          state.listDataNumMonth[8]++;
        }else if (mm == '08' && yy == year){
          state.listDataNumMonth[7]++;
        }else if (mm == '07' && yy == year){
          state.listDataNumMonth[6]++;
        }else if (mm == '06' && yy == year){
          state.listDataNumMonth[5]++;
        }else if (mm == '05' && yy == year){
          state.listDataNumMonth[4]++;
        }else if (mm == '04' && yy == year){
          state.listDataNumMonth[3]++;
        }else if (mm == '03' && yy == year){
          state.listDataNumMonth[2]++;
        }else if (mm == '02' && yy == year){
          state.listDataNumMonth[1]++;
        }else if (mm == '01' && yy == year){
          state.listDataNumMonth[0]++;
        }
      }
    },    
    // Chart 2
    fillDataAccountTypeMonth(state, year){
      state.listCntDollar=[0,0,0,0,0,0,0,0,0,0,0,0];
      state.listCntSoles=[0,0,0,0,0,0,0,0,0,0,0,0];
      let aux=state.accountsBoth;
      for(let i = 0; i < aux.length; i++){
        let str=aux[i].openingDate; //'12-12-2019'
        let res=str.substring(3,5);
        let yy=str.substring(6,10);
        if(res=='12' && yy==year){                   
          if(aux[i].idCurrency==2){          
            state.listCntDollar[11]++;            
          }else{
            state.listCntSoles[11]++;
          }                      
        }else if(res=='11' && yy==year){          
          if(aux[i].idCurrency==2){          
            state.listCntDollar[10]++;            
          }else{
            state.listCntSoles[10]++;
          }         
        }else if(res=='10' && yy==year){          
          if(aux[i].idCurrency==2){          
            state.listCntDollar[9]++;            
          }else{
            state.listCntSoles[9]++;
          }
        }else if(res=='09' && yy==year){          
          if(aux[i].idCurrency==2){          
            state.listCntDollar[8]++;            
          }else{
            state.listCntSoles[8]++;
          }
        }else if(res=='08' && yy==year){          
          if(aux[i].idCurrency==2){          
            state.listCntDollar[7]++;            
          }else{
            state.listCntSoles[7]++;
          }
        }else if(res=='07' && yy==year){          
          if(aux[i].idCurrency==2){          
            state.listCntDollar[6]++;            
          }else{
            state.listCntSoles[6]++;
          }
        }else if(res=='06' && yy==year){          
          if(aux[i].idCurrency==2){          
            state.listCntDollar[5]++;            
          }else{
            state.listCntSoles[5]++;
          }
        }else if(res=='05' && yy==year){          
          if(aux[i].idCurrency==2){          
            state.listCntDollar[4]++;            
          }else{
            state.listCntSoles[4]++;
          }
        }else if(res=='04' && yy==year){          
          if(aux[i].idCurrency==2){          
            state.listCntDollar[3]++;            
          }else{
            state.listCntSoles[3]++;
          }
        }else if(res=='03' && yy==year){          
          if(aux[i].idCurrency==2){          
            state.listCntDollar[2]++;            
          }else{
            state.listCntSoles[2]++;
          }
        }else if(res=='02' && yy==year){
          if(aux[i].idCurrency==2){          
            state.listCntDollar[1]++;            
          }else{
            state.listCntSoles[1]++;
          }
        }else if(res=='01' && yy==year){          
          if(aux[i].idCurrency==2){          
            state.listCntDollar[0]++;            
          }else{
            state.listCntSoles[0]++;
          }
        }
      }
    },      
    // Chart 3
    // Cambiar lógica
    fillDataBalanceMonth(state, year){
      state.listBalanceAccountSoles = [0,0,0,0,0,0,0,0,0,0,0,0];
      state.listBalanceAccountDollar = [0,0,0,0,0,0,0,0,0,0,0,0];
      let aux = state.accounts;
      for (let i = 0; i < aux.length; i++){
        let str = aux[i].openingDate;
        let idCurrency = aux[i].idCurrency;
        let mm = str.substring(3,5);
        let yy = parseInt(str.substring(6,10));
        let yearInt = parseInt(year);
        if (mm == '12' && yy <= yearInt){
          if(idCurrency == 1){
            state.listBalanceAccountSoles[11] += aux[i].balance;
          } else if (idCurrency == 2){
            state.listBalanceAccountDollar[11] += aux[i].balance;
          }         
        }else if (mm == '11' && yy <= yearInt){
          if(idCurrency == 1){
            state.listBalanceAccountSoles[10] += aux[i].balance;
          } else if (idCurrency == 2){
            state.listBalanceAccountDollar[10] += aux[i].balance;
          }         
        }else if (mm == '10' && yy <= yearInt){
          if(idCurrency == 1){
            state.listBalanceAccountSoles[9] += aux[i].balance;
          } else if (idCurrency == 2){
            state.listBalanceAccountDollar[9] += aux[i].balance;
          } 
        }else if (mm == '09' && yy <= yearInt){
          if(idCurrency == 1){
            state.listBalanceAccountSoles[8] += aux[i].balance;
          } else if (idCurrency == 2){
            state.listBalanceAccountDollar[8] += aux[i].balance;
          } 
        }else if (mm == '08' && yy <= yearInt){
          if(idCurrency == 1){
            state.listBalanceAccountSoles[7] += aux[i].balance;
          } else if (idCurrency == 2){
            state.listBalanceAccountDollar[7] += aux[i].balance;
          } 
        }else if (mm == '07' && yy <= yearInt){
          if(idCurrency == 1){
            state.listBalanceAccountSoles[6] += aux[i].balance;
          } else if (idCurrency == 2){
            state.listBalanceAccountDollar[6] += aux[i].balance;
          } 
        }else if (mm == '06' && yy <= yearInt){
          if(idCurrency == 1){
            state.listBalanceAccountSoles[5] += aux[i].balance;
          } else if (idCurrency == 2){
            state.listBalanceAccountDollar[5] += aux[i].balance;
          } 
        }else if (mm == '05' && yy <= yearInt){
          if(idCurrency == 1){
            state.listBalanceAccountSoles[4] += aux[i].balance;
          } else if (idCurrency == 2){
            state.listBalanceAccountDollar[4] += aux[i].balance;
          } 
        }else if (mm == '04' && yy <= yearInt){
          if(idCurrency == 1){
            state.listBalanceAccountSoles[3] += aux[i].balance;
          } else if (idCurrency == 2){
            state.listBalanceAccountDollar[3] += aux[i].balance;
          } 
        }else if (mm == '03' && yy <= yearInt){
          if(idCurrency == 1){
            state.listBalanceAccountSoles[2] += aux[i].balance;
          } else if (idCurrency == 2){
            state.listBalanceAccountDollar[2] += aux[i].balance;
          } 
        }else if (mm == '02' && yy <= yearInt){
          if(idCurrency == 1){
            state.listBalanceAccountSoles[1] += aux[i].balance;
          } else if (idCurrency == 2){
            state.listBalanceAccountDollar[1] += aux[i].balance;
          } 
        }else if (mm == '01' && yy <= yearInt){
          if(idCurrency == 1){
            state.listBalanceAccountSoles[0] += aux[i].balance;
          } else if (idCurrency == 2){
            state.listBalanceAccountDollar[0] += aux[i].balance;
          } 
        }
      }
    },
    /*Ronaldo*/
    fillAccounts(state, account_data){
      let aux=account_data.accounts;
      state.accounts=[];
      state.accountsBoth=[];
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
          });
          state.accountsBoth.push({
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
        }else{
          state.accountsBoth.push({
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
          });
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
      state.user.idProfile = admin.idProfile;
      state.user.charge = admin.charge;
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
      state.clientCreate.idClient = person_data.idClient;
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
      //state.lendingCreate.interestRate = campaign_data.interestRate;
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
      //state.campaignCreate.minimumLoan = campaign_data.minimumLoan;
      //state.campaignCreate.maximumLoan = campaign_data.maximumLoan;
      //state.campaignCreate.minimumPeriod = campaign_data.minimumPeriod;
      //state.campaignCreate.maximumPeriod = campaign_data.maximumPeriod;
      //state.campaignCreate.interestRate = campaign_data.interestRate;
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
      //state.campaignCreate.minimumLoan = '';
      //state.campaignCreate.maximumLoan = '';
      //state.campaignCreate.minimumPeriod = '';
      //state.campaignCreate.maximumPeriod = '';
      //state.campaignCreate.interestRate = '';
      state.campaignCreate.idCurrency = -1;
      state.campaignCreate.active = '';
      state.campaignCreate.creationDate='';
      //state.campaignCreate.loanRange = '';
      //state.campaignCreate.periodRange = '';
    },
    cleanLendCre(state) {
      state.lendingCreate.idLoan = -1;
      state.lendingCreate.totalShares = '';
      state.lendingCreate.amount = '';
      state.lendingCreate.interestRate = '';
      state.lendingCreate.idClient = -1;
      state.lendingCreate.idSalesRecord = -1;
      state.lendingCreate.idShareType= -1;
      state.lendingCreate.idAccount = -1;
      state.lendingCreate.idLead = -1;
      state.lendingCreate.share = '';
      state.lendingCreate.commission = '';
      state.lendingCreate.active = '';
      state.lendingCreate.campaignName = '';
      state.lendingCreate.accountNumber = '';
      state.lendingCreate.currency = '';
      state.lendingCreate.fullName = '';
      state.lendingCreate.documentNumber = '';
      state.lendingCreate.documentType = '';
      state.lendingCreate.requestDate = '';      
      state.lendingCreate.idRecordStatus=-1;
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
    fillLeadByCamp(state, leadsData){
      state.leadsByCampaign = [];
      for(let i=0; i < leadsData.length; i++){
        state.leadsByCampaign.push({
          idLead: leadsData[i].idLead,
          minimumLoan: leadsData[i].minimumLoan,
          maximumLoan: leadsData[i].maximumLoan,
          minimumPeriod : leadsData[i].minimumPeriod,
          maximumPeriod : leadsData[i].maximumPeriod,
          interestRate : leadsData[i].interestRate,
          active: leadsData[i].active,
          idCampaign: leadsData[i].idCampaign,
          idClient: leadsData[i].idClient,
          nationality: leadsData[i].nationality,
          flag: leadsData[i].flag,
          documentNumber: leadsData[i].documentNumber,
          firstName: leadsData[i].firstName,
          middleName: leadsData[i].middleName,
          fatherLastname: leadsData[i].fatherLastname,
          motherLastname: leadsData[i].motherLastname,
          birthdate: leadsData[i].birthdate,
          address: leadsData[i].address
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
      //state.campaignCreate.minimumLoan = state.campaigns[index].minimumLoan;
      //state.campaignCreate.maximumLoan = state.campaigns[index].maximumLoan;
      //state.campaignCreate.minimumPeriod = state.campaigns[index].minimumPeriod;
      //state.campaignCreate.maximumPeriod = state.campaigns[index].maximumPeriod;
      //state.campaignCreate.interestRate = state.campaigns[index].interestRate;
      state.campaignCreate.idCurrency = state.campaigns[index].idCurrency;
      if(state.campaigns[index].active == 1){
        state.campaignCreate.active = 'Activo'
      };
      state.campaignCreate.creationDate=state.campaigns[index].creationDate;
      /*Que percy me mande la moneda
      if(state.campaigns[index].idCurrency == 1){
        state.campaignCreate.loanRange = "De " + state.campaignCreate.minimumLoan + " a " + state.campaignCreate.maximumLoan + " soles";
      } else {
        state.campaignCreate.loanRange = "De " + state.campaignCreate.minimumLoan + " a " + state.campaignCreate.maximumLoan + " dólares";
      }
      state.campaignCreate.periodRange = "De " + state.campaignCreate.minimumPeriod + " a " + state.campaignCreate.maximumPeriod + " meses";
      //console.log(state.campaignCreate.startDate);*/
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
      state.lendingCreate.idLead = state.lendings[index].idLead;
      state.lendingCreate.share = state.lendings[index].share;
      state.lendingCreate.commission = state.lendings[index].commission;
      state.lendingCreate.active = state.lendings[index].active;
      state.lendingCreate.campaignName = state.lendings[index].campaignName;
      state.lendingCreate.accountNumber = state.lendings[index].accountNumber;
      state.lendingCreate.currency = state.lendings[index].currency;
      state.lendingCreate.fullName = state.lendings[index].fullName;
      state.lendingCreate.documentNumber = state.lendings[index].documentNumber;
      state.lendingCreate.documentType = state.lendings[index].documentType;
      state.lendingCreate.requestDate = state.lendings[index].requestDate;
      state.lendingCreate.idRecordStatus  =  state.lendings[index].idRecordStatus;
    },
    setLeadInd(state, index){
      state.leadCreate.idLead = state.leadsByCampaign[index].idLead;
      state.leadCreate.minimumLoan = state.leadsByCampaign[index].minimumLoan;
      state.leadCreate.maximumLoan = state.leadsByCampaign[index].maximumLoan;
      state.leadCreate.minimumPeriod = state.leadsByCampaign[index].minimumPeriod;
      state.leadCreate.maximumPeriod = state.leadsByCampaign[index].maximumPeriod;
      state.leadCreate.interestRate = state.leadsByCampaign[index].interestRate;
      state.leadCreate.active = state.leadsByCampaign[index].active;
      state.leadCreate.idCampaign = state.leadsByCampaign[index].idCampaign;
      state.leadCreate.idClient = state.leadsByCampaign[index].idClient;
      state.leadCreate.nationality = state.leadsByCampaign[index].nationality;
      state.leadCreate.flag = state.leadsByCampaign[index].flag;
      state.leadCreate.documentNumber = state.leadsByCampaign[index].documentNumber;
      state.leadCreate.firstName = state.leadsByCampaign[index].firstName;
      state.leadCreate.middleName = state.leadsByCampaign[index].middleName;
      state.leadCreate.fatherLastname = state.leadsByCampaign[index].fatherLastname;
      state.leadCreate.motherLastname = state.leadsByCampaign[index].motherLastname;
      state.leadCreate.birthdate = state.leadsByCampaign[index].birthdate;
      state.leadCreate.address = state.leadsByCampaign[index].address;
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
              idLoan: -1,
            });
          } else {
            state.salesRecords.push({
              activeLoan: aux[i].activeLoan,
              totalShares: aux[i].totalShares,
              idLoan: aux[i].idLoan,
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
        state.salesRecordCreate.idLoan = state.salesRecords[index].idLoan
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
    },
    setActLead(state, flag){
      state.editLead = flag;
    },
    setPr(state, flag){
      state.prueba = flag;
     },
    setParameters(state,data){
      state.parameterSetting.maxTokenSends=data.maxTokenSends;
      state.parameterSetting.maxDiaryMovements=data.maxDiaryMovements;
      state.parameterSetting.legalAge=data.legalAge;
      state.parameterSetting.maxAccountsNumber=data.maxAccountsNumber;
      state.parameterSetting.commissionPercentage=data.commissionPercentage;
    }
  },
  actions: {      
      fillPer(context,person_data){
        context.commit('fillPersonData',person_data);
      },
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
      completeBankAccount(context, bankAccount_data){
        context.commit('fillBankAccount',bankAccount_data);
      },
      completeTransactions(context, transaction_data){
        context.commit('fillTransaction',transaction_data);
      },
      completeTransactionsDollar(context, transactionDollar_data){
        context.commit('fillTransactionDollar',transactionDollar_data);
      },
      completeTransactionsSoles(context, transactionSoles_data){
        context.commit('fillTransactionSoles',transactionSoles_data);
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
      setActionLead(context, edit){
        context.commit('setActLead', edit);
      },
      setClientIndex(context,index){
        context.commit('setCliInd',index);
      },
      completePersonCreate(context,person_data){
        context.commit('fillPersonCreate',person_data);
      },
      /*Ronaldo*/
      // Account Charts
      // Chart 1
      dynamicDataNumMonth(context, year){
        context.commit('fillDataNumMonth', year);
      },
      // Chart 2
      dynamicDataAccountTypeMonth(context, year){
        context.commit('fillDataAccountTypeMonth', year);
      },
      // Chart 3
      dynamicDataBalanceMonth(context, year){
        context.commit('fillDataBalanceMonth', year);
      },
      // Lending Charts
      dynamicDataLendMonth(context, year){
        context.commit('fillDataLendingMonth', year);
      },
      dynamicDataAmountLendMonth(context, year){
        context.commit('fillDataAmountLendMonth', year);
      },
      /*Ronaldo*/
      fillParameterSettings(context,parameters){
        context.commit('setParameters',parameters);
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
      },
      fillLeadsByCampaing(context, leads_data){
        context.commit('fillLeadByCamp', leads_data);
      },
      setLeadIndex(context, index){
        context.commit('setLeadInd', index);
      },
      setPrueba(context, flag){
        context.commit('setPr', flag);
      }
  }
})