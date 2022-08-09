<template>
    <header>
      <co-appbar></co-appbar>
    </header>
    <main>
      <co-dashboard></co-dashboard>
      <router-view v-on:completedLogIn="completedLogIn"
                     v-on:completedSignUp="completedSignUp"
                     v-on:logOut="logOut"
                     v-on:completedSignUpProveedores="completedSignUpProveedores"
                     v-on:completedSignUpCategoria="completedSignUpCategoria"
                     v-on:completedSignUpProducto="completedSignUpProducto"
                     v-on:completedSignUpFabricante="completedSignUpFabricante"
                     >

        </router-view>
    </main>
    <footer>
      <h2>Que viva el comunismo y los mamertos 2022</h2>
    </footer>
</template>

<script>
import axios from 'axios';
import CoAppbar from './components/CoAppbar.vue'
import CoDashboard from './components/CoDashboard.vue'
export default{
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
    CoDashboard,
  },
  created: function () {
    this.verifyAuth()
  }
}
</script>

<style>
</style>
