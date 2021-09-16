<template>
  <div class="card">
    <h1>CONNECTEZ-VOUS</h1>
    <i class="far fa-hand-point-down header__logo"></i>
    <div class="authentification__form">
      <form class="login__form" v-on:submit.prevent="login()" method="post">
        <div>
          <label class="login__label" for="email"></label>
          <input
            class="form__row__input"
            v-model="email"
            type="email"
            name="email"
            id="email"
            placeholder="email"
            autocomplete="username"
          /><br />
          <span class="error" v-show="!email">Veuillez saisir votre email</span>
        </div>
        <div>
          <label class="login__label" for="password"></label>
          <input
            class="form__row__input"
            v-model="password"
            type="password"
            name="password"
            id="password"
            autocomplete="current-password"
            placeholder="password"
          /><br />
          <span class="error" v-show="!password"
            >Veuillez saisir votre password</span
          >
        </div>
        <div class="login__button">
          <button class="all-buttons" type="submit" @click.prevent="login">
            <i class="fas fa-plug other__page__logo"></i> CONNEXION
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  export default {
    name: 'login',
    data() {
      return {
        email: '',
        password: '',
      };
    },
    methods: {
      login() {
        this.errorAlert = false;
        axios
          .post('http://localhost:3000/user/login', {
            email: document.getElementById('email').value,
            password: document.getElementById('password').value,
          })
          .then((res) => {
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('userId', res.data.userId);
            localStorage.setItem('avatar', res.data.avatar);
            localStorage.setItem('role', res.data.role);
            this.$router.push('/profile');
          })
          .catch(() => {
            this.errorAlert = true;
          });
      },
    },
  };
</script>

<style scoped>

h1 {
  color: burlywood;
}

  .text_login {
    margin-top: 10px;
  }
</style>
