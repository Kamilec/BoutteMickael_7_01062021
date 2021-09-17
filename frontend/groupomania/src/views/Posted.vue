<template>
  <div class="card"> <h1>Publication(s)</h1></div>
  <div class="card-global">
    <div class="card" v-for="(post, id) in post" :key="id">
      <figure>
        <div class="icon-figcaption">
          <figcaption class="card-title-figcaption">
            <h3>
              <b class="pseudo-user">
                <router-link :to="'/profile?userId=' + post.userId">
                {{ post.user.pseudo }} ( post n° {{ post.id }} ) 
                </router-link></b
              >
              <button
                title="Supprimer le post"
                class="card-icon"
                v-if="userId == post.userId || role === 'admin'"
                @click="deletePost(post.id)"
              >
                <i class="fas fa-ban"></i>
              </button>
            </h3>
            <div class="post-user">
              <p>
                Titre : {{ post.title }}
                <span class="check_appear">
                  <input
                    class="update-post"
                    v-if="userId == post.userId || role === 'admin'"
                    v-model="post.newTitle"
                  />
                  <button
                    title="Modifier le titre"
                    class="card-icon"
                    v-if="userId == post.userId || role === 'admin'"
                    @click="updatePost(post)"
                  >
                    <i class="far fa-edit"></i>
                  </button>
                </span>
              </p>
            </div>

            <div class="post-user">
              <p>
                Description : {{ post.content }}
                <span class="check_appear">
                  <input
                    class="update-post"
                    v-if="userId == post.userId || role === 'admin'"
                    v-model="post.newContent"
                  />
                  <button
                    title="Modifier la description"
                    class="card-icon"
                    v-if="userId == post.userId || role === 'admin'"
                    @click="updatePost(post)"
                  >
                    <i class="far fa-edit"></i>
                  </button>
                </span>
              </p>
            </div>
          </figcaption>
        </div>

        <div class="post-user">
          <img
            :id="'imageUrl-User' + post.id"
            class="imageUrl"
            :src="post.imageUrl"
            alt="imageUrl"
            @click="goToOnePost(post)"
          />
          <span class="check_appear">
            <form
              id="survey"
              enctype="multipart/form-data"
              @submit.prevent="modifyImagePost(post.id)"
            >
              <label for="gif" class="form-label"></label>
              <input
                v-if="userId == post.userId || role === 'admin'"
                type="file"
                class="update-post"
                name="gif"
                id="gif"
                :ref="'gif' + post.id"
                v-on:change="previewUpload(post.id)"
              />

              <button
                v-if="userId == post.userId || role === 'admin'"
                title="Update gif"
                type="submit"
                class="card-icon"
                name="submitGif"
                id="submitGif"
                @click.prevent="modifyImagePost(post.id)"
              >
                <i class="far fa-image other__page__logo"></i>
              </button>
            </form>
          </span>
        </div>
        <div v-for="(comment, index) in post.comments" :key="`comment${index}`">
          <p class="comment-user">
            {{ comment.user.pseudo }} <i class="fas fa-caret-right"></i>
            {{ comment.comment }}
            <span class="check_appear">
              <input
                class="update-comment"
                v-if="userId == comment.userId || role === 'admin'"
                v-model="comment.newComment"
              />
              <button
                v-if="userId == comment.userId || role === 'admin'"
                title="Modifier le commentaire"
                class="card-icon"
                @click="updateCommentUser(comment.id, comment.newComment)"
              >
                <i class="far fa-edit"></i>
              </button>
              <button
                title="Supprimer le commentaire"
                class="card-icon"
                v-if="userId == comment.userId || role === 'admin'"
                @click="deleteCommentUser(comment.id)"
              >
                <i class="far fa-trash-alt"></i>
              </button>
            </span>
          </p>
        </div>
        <div>
          <form id="survey" ref="clear" @submit.prevent="sendComments(post.id)">
            <input
              type="text"
              placeholder="Commentaire ..."
              v-model="comments[post.id]"
            />
            <button
              title="Poster un commentaire"
              type="submit"
              class="card-icon"
              @click.prevent="sendComments(post.id)"
            >
              <i class="far fa-comment-dots"></i>
            </button>
          </form>
        </div>
      </figure>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  export default {
    name: 'Posted',

    data() {
      return {
        comments: {},
        post: [],
        role: localStorage.getItem('role'),
        token: localStorage.getItem('token'),
        userId: localStorage.getItem('userId'),
      };
    },

    created() {
      axios
        .get('http://localhost:3000/post/all', {
          headers: { Authorization: 'Bearer ' + localStorage.token },
        })
        .then((res) => {
          this.post = res.data.reverse();
        })
        .catch((err) => {
          console.log(err + 'Utilisateur inconnu ou posts indisponibles');
        });
    },

    methods: {
      sendComments(postId) {
        axios
          .post(
            'http://localhost:3000/comment/create',
            { postId, comment: this.comments[postId] },
            {
              headers: { Authorization: 'Bearer ' + localStorage.token },
            }
          )
          .then(() => {
            this.$router.go();
          });
      },
      deleteCommentUser(commentId) {
        axios
          .delete(`http://localhost:3000/comment/delete/${commentId}`, {
            headers: { Authorization: 'Bearer ' + localStorage.token },
          })
          .then(() => {
            this.$router.go();
          });
      },
      updateCommentUser(commentId, commentUser) {
        axios
          .put(
            `http://localhost:3000/comment/update/${commentId}`,
            { comment: commentUser },
            {
              headers: { Authorization: 'Bearer ' + localStorage.token },
            }
          )
          .then(() => {
            this.$router.go();
          });
      },
      goToOnePost(post) {
        this.post = [post];
      },
      deletePost(postId) {
        axios
          .delete(`http://localhost:3000/post/delete/${postId}`, {
            headers: { Authorization: 'Bearer ' + localStorage.token },
          })
          .then(() => {
            this.$router.go();
          });
      },
      updatePost(post) {
        axios
          .put(
            `http://localhost:3000/post/update/${post.id}`,
            { title: post.newTitle, content: post.newContent },
            {
              headers: { Authorization: 'Bearer ' + localStorage.token },
            }
          )
          .then(() => {
            this.$router.go();
          });
      },
      previewUpload(postId) {
        this.image = this.$refs['gif' + postId].files[0];
        this.gif = URL.createObjectURL(this.image);
        document.getElementById('imageUrl-User' + postId).src = this.gif;
      },
      modifyImagePost(postId) {
        const formData = new FormData();
        formData.append('image', this.image);
        axios
          .put(`http://localhost:3000/post/update/${postId}`, formData, {
            headers: { Authorization: 'Bearer ' + localStorage.token },
          })
          .then(() => this.$router.go());
        console.log(postId);
      },
    },
  };
</script>
/<style scoped>
  .card-title {
    border: solid 1px white;
    background: linear-gradient(-225deg, #d15159 50%, #142543 50%);
    margin-top: 10px;
    font-size: 10px;
    font-weight: bolder;
  }

  .back {
    margin-left: 10px;
  }

  .card-icon {
    display: inline-block;
    outline: none;
    cursor: pointer;
    text-align: center;
    transition: all 0.2s linear;
    width: 30px;
  }

  .card-global {
    flex-direction: column-reverse;
    display: flex;
  }

  .show-pseudo {
    margin-right: 10px;
  }

  .pseudo-user {
    margin-right: 10px;
  }

  .imageUrl {
    margin-top: 10px;
    width: 300px;
    max-width: 100%;
    cursor: pointer;
  }

  .check_appear {
    display: none;
    justify-content: center;
  }

  .comment-user:hover .check_appear {
    display: inline-grid;
    display: contents;
  }

  .post-user:hover .check_appear {
    display: inline-grid;
    display: contents;
  }

  .icon-figcaption {
    display: flex;
    justify-content: center;
  }

  .card-title-figcaption {
    margin-right: 10px;
  }
</style>
