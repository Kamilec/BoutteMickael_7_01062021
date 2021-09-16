<template>
  <div class="card">
    <div class="text_signup">
      <h1>INSCRIVEZ-VOUS</h1>
      <i class="far fa-hand-point-down header__logo"></i>
    </div>
    <div class="authentification__form">
      <form class="register__form" method="post" @submit.prevent="signup()">
        <div>
          <label class="register__label" for="pseudo"></label>
          <input
            class="form__row__input"
            v-model="pseudo"
            type="text"
            name="pseudo"
            id="pseudo"
            placeholder="pseudo"
          /><br />
          <span class="error" v-show="!pseudo">Veuillez saisir un pseudo</span>
        </div>
        <div>
          <label class="register__label" for="email"></label>
          <input
            class="form__row__input"
            type="email"
            name="email"
            autocomplete="username"
            id="email"
            v-model="email"
            placeholder="email"
          /><br />
          <span class="error" v-show="!email">Veuillez saisir votre email</span>
        </div>
        <div>
          <label class="register__label" for="password"></label>
          <input
            class="form__row__input"
            type="password"
            autocomplete="current-password"
            name="password"
            id="password"
            placeholder="password"
            v-model="password"
          /><br />
          <span class="error" v-show="!password"
            >Veuillez saisir votre password</span
          >
        </div>
        <div class="register__button">
          <button class="all-buttons" type="submit">
            <i class="fas fa-user-plus other__page__logo"></i> INSCRIPTION
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  export default {
    name: 'Signup',
    data() {
      return {
        pseudo: '',
        email: '',
        password: '',
        avatar: '',
        responseEmailError: false,
      };
    },
    methods: {
      signup() {
        {
          axios
            .post('http://localhost:3000/user/signup', {
              pseudo: this.pseudo,
              email: this.email,
              password: this.password,
              avatar: this.avatar,
            })
            .then(() => {
              this.$router.push('/login');
            })
            .catch(() => {
              this.responseEmailError = true;
              alert(
                "Connexion impossible, un problème est survenu, merci de vérifier que le formulaire a été correctement rempli, qu'aucun champ ne soit resté libre, et que le format du mot de passe requis soit respecté : entre 8 et 100 caractères, sans espaces et 2 chiffres minimum !"
              );
            });
        }
      },
    },
  };
</script>

<style scoped>
  h1 {
    color: burlywood;
  }

  .text_signup {
    margin-top: 10px;
  }
</style>
