<template>
  <div class="home">
  <div>
    <div class="green_bar"></div>

    <div class="box">
      <img class="img-fluid tunke mt-5 ml-5" src="@/images/logo-tunke.png" alt="">
      <form id="form_login" class=" pt-2 mt-3 text-center" @submit.prevent='login'>
        <h3 class="text-center mt-3">Accede al sistema</h3>
        <h6 class="text-center mt-3">Ingresa como administrador</h6>
        <div>
          <input type="text" class="form-control mb-2 mt-2" placeholder="Usuario"
          v-model.trim="$v.userr.$model" :class="{
          'is-invalid' : $v.userr.$error, 'is-valid' : !$v.userr.$invalid }">
          <div class="valid-feedback">Usuario Válido</div>
          <div class="invalid-feedback">
            <span v-if="!$v.userr.required">Usuario Requerido</span>
            <span v-if="!$v.userr.email">Formato Inadecuado </span>
          </div>
        </div>
        <div class="input-group-addon" id="show_hide_password">
          <input type="password" class="form-control" v-model="user.password" placeholder="Contraseña"
          v-model.trim="$v.password.$model" :class="{
          'is-invalid' : $v.password.$error, 'is-valid' : !$v.password.$invalid }">
          <div class="invalid-feedback">
            <span v-if="!$v.password.required">Contraseña Requerida</span>
          </div>
           <b href=""><i class="fa fa-eye-slash" aria-hidden="true"></i></b>
        </div>
        <div>
          <button type="submit" class="mt-2 text-white btn">Iniciar Sesión</button>
        </div>
        <div>
         <google-signin-btn label="Acceder" customClass="my-button" @click="signIn" class="mb-2 mt-2"></google-signin-btn>
        </div>
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
    import { required, email } from 'vuelidate/lib/validators';
    import VueGoogleApi from 'vue-google-api'
    
    $(document).ready(function() {
    $("#show_hide_password b").on('click', function(event) {
        event.preventDefault();
        if($('#show_hide_password input').attr("type") == "text"){
            $('#show_hide_password input').attr('type', 'password');
            $('#show_hide_password i').addClass( "fa-eye-slash" );
            $('#show_hide_password i').removeClass( "fa-eye" );
        }else if($('#show_hide_password input').attr("type") == "password"){
            $('#show_hide_password input').attr('type', 'text');
            $('#show_hide_password i').removeClass( "fa-eye-slash" );
            $('#show_hide_password i').addClass( "fa-eye" );
            }
        });
    });
    export default {
      name: 'Login',
      data(){
        return {
          userr : 'gallardo.a@pucp.pe',
          password : 'Casa12345.'
        }
      },
      validations: {
        userr: {
          required,
          email
        },
        password: {
          required
        }
      },
      computed:{
        ...mapState(['user','token'])
      },
      mounted() {
        gapi.signin2.render('google-signin-btn', { // this is the button "id"
          onsuccess: this.onSignIn
        })
      },
      methods:{
          ...mapActions(['setToken','setAdmin']),
          signIn(){
            
            this.$gapi.currentUser().then(user => {
              if (user) {
                this.$gapi.signOut().then(() => {
                  console.log('User disconnected.')
                })
              } else {
                this.$gapi.signIn().then(user => {
                  let userEmail=user.email;
                  console.log('Signed in as %s', userEmail);
                  UserDA.doLoginGoogle(userEmail).then((res) =>{
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
                      text: 'Cuenta Gmail no registrada'
                    })
                  })
                })
                .catch(err => {
                  console.error('Not signed in: %s', err.error)
                });
                //console.log('No user is connected.')
              }
             })
            
          },
          login(){
              this.$v.$touch();
              if (this.$v.$invalid) {
              } else {
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
            }
          }
    },
    updated(){
      this.user.username = this.userr;
      this.user.password = this.password;
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
  margin: auto;
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

#google-signin-btn{
  margin-left: 33%;
  margin-right: 33%;
}
</style>
