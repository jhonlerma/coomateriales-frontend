<template>
  <nav>

    <img src="../assets/logo.png" alt="">
    <!-- <div class="search">
            <input class="search--input" type="text" name="searchInput" id="searchInput">
            <button class="search--button"><span></span>buscar</button>
        </div> -->

    <div class="links-section">
      <button v-if="is_auth" v-on:click="loadHome">Inicio</button>
      <button v-if="is_auth" v-on:click="loadAccount">Cuenta</button>
      <button v-if="is_auth" v-on:click="logOut">Cerrar Sesión</button>
      <button class="links-section--register-button" v-if="!is_auth" v-on:click="loadSignUp">Registrarse</button>
      <button class="links-section--login-button" v-if="!is_auth" v-on:click="loadLogIn">Iniciar Sesión</button>
    </div>
  </nav>
</template>

<script>
import axios from 'axios';
import jwt_decode from 'jwt-decode';
export default {
  name: 'CoAppbar',
  data: function () {
    return {
      name: "",
      email: "",
      balance: 0,
      loaded: false,
    }
  },
  methods: {
    getData: async function () {
      if (localStorage.getItem("token_access") === null || localStorage.getItem("token_refresh") === null) {
        this.$emit('logOut');
        return;
      }
      await this.verifyToken();
      let token = localStorage.getItem("token_access");
      let userId = jwt_decode(token).user_id.toString();
      axios.get(
        `https://mision-tic-c3-g6.herokuapp.com/user/${userId}/`,
        { headers: { 'Authorization': `Bearer ${token}` } }
      )
        .then((result) => {
          this.name = result.data.name,
            this.email = result.data.email,
            this.balance = result.data.account.balance,
            this.loaded = true;
        })
        .catch(() => {
          this.$emit('logOut');
        });
    },
    verifyToken: function () {
      return axios.post(
        "https://mision-tic-c3-g6.herokuapp.com/refresh/",
        { refresh: localStorage.getItem("token_refresh") },
        { headers: {} })
        .then((result) => {
          localStorage.setItem("token_access", result.data.access);
        })
        .catch(() => {
          this.$emit('logOut')
        })
    }

  },
  created: async function () {
    this.getData();
  }

}
</script>

<style>
</style>