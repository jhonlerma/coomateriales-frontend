<template>
  <header>
    <co-appbar v-bind:is_auth_props="is_auth"></co-appbar>
  </header>
  <main>
    <co-dashboard v-on:verifyAuth="verifyAuth" v-if="is_auth" v-bind:is_auth_props="is_auth"></co-dashboard>
    <section class="container-fluid p-5">
      <router-view v-on:verifyAuth="verifyAuth"
        v-on:completedSignUp="completedSignUp"
        v-on:logOut="logOut"
        v-on:completedSignUpProveedores="completedSignUpProveedores"
        v-on:completedSignUpCategoria="completedSignUpCategoria"
        v-on:completedSignUpProducto="completedSignUpProducto"
        v-on:completedSignUpFabricante="completedSignUpFabricante">

      </router-view>

    </section>
  </main>
  <footer>
    <h2>Que viva el comunismo y los mamertos 2022</h2>
  </footer>
</template>

<script>
import axios from 'axios';
import CoAppbar from './components/CoAppbar.vue'
import CoDashboard from './components/CoDashboard.vue'
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
      console.log("is_auth: " + this.is_auth);
      if (this.is_auth == false) {
        this.$router.push({ name: 'coLogIn' });
        this.is_auth_props = this.is_auth;
      }
      else {
        this.$router.push({ name: 'coHome' });
        this.is_auth_props = this.is_auth;
      }
    },
    completedSignUp: function (data) {
      alert("Registro exitoso");
      this.completedLogIn(data)
    },
    completedSignUpProveedor: function (data) {
      alert("Registro exitoso");
      this.completedLogIn(data)
    },
    completedSignUpFabricante: function (data) {
      alert("Registro exitoso");
      this.completedLogIn(data)
    },
    completedSignUpCategoria: function (data) {
      alert("Registro exitoso");
      this.completedLogIn(data)
    },
    completedSignUpProducto: function (data) {
      alert("Registro exitoso");
      this.completedLogIn(data)
    },

    verifyToken: function () {
      return axios.post(
        "https://coomateriales-backend.herokuapp.com/refresh/",
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
