<!-- Fichier permettant d'implémenter le header et le footer à toutes les autres pages -->
<template>
  <header>
    <img class="logoGM" src="../assets/logoGM.png" alt="Logo Groupomania" />
    <nav>
      <router-link title="Page d'accueil" class="header__nav__logos" to="/">
        <i class="fas fa-house-user header__logo"></i>
      </router-link>

      <router-link title="Page de tous les utilisateurs" class="header__nav__logos" to="/allusers">
        <i class="fas fa-users header__logo"></i>
      </router-link>

      <router-link
        title="Profil utilisateur"
        class="header__nav__logos"
        to="/profile"
      >
        <i class="fas fa-user header__logo"></i>
      </router-link>

      <router-link
        title="Publier un nouveau post"
        class="header__nav__logos"
        to="/post"
      >
        <i class="fas fa-plus header__logo"></i>
      </router-link>

      <router-link
        title="Panneau des publications"
        class="header__nav__logos"
        to="/allposts"
      >
        <i class="fas fa-chalkboard-teacher header__logo"></i>
      </router-link>

       <router-link
        title="Panneau de tous les commentaires"
        class="header__nav__logos"
        to="/allcomments"
      >
        <i class="fas fa-comment-dots header__logo"></i>
      </router-link>

      <router-link title="Deconnexion" class="header__nav__logos" to="/logout">
        <i class="fas fa-door-open header__logo"></i>
      </router-link>
    </nav>
  </header>
  <footer>
    © 2021 Copyright:<a href="https://groupomania.com/"> Groupomania.com</a>
  </footer>
</template>

<script>
  export default {
    name: 'Headfoot',
  };
</script>

<style scoped>
  a {
    color: black;
  }
</style>
