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

export function doCreateAccount(idPer,cur){
    let url =  process.env.VUE_APP_API_URL_CLI + 'api/openAccount/';
    var body ={
        "idPerson" : idPer,
        "currency" : cur
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