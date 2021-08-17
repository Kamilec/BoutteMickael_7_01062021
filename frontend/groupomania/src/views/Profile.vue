<template>
    <main>
        <!--Affichage de l'article-->
        <div class="card">
            <div class="profil__info">
                <p class="profil__hello">Bonjour {{users.pseudo}} !</p>
                <p class="profil__para">Voici les informations de votre compte : </p>
                <p class="profil__pseudo"> Pseudonyme : {{users.pseudo}}</p>
                <p class="profil__email">Email : {{users.email}}</p>
                <p class="profil__compte">Creation du compte: {{ users.createdAt | formatDate }}</p>
            </div>
            <div class="profil__delete">
                <!--Bouton pour supprimer l'article-->
                <button v-on:click="deleteUser(users.id)" class="profil__button">Supprimer votre compte !</button>
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
            users: "",
            role: "",
            userId: localStorage.getItem('userId'),
            token: localStorage.getItem('usertoken'),
        }
    },
    methods:{
        deleteUser(id){
            const userId = id;
            const token = localStorage.getItem('usertoken');
            const url = 'http://localhost:8080/api/user/' + userId
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
            axios.get('http://localhost:8080/api/user/'+ id, header)
            .then(res => {
                const data = res.data;
                this.users = data;
                console.log(data.pseudo)
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
