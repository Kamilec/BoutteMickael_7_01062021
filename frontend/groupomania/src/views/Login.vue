<template>
  <div class="card">
    <h1 class="card__title" v-if="mode == 'login'">Connexion</h1>
    <h1 class="card__title" v-else>Inscription</h1>
    <p class="card__subtitle" v-if="mode == 'login'">
      Tu n'as pas encore de compte ?
      <span class="card__action" @click="switchToCreateAccount()"
        >Créer un compte</span
      >
    </p>
    <p class="card__subtitle" v-else>
      Tu possèdes un compte ?
      <span class="card__action" @click="switchToLogin()">Se connecter</span>
    </p>
    <div class="form-row">
      <input
        v-model="email"
        class="form-row__input"
        type="text"
        placeholder="Adresse mail"
      />
    </div>
    <div class="form-row" v-if="mode == 'create'">
      <input
        v-model="pseudo"
        class="form-row__input"
        type="text"
        placeholder="Pseudo"
      />
    </div>
    <div class="form-row">
      <input
        v-model="password"
        class="form-row__input"
        type="password"
        placeholder="Password"
      />
    </div>
    <div class="form-row" v-if="mode == 'login' && status == 'error_login'">
      Adresse mail et/ou mot de passe invalide
    </div>
    <div class="form-row" v-if="mode == 'create' && status == 'error_create'">
      Adresse mail déjà utilisée
    </div>
    <div class="form-row">
      <button
        @click="login()"
        class="button"
        :class="{ 'button--disabled': !validatedFields }"
        v-if="mode == 'login'"
      >
        <span v-if="status == 'loading'">Connexion en cours...</span>
        <span v-else>Connexion</span>
      </button>
      <button
        @click="createAccount()"
        class="button"
        :class="{ 'button--disabled': !validatedFields }"
        v-else
      >
        <span v-if="status == 'loading'">Création en cours...</span>
        <span v-else>Créer mon compte</span>
      </button>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex';

  export default {
    name: 'Login',
    data: function() {
      return {
        mode: 'login',
        email: '',
        pseudo: '',
        password: '',
      };
    },
    mounted: function() {
      if (this.$store.state.user.userId != -1) {
        this.$router.push('/profile');
        return;
      }
    },
    computed: {
      validatedFields: function() {
        if (this.mode == 'create') {
          if (this.email != '' && this.pseudo != '' && this.password != '') {
            return true;
          } else {
            return false;
          }
        } else {
          if (this.email != '' && this.password != '') {
            return true;
          } else {
            return false;
          }
        }
      },
      ...mapState(['status']),
    },
    methods: {
      switchToCreateAccount: function() {
        this.mode = 'create';
      },
      switchToLogin: function() {
        this.mode = 'login';
      },
      login: function() {
        const self = this;
        this.$store
          .dispatch('login', {
            email: this.email,
            password: this.password,
          })
          .then(
            function() {
              self.$router.push('/profile');
            },
            function(error) {
              console.log(error);
            }
          );
      },
      signup: function() {
        const self = this;
        this.$store
          .dispatch('createAccount', {
            email: this.email,
            pseudo: this.pseudo,
            password: this.password,
          })
          .then(
            function() {
              self.login();
            },
            function(error) {
              console.log(error);
            }
          );
      },
    },
  };
</script>

<style scoped>
  .card__subtitle {
    font-size: 17px;
    font-style: italic;
    color: whithe;
  }
</style>
