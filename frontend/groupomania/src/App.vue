<!-- Fichier principal de l'qpplication Vue.-->
<template>
  <div id="app">
    <headfoot />
    <nav />
    <router-view />
  </div>
</template>

<script>
  import Headfoot from './components/Headfoot.vue';
  export default {
    name: 'App',
    components: {
      Headfoot,
    },
  };
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
  }

  * {
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background-image: url('./assets/Screenshot_1.jpg');
    background-repeat: no-repeat;
    background-size: 2450px;
    opacity: 0.95;
    margin: 2%;
    font-family: 'roboto-regular', sans-serif;
    text-align: center;
    max-width: 1440px;
    margin: auto;
    padding: 1px 15px;
    box-sizing: border-box;
  }

  a {
    text-decoration: none;
    color: burlywood;
    font-weight: bolder;
  }

  p {
    color: white;
  }

  h1 {
    color: whitesmoke;
  }

  h3 {
    color: whitesmoke;
    font-style: italic;
  }

  .subtitle__h1 {
    font-size: 12px;
    margin-top: -25px;
    margin-bottom: 40px;
  }

  .logoGM, .picture {
    height: 270px;
    grid-area: logo;
  }

  header {
    display: grid;
    align-items: center;
    margin-top: -100px;
    grid-template-areas: 'logo . navbar button';
    grid-template-columns: auto 1fr auto;
  }

  nav {
    display: flex;
    align-items: center;
    grid-area: navbar;
  }

  header p {
    letter-spacing: 0.05em;
  }

  .input-item {
    background: #fff;
    color: #333;
    padding: 16px 1px 17px 9px;
    border-radius: 50px;
  }

.form__row {
  color: burlywood;
}

  .form__row__input {
    width: 250px;
    height: 50px;
    margin-top: 2%;
    font-size: 16px;
    font-family: 'Abel', sans-serif;
    color: #5e6472;
    outline: none;
    border: none;
    border-radius: 50px;
    transition: 0.2s linear;
    text-indent: 10px;
  }

  input:focus {
    transform: translateX(-2px);
    border-radius: 50px;
  }

  button,
  #log-in,
  #sign-up {
    display: inline-block;
    color: #252537;
    width: 190px;
    height: 40px;
    padding: 0 20px;
    background: #fff;
    border-radius: 50px;
    outline: none;
    cursor: pointer;
    text-align: center;
    transition: all 0.2s linear;
    margin: 7% auto;
    margin-top: 10px;
  }

  .frgt-pass {
    background: transparent;
  }

  button:hover {
    transform: translatey(3px);
    box-shadow: none;
  }

  button:hover {
    animation: ani9 0.4s ease-in-out infinite alternate;
  }
  @keyframes ani9 {
    0% {
      transform: translateY(3px);
    }
    100% {
      transform: translateY(5px);
    }
  }

  .header__logo {
    font-size: 30px;
  }

  .header__nav__logos {
    padding: 10px;
  }

  .card {
    border: solid 1px white;
    background: linear-gradient(-225deg, #d15159 50%, #142543 50%);
    position: relative;
    top: 170px;
  }

  .card__action {
    color: burlywood;
    font-weight: bolder;
    text-decoration: underline;
  }

  .card__action:hover {
    cursor: pointer;
  }
  .button:hover {
    cursor: pointer;
    background: #d15159;
  }
  .button--disabled {
    background: #cecece;
    color: #ececec;
  }
  .button--disabled:hover {
    cursor: not-allowed;
    background: #cecece;
  }

  footer {
    color: black;
    position: absolute;
    width: 100%;
    bottom: 0;
    left: 0;
    margin-bottom: 10px;
    text-align: center;
    font-weight: bolder;
  }

  @media screen and (max-width: 600px) {
    header {
      grid-template-columns: auto 1fr auto;
      grid-template-areas:
        'logo . button'
        'navbar navbar navbar';
      display: inherit;
    }
    nav {
      grid-area: navbar;
      justify-content: space-around;
    }
    .header__nav__logos {
      margin-top: -150px;
    }
  }
</style>
