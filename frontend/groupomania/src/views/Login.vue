<template>
<div class="card">
        <div>
            <p class="login__intro--text">Le réseau social pour les employés !</p>
            <router-link to="/Signup" class="login__inscription">S'INSCRIRE</router-link>
        </div>
        <div class="authentification__form">
            <form class="login__form" v-on:submit.prevent="login()" method="post">
                <div>
                    <label class="login__label" for="email"></label>
                    <input class="form__row__input" v-model="email" type="email" name="email" id="email" placeholder="email" autocomplete="username"><br/>
                    <span class="error" v-show="!email" >Veuillez saisir votre email</span>
                </div>
                <div>
                    <label class="login__label" for="password"></label>
                    <input class="form__row__input" v-model="password" type="password" name="password" id="password" autocomplete="current-password" placeholder="password"><br/>
                    <span class="error" v-show="!password">Veuillez saisir votre password</span>
                </div>
                <div class="login__button">
                    <button class="login__submit" type="submit" @click.prevent="login">CONNEXION</button>
                </div>
            </form>
        </div>
</div>

</template>

<script>
import axios from "axios";
export default {
    name: 'login',
    data() {
        return {
            email: "",
            password: ""
        }
    },
    methods: {
        login() {
            this.errorAlert = false;
            axios.post('http://localhost:3000/user/login', {
                email: document.getElementById('email').value,
                password: document.getElementById('password').value,
            })
                .then((res) => {
                    localStorage.setItem("token", res.data.token)
                    localStorage.setItem("userId", res.data.userId)
                    localStorage.setItem("avatar", res.data.avatar)
                    localStorage.setItem("role", res.data.role)
                    this.$router.push('/profile');
                })
                .catch(() => {
                    this.errorAlert = true
                })
        }
    }
}
</script>