import axios from 'axios';

export function doLogin(email,password){

    let url = process.env.VUE_APP_API_URL + 'api/login';

    var body ={
        "email" : email,
        "password" : password,
        "remember" : true,
    }
    
    return axios.post(url,body);
}

export function getAllClients(token){
    let url = process.env.VUE_APP_API_URL + 'api/clients/';
    return axios.get(url, { 
        auth: {
            username: token,
            password: ''
          }
    });
}

export function getAllAccounts(token){
    let url = process.env.VUE_APP_API_URL + 'api/accounts/';
    return axios.get(url, {
        auth: {
            username: token,
            password: ''
        }
    });
}

export function getPersonData(dni){
    let url = process.env.VUE_APP_API_URL + 'api/dniValidation/';
    
    var body ={
        "documentNumber" : dni
    }

    return axios.post(url,body);
}