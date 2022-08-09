<template>
  <header class="col-12">
    <co-appbar v-bind:is_auth_props="is_auth"></co-appbar>
  </header>
  <main class="container-fluid p-5 col-12 justify-content-center">
    <router-view v-on:verifyAuth="verifyAuth" v-on:completedSignUp="completedSignUp" v-on:logOut="logOut">
    </router-view>

  </main>
  <footer class="container-fluid col-12 justify-content-center">
    <h2>Que viva el comunismo y los mamertos 2022</h2>
  </footer>
</template>

<script>
import axios from 'axios';
import CoAppbar from './components/CoAppbar.vue'
export default {
  name: 'App',
  data: function () {
    return {
      is_auth: false
    }
  },
  methods: {
    verifyAuth: function () {
      this.is_auth = localStorage.getItem("isAuth") || false
      if (this.is_auth == false)
        this.$router.push({ name: 'coLogIn' });
      else
        this.$router.push({ name: 'coHome' });
        this.is_auth_props = this.is_auth;
    },
    completedSignUp: function (data) {
      alert("Registro exitoso");
      this.completedLogIn(data)
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
  components: {
    CoAppbar,
  },
  created: function () {
    this.verifyAuth()
  }
}
</script>

<style>
</style>
