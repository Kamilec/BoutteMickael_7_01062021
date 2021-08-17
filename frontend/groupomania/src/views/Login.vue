<template>
<div class="card">
        <div>
            <p class="login__intro--text">Le réseau social pour les employés !</p>
        </div>
        <div class="authentification__form">
            <form class="login__form" v-on:submit.prevent="login()">
                <div>
                    <label class="login__label" for="email">Email:</label>
                    <input class="login__input" type="email" name="email" id="email" value="" v-on:focus="deActivate">
                    <span class="error" >Veuillez saisir un email valide !</span>
                </div>
                <div>
                    <label class="login__label" for="password">Mot de passe:</label>
                    <input class="login__input" type="password" name="password" id="password" value="" v-on:focus="deActivate">
                    <span class="error">Veuillez saisir votre mot de passe </span>
                </div>
                    <span class="error">Votre e-mail/votre mot de passe est incorrect !</span>
                <div class="login__button">
                    <router-link to="/Inscription" class="login__inscription">S'INSCRIRE</router-link>
                    <button class="login__submit" type="submit">SE CONNECTER</button>
                </div>
            </form>
        </div>
</div>

</template>

<script>
import axios from 'axios'
export default {
    name: 'Login',
    data(){
        return{
            email:"",
            password:"",
            submited: false,
            responseError: false
        }
    },
    methods: {
        deActivate() {
            this.responseError = false
        },
        login(){
            this.submited = true;
            this.$v.$touch();
            if (!this.$v.$invalid){
                axios.post('http://localhost:8080/api/user/login',{
                    email: this.email,
                    password: this.password
                },
                {
                    headers:{ 'Content-type': 'application/json'}
                })
                .then(res => {
                    localStorage.setItem('usertoken', res.data.token);
                    localStorage.setItem('userId', parseInt(res.data.id));
                    localStorage.setItem('role', res.data.role);
                    localStorage.setItem('pseudo', res.data.pseudo);
                    this.$router.push('/');  
                })
                .catch(error => {
                    console.log({error});
                    this.responseError = true;
                })
            }
        }
    }
}
</script>