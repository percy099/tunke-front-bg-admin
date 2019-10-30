<template>
  <div class="home">
  <div>
    <div class="green_bar"></div>

    <div class="box">
      <img class="img-fluid tunke mt-5 ml-5" src="@/images/logo-tunke.png" alt="">
      <form id="form_login" class=" pt-2 mt-3 text-center" @submit.prevent='login'>
        <h3 class="text-center mt-3">Accede al sistema</h3>
        <h6 class="text-center mt-3">Ingresa como administrador</h6>
        <input class="mt-4" v-model="user.username" type="text" placeholder="Correo electrónico"><br>
        <input class="mt-2" v-model="user.password" type="password" placeholder="Contraseña"><br>
        <button type="submit" class="mb-4 mt-3 text-white btn">Iniciar Sesión</button>
        <br>
        <div id="google-signin-btn"></div>
        <a href="#">¿Olvidaste tu contraseña?</a>       
      </form>
      
     
    </div>

    <footer id="footer"></footer>
  </div>
  </div>
</template>

<script>

    import {mapState, mapActions} from 'vuex'
    import Swal from 'sweetalert2'
    import * as UserDA from '@/dataAccess/userDA.js'
    import axios from 'axios';
    
    export default {
      name: 'Login',
      computed:{
        ...mapState(['user','token'])
      },
      methods:{
          ...mapActions(['setToken','setAdmin']),
          login(){
              UserDA.doLogin(this.user.username, this.user.password).then((res) =>{
              let response_login = res.data;
              this.setToken(response_login.token);
              let admin ={
                name : response_login.name,
                code : response_login.code
              }
              this.setAdmin(admin);
              this.$router.push('/home');
            }).catch(error =>{
              Swal.fire({
                title: 'Error',
                type: 'error',
                text: 'Usuario y/o contraseña incorrectos'
              })
            })
          },
          
          onSignIn (user) {
              //show data 
              const profile = user.getBasicProfile()
              console.log(profile)
              console.log('ID: ' + profile.getId()); 
              console.log('Full name: ' + profile.getName());
              console.log('Image URL: ' + profile.getImageUrl());
              console.log('Email: ' + profile.getEmail()); //send to back

              UserDA.doLoginGoogle(profile.getEmail()).then((res) =>{
                let response_login = res.data;
                this.setToken(response_login.token);
                this.$router.push('/home');
              }).catch(error =>{
                Swal.fire({
                  title: 'Error',
                  type: 'error',
                  text: 'Cuenta Gmail no registrada'
                })
              })
            }      
    },
    mounted() {
          gapi.signin2.render('google-signin-btn', { // this is the button "id"
            onsuccess: this.onSignIn 
          })
    }
} 
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

input{
  border-radius: 6px;
  text-indent: 4%;
  padding-bottom: 0.3em;
  font-size: 15px;
  font-weight: 350; 
  width: 30vh;
  height: 5vh;
}

ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #343F4B;
  font-weight: 400;
  font-size: 12px;
  margin-left: auto;
  margin-right: auto;
  padding-right: 10px;
}

button{
  background-color: #090d4d;
  font-weight: 600;  
  width: 30vh;
}

h3{
  font-weight: bold;
  font-size: 25px;
  color : #47525E;
}

button:hover{
  background-color: #2CCFBA; /* Green */
  opacity : 0.80;
}

.box{
  height: 100vh;
  width: 60vh;
  margin: auto;
}

.tunke{
  width: 40%;
  height: auto;
}

.green_bar{
  background-color: rgba(0,203,138,0.66);
  width: 100%;
  height: 5vh;
}

#form_login{
  background-color: #ECF3F1;
  font-family: 'Montserrat';
  height: 55vh;
}

#footer{
  position: fixed;
  left : 0;
  bottom: 0;
  width: 100%;
  background-color: rgba(0,203,138,0.66);;
  height: 5vh;
}
</style>
