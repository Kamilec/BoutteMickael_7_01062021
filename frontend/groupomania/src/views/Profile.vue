<template>
    <main>
        <!--Affichage de l'article-->
        <div class="card">
            <div class="profil__info">
                <p class="profil__hello">Bonjour {{user.pseudo}} !</p>
                <p class="profil__para">Voici les informations de votre compte : </p>
                <p class="profil__pseudo"> Pseudonyme : {{user.pseudo}}</p>
                <p class="profil__email">Email : {{user.email}}</p>
                <p class="avatar">Avatar {{user.avatar}} !</p>

            </div>
            <div class="profil__delete">
                <!--Bouton pour supprimer l'article-->
                <button v-on:click="deleteUser(user.id)" class="profil__button">Supprimer votre compte !</button>
            </div>
        </div>
    </main>
</template>

<script>
import axios from 'axios'
export default {
    name: 'Profile',
    data(){
        return {
            user: "",
            role: "",
            userId: localStorage.getItem('userId'),
            pseudo: localStorage.getItem('pseudo'),
            avatar: localStorage.getItem('avatar'),
            token: localStorage.getItem('token'),
        }
    },
    created() {
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('token');
        axios
            .get("http://localhost:3000/user/" + userId, {
                headers :{
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            .then((response) => (this.user = response.data.user))
            .catch((err) => console.log(err));
    },
    methods:{
        deleteUser(id){
            const userId = id;
            const token = localStorage.getItem('usertoken');
            const url = 'http://localhost:3000/user/' + userId
            axios.delete(url, {
                headers :{
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(() => {
                alert('user supprimé');
            })
            .catch(error => console.log(error));
        },
        printNewusers(){
            const id = localStorage.getItem('userId');
            const token = localStorage.getItem('usertoken');
            const header = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
            axios.get('http://localhost:3000/user/'+ id, header)
            .then(res => {
                const data = res.data;
                this.user = data;
            })
            .catch(error => console.log({error}));
        }
    },
    
    beforeMount() {
        const role = localStorage.getItem('role');
        this.role = role;
        this.printNewusers();
    },
};
</script>

<style scoped>
</style>
