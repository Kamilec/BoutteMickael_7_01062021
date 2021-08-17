<template>
  <div class="card">
    <h1 class="title__welcome">Bienvenue sur la page d'aide</h1>
    <div>
      <div>
        <h3>
          <i class="fas fa-exclamation-triangle"></i> Avant toute chose,
          information très importante, sachez qu'à tout moment, un
          administrateur peut modifier ou supprimer un commentaire ou une
          publication si ceux-ci ne sont pas en adéquation avec notre charte.
        </h3>
      </div>
      <br />
      <h3><i class="fas fa-chevron-right"></i> Comment s'inscrire ?</h3>
      <p>
        Sur<router-link to="/"> la page d'accueil</router-link>
        et cliquez sur le lien "C'est par ici !" ou
        <router-link to="/login"> Cliquez-ici </router-link> directement
      </p>
      <p>
        Remplissez le formulaire avec une adresse email, un pseudo et un
        password, cliquez ensuite sur "Créer mon compte".
      </p>
    </div>
    <br />

    <div>
      <h3>
        <i class="fas fa-chevron-right"></i> Comment modifier / supprimer une
        publication ?
      </h3>
      <p>
        Si vous êtes le propriétaire de ce poste, un menu apparaîtra sur la
        droite de la publication, vous offrant la possibilité de le modifier ou
        de le supprimer. A noter que la suppression d'une publication entraînera
        également la suppression de tout le contenu de cette dernière
      </p>
    </div>
    <br />

    <div>
      <h3>
        <i class="fas fa-chevron-right"></i> Comment supprimer mon profil ?
      </h3>
      <p>
        Comme cité ci-dessus, dirigez-vous sur votre profil et sélectionnez le
        bouton "Supprimer profil"
      </p>
    </div>
    <br />
  </div>
</template>

<script>
  export default {
    name: 'Aide',
  };
</script>

<style scoped>
  .title__welcome {
    margin-top: 10px;
  }

  .card {
    font-size: 13px;
  }

  @media screen and (max-width: 600px) {
    .card {
      position: initial;
    }
  }
</style>
