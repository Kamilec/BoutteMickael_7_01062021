<template>   
    <div class="card">
        <div>
            <p class="register__intro--text">Le réseau social pour les employés !</p>
        </div>
        <div class="authentification__form">
            <form class="register__form" method="post" v-on:submit.prevent="signup()">
                <div>
                    <label class="register__label" for="pseudo"></label>
                    <input class="form__row__input" type="text" name="pseudo" id="pseudo" placeholder="pseudo" v-model="pseudo"><br/>
                </div>
                <div>
                    <label class="register__label" for="email"></label>
                    <input class="form__row__input" type="email" name="email" id="email" v-model="email" placeholder="email" v-on:focus="deActivate"><br/>
                </div>
                <div>
                    <label class="register__label" for="password"></label>
                    <input class="form__row__input" type="password" name="password" id="password" placeholder="password" v-model="password"><br/>
                </div>
                <div class="register__button">
                    <button type="submit">SIGNUP</button>
                    <router-link to="/">LOGIN</router-link>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'Inscription',
    data(){
        return{
            pseudo: "",
            email:"",
            password:"",
            submited: false,
            responseEmailError: false
        }
    },
   methods: {
        deActivate() {
            this.responseEmailError= false
        },
        signup() {
            this.submited = true; {
                axios.post('http://localhost:8080/auth/signup',{
                    pseudo: this.pseudo,
                    email: this.email,
                    password: this.password
                })
                .then(res => {
                    console.log(res);
                    alert('Votre compte a bien été créé! Vous pouvez à présent vous connecter!');
                    this.$router.push('/');
                })
                .catch(error => {
                    this.responseEmailError = true;
                    console.log({error})
                });
            }
        }
    }
}
</script>