<template>
  <div class="card">
    <div class="profil__info" :key="user">
      <div class="avatar_user">
        <img
          id="avatar-User"
          class="avatarUser"
          :src="user.avatar"
          alt="avatarUser"
        />
      </div>
      <p>Pseudo: {{ user.pseudo }}</p>
      <p>Email: {{ user.email }}</p>
      <p v-if="role === 'admin'">
        Role : Admin
      </p>
      <p v-else>
        Role : User
      </p>
    </div>
    <div v-if="userId == user.id">
      <form
        id="survey"
        enctype="multipart/form-data"
        @submit.prevent="modifyAvatar()"
      >
        <label for="avatar" class="form-label"></label>
        <input
          type="file"
          class="form__row__input"
          name="image"
          id="image"
          ref="image"
          v-on:change="previewUpload()"
        />
        <button
          type="submit"
          class="form-control"
          name="submitAvatar"
          id="submitAvatar"
          @click.prevent="modifyAvatar"
        >
          Update
        </button>
      </form>
    </div>
    <button
      class="profil__button"
      v-bind="user"
      @click.prevent="deleteUser(user.id)"
    >
      Supprimer votre compte
    </button>
  </div>
</template>

<script>
  import axios from 'axios';
  export default {
    name: 'Profile',

    data() {
      return {
        user: '',
        userId: localStorage.getItem('userId'),
        role: localStorage.getItem('role'),
        avatar: '',
        token: localStorage.getItem('token'),
      };
    },

    created() {
      axios
        .get(`http://localhost:3000/user/${this.userId}`, {
          headers: { Authorization: 'Bearer ' + localStorage.token },
        })
        .then((res) => {
          this.user = res.data;
          if (this.user.avatar === null)
            this.user.avatar = 'http://localhost:3000/images/userDefaut.jpg';
        });
    },

    methods: {
      previewUpload() {
        this.image = this.$refs.image.files[0];
        this.avatar = URL.createObjectURL(this.image);
        document.getElementById('avatar-User').src = this.avatar;
      },
      modifyAvatar() {
        const formData = new FormData();
        formData.append('userId', parseInt(localStorage.getItem('userId')));
        formData.append('image', this.image);
        axios
          .put(`http://localhost:3000/user/update/${this.userId}`, formData, {
            headers: { Authorization: 'Bearer ' + localStorage.token },
          })
          .then(() => this.$router.go());
      },

      deleteUser(id) {
        axios
          .delete(`http://localhost:3000/user/delete/${id}`, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + localStorage.token,
            },
          })
          .then(() => this.$router.push('/logout'));
      },
    },
  };

</script>

<style scoped>
  .avatarUser {
    margin-top: 10px;
    width: 150px;
    border-radius: 25px 25px 25px 25px;
  }
</style>
