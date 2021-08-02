<template>
  <div>
    <h1>Infos utilisateur</h1>
   
    <h3>Pseudo :</h3>
    <p>{{ pseudoUser }}</p>
    <h3>Email :</h3>
    <p>{{ email }}</p>
    <button @click="onModify(id)">
      <i class="fas fa-camera"> Modifier profile</i>
    </button>
    <button @click="deleteMyAccount(id)">
      <i class="fas fa-user-slash"> Supprimer profile</i>
    </button>
  </div>
</template>

<script>
  import axios from 'axios';
  import router from '../router';

  export default {
    name: 'Profile',
    data() {
      return {
        isAdmin: false,
        pseudoUser: '',
        email: '',
        img: '',
        id: '',
      };
    },
    methods: {
      localClear() {
        localStorage.clear();
        router.push({ path: '/' });
      },
      deleteMyAccount(n) {
        let id = n;
        let confirmUserDeletion = confirm(
          'Êtes-vous sûr de vouloir supprimer votre compte ?'
        );
        if (confirmUserDeletion == true) {
          axios
            .delete('http://localhost:3000/api/users/' + id, {
              headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
              },
            })
            .then((res) => {
              console.log(res);
              alert('Cliquez sur ok pour confirmer la suppression');
              router.replace('http://localhost:8080/api/');
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          return;
        }
      },
      toCommentsList() {
        router.replace('http://localhost:8080/api/CommentsList');
      },
      toUsersList() {
        router.replace('http://localhost:8080/api/UsersList');
      },
    },
  };
</script>

<style scoped>
  .img__profile {
    height: 300px;
  }
</style>
