import axios from 'axios';

export function doLogin(email,password){
    let VUE_APP_API_URL = 'http://200.16.7.181:9994/api/login';

    let url = process.env.VUE_APP_API_URL;

    var body ={
        "email" : email,
        "password" : password,
        "remember" : true,
    }
    
    return axios.post(VUE_APP_API_URL,body);
}