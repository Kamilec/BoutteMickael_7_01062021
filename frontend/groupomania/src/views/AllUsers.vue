<template>
  <div class="card" v-for="(user, id) in user" :key="id">
    <div class="card card-info">
      <h4>({{ user.role }}) {{ user.pseudo }} </h4>
    </div>
    <div class="profil-user">
      <router-link :to="'/profile?userId=' + user.id">
        <img
          id="avatar-User"
          class="avatarUser"
          :src="user.avatar"
          alt="Avatar utilisateur"
        />
      </router-link>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  export default {
    name: 'AllUsers',

    data() {
      return {
        user: [],
        avatar: '',
      };
    },

    created() {
      axios
        .get('http://localhost:3000/user/all', {
          headers: { Authorization: 'Bearer ' + localStorage.token },
        })
        .then((res) => {
          this.user = res.data;
        })
        .catch(() => {
        });
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
</style>
