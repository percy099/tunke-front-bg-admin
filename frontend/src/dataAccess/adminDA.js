import axios from 'axios'

export function createClient(idPerson,email1,email2,cellphone1,cellphone2,token){
    let url = process.env.VUE_APP_API_URL + 'api/clients/'
    
    var body ={
        "idPerson" : idPerson,
        "email1" : email1,
        "email2" : email2,
        "cellphone1" : cellphone1,
        "cellphone2" : cellphone2
    }

    return axios.post(url,body,{
        auth: {
            username: token,
            password: ''
            }
        });
}

export function editClient(idClient,email1,email2,cellphone1,cellphone2,token){
    let url = process.env.VUE_APP_API_URL + 'api/clients/' + idClient
    
    var body ={
        "email1" : email1,
        "email2" : email2,
        "cellphone1" : cellphone1,
        "cellphone2" : cellphone2
    }

    return axios.put(url,body,{
        auth: {
            username: token,
            password: ''
            }
        });
}

export function getAccountsByClient(idClient,token){
    let url = process.env.VUE_APP_API_URL + 'api/accounts/getByClient/'
    var body ={
        "idClient" : idClient,
    }

    return axios.post(url,body,{
        auth:{
            username: token,
            password: ''
        }
    });
}

export function getLeadsByCampaign(idCampaign, token){
    let url = process.env.VUE_APP_API_URL + 'api/leads/getByCampaign/'
    var body = {
        "idCampaign" : idCampaign,
    }

    return axios.post(url, body, {
        auth:{
            username: token,
            password: ''
        }
    });
}

export function createLead(idClient, idCampaign, max, min, maxP, minP, rate, token){
    let url = process.env.VUE_APP_API_URL + 'api/leads/'
    var body = {
        "idClient" : idClient,
        "idCampaign" : idCampaign,
        "minimumLoan" : min,
        "maximumLoan" : max,
        "minimumPeriod" : minP,
        "maximumPeriod" : maxP,
        "interestRate" : rate
    }

    return axios.post(url, body, {
        auth:{
            username: token,
            password: ''
        }
    });
}

export function doCreateAccount(idPer,cur,origin, type){
    let url =  process.env.VUE_APP_API_URL_CLI + 'api/openAccount/';
    var body ={
        "idPerson" : idPer,
        "currency" : cur,
        "origin" : origin,
        "accountType" : type,
        "response1" : '',
        "response2" : '',
        "response3" : '',
        "response4" : ''
    }
    
    return axios.post(url,body);
}


export function doEditSalesRecord(idSalesRecord, cur, token){
    
    let url = process.env.VUE_APP_API_URL + 'api/salesRecord/' + idSalesRecord;
    console.log(url);
    console.log(cur);
    var body = {
        "state" : cur
    }
    
    return axios.put(url, body,{
        auth:{
            username: token,
            password: ''
        }
    });
    
}

export function deleteClient(idClient,token){
    let url = process.env.VUE_APP_API_URL + 'api/clients/' + idClient;

    return axios.delete(url,{
        auth:{
            username: token,
            password: ''
        }
    });
}

export function deleteAccount(idAccount,token){
    let url = process.env.VUE_APP_API_URL + 'api/accounts/' + idAccount;

    return axios.delete(url,{
        auth:{
            username: token,
            password: ''
        }
    });
}

export function deleteCampaign(idCampaign,token){
    let url = process.env.VUE_APP_API_URL + 'api/campaign/' + idCampaign;

    return axios.delete(url,{
        auth:{
            username: token,
            password: ''
        }
    });
}


export function deleteLending(idLoan,token){
    let url = process.env.VUE_APP_API_URL + '' + idLoan;

    return axios.delete(url,{
        auth:{
            username: token,
            password: ''
        }
    });
}

export function createLending(idClient,totalShares,amount,interestRate,idShareType,idAccount,share,commission,idCampaign,token){
    let url = process.env.VUE_APP_API_URL + 'api/loans/'
    
    var body ={
        "idClient": idClient,
        "totalShares" : totalShares,
        "amount" : amount,
        "interestRate" : interestRate,
        "idShareType" : idShareType,
        "idAccount" : idAccount,
        "share" : share,
        "commission" : commission,
        "idCampaign" : idCampaign
    }

    return axios.post(url,body,{
        auth: {
            username: token,
            password: ''
            }
        });
}

export function getCampaignByID(token){
    let url = process.env.VUE_APP_API_URL + 'api/campaign/1'  
    return axios.get(url,{
        auth:{
            username: token,
            password: ''
        }
    });
}


export function createCampaign(name,month,startDate,endDate/*,minimumLoan,maximumLoan,minimumPeriod,maximumPeriod,interestRate*/,cur,token){
    let url = process.env.VUE_APP_API_URL + 'api/campaigns/'
    
    var body ={
        "name" : name,
        "month" : month,
        "startDate" : startDate,
        "endDate" : endDate,
        /*"minimumLoan" : minimumLoan,
        "maximumLoan" : maximumLoan,
        "minimumPeriod" : minimumPeriod,
        "maximumPeriod" : maximumPeriod,
        "interestRate" : interestRate,*/
        "idCurrency" : cur
    }

    return axios.post(url,body,{
        auth: {
            username: token,
            password: ''
            }
        });
}

export function editCampaign(idCampaign,name,month,startDate,endDate,/*minimumLoan,maximumLoan,minimumPeriod,maximumPeriod,interestRate,*/cur,token){
    let url = process.env.VUE_APP_API_URL + 'api/campaign/' + idCampaign
    
    var body ={
        "name" : name,
        "month" : month,
        "startDate" : startDate,
        "endDate" : endDate,
        /*"minimumLoan" : minimumLoan,
        "maximumLoan" : maximumLoan,
        "minimumPeriod" : minimumPeriod,
        "maximumPeriod" : maximumPeriod,
        "interestRate" : interestRate,*/ 
        "idCurrency" : cur
    }

    return axios.put(url,body,{
        auth: {
            username: token,
            password: ''
            }
    });
}

export function chargeBlackList(token,file){
    let url = process.env.VUE_APP_API_URL + 'api/blackLists/'
    let formData = new FormData();
    formData.append('file', file);
    return axios.post(url,formData,
        {
            headers: {
                'Content-Type' : 'multipart/form-data'
            },
            auth:{
                username : token,
                password : ''
            }
        }
        );
}

export function chargeLeads(token, file,idCampaign){
    let url = process.env.VUE_APP_API_URL + 'api/leads/'
    let formData = new FormData();
    formData.append('file', file);
    formData.append('idCampaign', JSON.stringify(idCampaign));
    return axios.put(url,formData,
        {
            headers: {
                'Content-Type' : 'multipart/form-data'
            },
            auth:{
                username : token,
                password : ''
            }
        }
        );
}

export function chargeCampaigns(token,body){
    let url = process.env.VUE_APP_API_URL + 'api/campaignCharge/'

    return axios.post(url,body,{
        auth:{
            username: token,
            password: ''
        }
    });
      
}
export function getClientByID(idClient,token){
    let url = process.env.VUE_APP_API_URL + 'api/clients/' + idClient;  
    return axios.get(url,{
        auth:{
            username: token,
            password: ''
        }
    });
}
export function doRequestParameters(token){
    let url = process.env.VUE_APP_API_URL + 'api/parameterSettings/';

    return axios.get(url,{
        auth:{
            username: token,
            password: ''
        }
    });
}

export function editParameters(maxTokenSends,maxDiaryMovements,legalAge,maxAccountsNumber,commissionPercentage,token){
    let url = process.env.VUE_APP_API_URL + 'api/parameterSettings/';

    var body ={
        "maxTokenSends" : maxTokenSends,
        "maxDiaryMovements" : maxDiaryMovements,
        "legalAge" : legalAge,
        "maxAccountsNumber" : maxAccountsNumber,
        "commissionPercentage" : commissionPercentage,
    }

    return axios.put(url,body,{
        auth:{
            username: token,
            password: ''
        }
    });
}
export function createBlacklist(token,dni,reason){
    let url = process.env.VUE_APP_API_URL + 'api/blackList/';

    var body = {
        "dni" : dni,
        "reason" : reason
    }
    return axios.post(url, body,{
        auth:{
            username: token,
            password: ''
        }
    });
}

export function generateCalendar(idLoan, token){
    let url = process.env.VUE_APP_API_URL + 'api/loans/generateCalendar/';

    var body = {
        "idLoan" : idLoan
    }
    return axios.post(url, body,{
        auth:{
            username: token,
            password: ''
        }
    });
}
