// Fichier pivot faisant le lien entre Vue, modèles et composants
import { createApp } from 'vue';
import App from './App.vue';
import 'vuex';
import router from './router';
import 'axios';

createApp(App)
  .use(router)
  .mount('#app');
