<!-- Fichier permettant d'implémenter le header et le footer à toutes les autres pages -->
<template>
  <header>
    <img class="logoGM" src="../assets/logoGM.png" alt="Logo Groupomania" />
    <nav>
      <router-link class="header__nav__logos" to="/">
        <i class="fas fa-home header__logo"></i>
      </router-link>
      <router-link class="header__nav__logos" to="/aide">
        <i class="fas fa-info header__logo"></i
      ></router-link>
      <router-link class="header__nav__logos" to="/profile">
        <i class="fas fa-user header__logo"></i
      ></router-link>
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
