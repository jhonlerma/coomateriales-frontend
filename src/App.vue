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
        v-on:completedSignUpProveedor="completedSignUpProveedor"
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
    completedSignUp: function () {
      alert("Registro exitoso");
    },
    completedSignUpProveedor: function () {
      alert("Registro exitoso");
    },
    completedSignUpFabricante: function () {
      alert("Registro exitoso");
    },
    completedSignUpCategoria: function () {
      alert("Registro exitoso");
    },
    completedSignUpProducto: function () {
      alert("Registro exitoso");
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
