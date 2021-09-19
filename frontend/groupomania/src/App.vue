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
    max-width: 1440px;
    margin: auto;
    padding: 10px;
    box-sizing: border-box;
  }

  * {
    padding: 0;
    box-sizing: border-box;
  }

  html {
    position: relative;
    min-height: 100%;
  }

  body {
    background-image: url('./assets/Screenshot_1.jpg');
    opacity: 0.95;
    font-family: 'roboto-regular', sans-serif;
    text-align: center;
    box-sizing: border-box;
    min-height: 100%;
    margin: 0;
    width: 100%;
  }

  a {
    text-decoration: none;
    color: burlywood;
    font-weight: bolder;
  }

  p,
  figcaption {
    color: whitesmoke;
  }

  h1,
  h2,
  h4 {
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

  .logoGM,
  .picture {
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

  .all-buttons {
    display: block;
    color: #252537;
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

  .other__page__logo {
    font-size: 15px;
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
    margin-top: 25px;
  }

  .card-info {
    margin: 10px;
    background: transparent;
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

  .error {
    color: burlywood;
    font-weight: 600;
  }

  .login__submit,
  .signup__submit {
    margin-top: 40px;
  }

  footer {
    color: black;
    position: absolute;
    bottom: 0;
  }

  @media screen and (max-width: 600px) {
    header,
    .text_logo {
      grid-template-columns: auto 1fr auto;
      grid-template-areas:
        'logo . button'
        'navbar navbar navbar';
    }
    .header__nav__logos {
      margin-top: -80px;
    }
  }

/*   @media screen and (min-width: 600px) {
   #survey {
      bottom: 0;
    }
}

  @media screen and (min-width: 441px) and (max-width: 599px) {
   #survey {
      bottom: 0;
    }
} */


</style>
