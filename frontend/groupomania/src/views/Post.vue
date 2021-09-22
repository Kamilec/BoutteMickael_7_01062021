<template>
  <div class="card">
    <img class="logoGM logoGMR" src="../assets/logoGMR.png" alt="Logo Groupomania" />
    <div class="card card-info"><h1>Post</h1></div>
    <form
      id="survey"
      enctype="multipart/form-data"
      @submit.prevent="sendPost()"
    >
      <div>
        <p>
          <label for="title" class="form-label"><b>Titre: </b></label>
          <input
            type="text"
            class="form__input"
            name="title"
            placeholder="Légendez-moi ..."
            v-model="title"
            id="title"
          />
        </p>
      </div>
      <div>
        <p>
          <label for="content" class="form-label"> <b>Description:</b></label>
          <textarea
            name="content"
            id="content"
            cols="25"
            rows="2"
            v-model="content"
            placeholder="Déscription du post ..."
          ></textarea>
        </p>
      </div>
      <div>
        <p>
          <label for="image" class="form-label">
            <b>Ajoutez une image: </b></label
          >
          <input
            type="file"
            class="form__input"
            id="image"
            name="image"
            ref="image"
            v-on:change="upload()"
          />
        </p>
      </div>
      <button
        title="Ajouter un nouveau post"
        type="submit"
        class="card-icon"
        @click.prevent="sendPost()"
      >
        <i class="fas fa-plus"></i>
      </button>
    </form>
  </div>
</template>

<script>
  import axios from 'axios';
  export default {
    name: 'Post',

    data() {
      return {
        userId: localStorage.getItem('userId'),
        title: '',
        content: '',
        image: '',
        likes: '',
        token: localStorage.getItem('token'),
      };
    },

    methods: {
      upload() {
        this.image = this.$refs.image.files[0];
      },
      sendPost() {
        const formData = new FormData();
        formData.append('userId', parseInt(localStorage.getItem('userId')));
        formData.append('image', this.image, this.image.filename);
        formData.append('title', this.title);
        formData.append('content', this.content);
        formData.append('likes', this.likes);
        axios
          .post('http://localhost:3000/post/create', formData, {
            headers: { Authorization: 'Bearer ' + localStorage.token },
          })
          .then(() => this.$router.push({ path: 'allposts' }));
      },
    },
  };
</script>

<style scoped>
  .card-icon {
    display: inline-block;
    outline: none;
    cursor: pointer;
    text-align: center;
    transition: all 0.2s linear;
    width: 30px;
    margin-bottom: 20px;
  }
</style>
