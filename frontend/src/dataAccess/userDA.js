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
