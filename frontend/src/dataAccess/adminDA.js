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

export function editClient(idPerson,email1,email2,cellphone1,cellphone2,token){
    let url = process.env.VUE_APP_API_URL + 'api/clients/'
    
    var body ={
        "idPerson" : idPerson,
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