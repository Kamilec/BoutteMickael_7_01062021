<template>
  <div class="card">
    <h1 class="title__welcome">
      Bienvenue sur le réseau social <br />
      <img
        class="logoGMS"
        src="../assets/logoGMHB.png"
        alt="Logo Groupomania"
      />
    </h1>
    <div>
      <div>
        <h2>
          Avant toute chose, information très importante, sachez qu'à tout
          moment, un administrateur peut modifier ou supprimer un commentaire et
          / ou une publication, si ceux-ci ne sont pas en adéquation avec notre
          charte.
        </h2>
      </div>
      <div>
        <ul>
          <h3>Rien de plus simple désormais :</h3>
          <li>
            <router-link class="title_signup" to="/signup"
              >INSCRIPTION</router-link
            >
          </li>
          <li>
            <br />
            <i class="fas fa-arrows-alt-v icon_home"></i>
          </li>
          <br />
          <li>
            <router-link class="title_signup" to="/login"
              >CONNEXION</router-link
            >
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Home',
  };
</script>

<style scoped>
  .title__welcome {
    margin-top: 10px;
  }

  .icon_home {
    font-size: 25px;
    color: white;
  }

  .logoGMS {
    height: 300px;
    margin-bottom: -90px;
    margin-top: -80px;
  }

  .title_signup,
  .title_login {
    font-size: 30px;
  }

  @media screen and (max-width: 600px) {
    .card {
      position: initial;
    }
  }
</style>
