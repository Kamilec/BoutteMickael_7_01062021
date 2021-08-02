<!-- Fichier principal de l'qpplication Vue.-->
<template>
  <div id="app">
    <headfoot />
    <router-view />
  </div>
</template>

<script>
import Headfoot from './components/Headfoot.vue'
  export default {
    name: "App",
    components : {
      Headfoot
    }
  };
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    margin-top: 60px;
  }

  * {
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background: linear-gradient(-225deg, #d15159 50%, #142543 50%);
    background-attachment: fixed;
    background-repeat: no-repeat;
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
    color: white;
  }

  .logoGM {
    height: 270px;
    position: relative;
    bottom: 150px;
  }

  /*form {
    width: 300px;
    min-height: 500px;
    height: auto;
    border-radius: 5px;
    margin: 2% auto;
    box-shadow: 0 9px 50px hsl(20deg 67% 75% / 31%);
    padding: 2%;
    background-image: linear-gradient(-225deg, #d15159 50%, #142543 50%);
    margin-top: 53px;
  }*/

  .form-control {
    margin: 0px;
    width: 350px;
    max-width: 100%;
  }

  form .con {
    display: -webkit-flex;
    display: flex;
    -webkit-justify-content: space-around;
    justify-content: space-around;
    -webkit-flex-wrap: wrap;
    flex-wrap: wrap;
    margin: 0 auto;
  }

  header p {
    letter-spacing: 0.05em;
  }

  .input-item {
    background: #fff;
    color: #333;
    padding: 16px 1px 17px 9px;
    border-radius: 5px 0px 0px 5px;
  }

  #eye {
    background: #fff;
    color: #333;
    margin: 5.9px 0 0 0;
    margin-left: -20px;
    padding: 15px 9px 19px 0px;
    border-radius: 0px 5px 5px 0px;
    float: right;
    position: relative;
    right: 1%;
    top: -0.2%;
    z-index: 5;
    cursor: pointer;
  }

  input[class='form-row__input'] {
    width: 250px;
    height: 50px;
    margin-top: 2%;
    padding: 15px;
    font-size: 16px;
    font-family: 'Abel', sans-serif;
    color: #5e6472;
    outline: none;
    border: none;

    border-radius: 0px 5px 5px 0px;
    transition: 0.2s linear;
  }

  input:focus {
    transform: translateX(-2px);
    border-radius: 5px;
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
    border-radius: 5px;
    outline: none;
    cursor: pointer;
    text-align: center;
    transition: all 0.2s linear;
    margin: 7% auto;
    letter-spacing: 0.05em;
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

  .card__action {
    color: white;
    text-decoration: underline;
  }

  .card__title {
    color: white;
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
    color: white;
    position: absolute;
    width: 100%;
    bottom: 0;
    left: 0;
    margin-bottom: 10px;
    text-align: center;
  }
</style>
