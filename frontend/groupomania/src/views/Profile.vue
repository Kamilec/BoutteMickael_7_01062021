<template>
  <div class="card">
    <div class="card card-info"><h1>Profil utilisateur</h1></div>
    <div class="profil__info">
      <div class="avatar_user">
        <img
          id="avatar-User"
          class="avatarUser"
          :src="user.avatar"
          alt="avatarUser"
        />
        <span class="check_appear">
          <form
            id="survey"
            enctype="multipart/form-data"
            @submit.prevent="modifyAvatar()"
          >
            <label for="avatar" class="form-label"></label>
            <input
              type="file"
              class="form__input"
              name="image"
              id="image"
              ref="image"
              v-on:change="previewUpload()"
            />
            <button
              type="submit"
              class="all-buttons"
              name="submitAvatar"
              id="submitAvatar"
              @click.prevent="modifyAvatar"
            >
              <i class="far fa-image other__page__logo"> Modifier</i>
            </button>
          </form>
        </span>
      </div>
      <div class="infoUser">
        <p class="update-User">
          <b>Pseudo:</b> {{ user.pseudo }}
          <span class="check_appear">
            <input class="update-user" v-model="user.newPseudo" />
            <button
              title="Modifier le pseudo"
              class="card-icon"
              @click="updateUser(user)"
            >
              <i class="far fa-edit"></i>
            </button>
          </span>
        </p>
        <p><b>Role:</b> {{ user.role }}</p>
        <p class="comment-all-user"> <router-link to="/AllComments"><p>Commentaire(s)</p></router-link> </p>
      </div>
    </div>

    <div>
      <button
        v-if="userId == user.id || role === 'admin'"
        class="all-buttons"
        v-bind="user"
        @click.prevent="deleteUser(user.id)"
      >
        <i class="fas fa-user-slash"></i> Suppression compte
      </button>
    </div>
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
      if (this.$route.query.userId != undefined)
        this.userId = this.$route.query.userId;
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
            headers: {
              Authorization: 'Bearer ' + localStorage.token,
              userId: this.userId,
            },
          })
          .then(() => this.$router.go());
      },

      updateUser(user) {
        axios
          .put(
            `http://localhost:3000/user/update/${user.id}`,
            { pseudo: user.newPseudo },
            {
              headers: {
                Authorization: 'Bearer ' + localStorage.token,
                userId: this.userId,
              },
            }
          )
          .then(() => {
            this.$router.go();
          });
      },

      deleteUser(id) {
        axios
          .delete(`http://localhost:3000/user/delete/${id}`, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + localStorage.token,
              userId: this.userId,
            },
          })
          .then(() => {
            if (this.$route.query.userId == undefined) {
              this.$router.push('/logout');
            } else {
              this.$router.push('/posted');
            }
          });
      },
    },
  };
</script>

<style scoped>
  #survey {
    display: inline-grid;
    position: relative;
    bottom: 100px;
  }

  .avatarUser {
    width: 150px;
    clip-path: ellipse(50% 50%);
    height: 150px;
    object-fit: cover;
    margin-top: 10px;
  }

  .check_appear {
    display: none;
    justify-content: center;
  }

  .avatar_user:hover .check_appear {
    display: inline-grid;
  }

  .update-User:hover .check_appear {
    display: inline-grid;
    display: contents;
  }

  a {
    color: #252537;
    text-decoration: none;
    font-weight: initial;
  }
</style>
