import axios from 'axios';
import {mapState} from 'vuex';

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
