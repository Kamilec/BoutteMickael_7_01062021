<template>
  <div class="card">
    <img class="logoGM logoGMR" src="../assets/logoGMR.png" alt="Logo Groupomania" />
    <div class="card card-info"><h1>Le temple aux commentaires :</h1></div>
    <div v-for="(comment, id) in user" :key="id">
      <p>
        <router-link :to="'/allposts?postId=' + id">
          Post n°{{ comment.postId }}</router-link
        >
        <br />
        {{ comment.user.pseudo }} <br />
        "{{ comment.comment }}"
      </p>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  export default {
    name: 'AllComments',

    data() {
      return {
        comments: [],
        role: localStorage.getItem('role'),
        token: localStorage.getItem('token'),
        user: '',
        userId: localStorage.getItem('userId'),
      };
    },

    created() {
      axios
        .get('http://localhost:3000/comment/all', {
          headers: { Authorization: 'Bearer ' + localStorage.token },
        })
        .then((res) => {
          this.user = res.data;
          console.log(res);
        })
        .catch(() => {});
    },
  };
</script>

<style scoped>
  .user-logo {
    font-size: 20px;
  }

  .avatarUser {
    height: 100px;
    border-radius: 50%;
  }

  .profil-user {
    margin-bottom: 20px;
  }

  .check_appear {
    display: none;
    justify-content: center;
  }

  .comment-user:hover .check_appear {
    display: inline-grid;
    display: contents;
  }
</style>
