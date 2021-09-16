<template>
  <div class="card">
    <div>
      <h2>Déconnexion</h2>
      <p>Vous allez être redirigé(e) vers la page d'accueil dans 1 seconde.</p>
    </div>
  </div>
</template>

<script>
  localStorage.clear();
  export default {
    created() {
      setTimeout(() => this.$router.push({ path: '/' }), 1000);
    }
  };
</script>

<style></style>
